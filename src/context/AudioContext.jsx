import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Howl, Howler } from 'howler';
import "../styles/Components.css";

const AudioContextInstance = createContext(null);

export function useAudio() {
  const context = useContext(AudioContextInstance);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}

// Default assets for missing content
const DEFAULT_COVER = "/assets/images/dummy-post-square.jpg";
const DEFAULT_AUDIO = "/assets/audio/faded.ogg";

// Normalize path to ensure it starts with a forward slash
const normalizePath = (path) => {
  if (!path) return '';
  return path.startsWith('/') ? path : `/${path}`;
};

// Audio Provider component
export default function AudioProvider({ children }) {
  const [howl, setHowl] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7); // Default to 70%
  const [isMuted, setIsMuted] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [soundId, setSoundId] = useState(null);
  const [hasPlayedFirstSong, setHasPlayedFirstSong] = useState(false);
  // Cache to store actual durations of loaded songs
  const [durationCache, setDurationCache] = useState({});
  // Add liked songs state
  const [likedSongs, setLikedSongs] = useState(new Set());
  
  // Web Audio API elements for visualization
  const [analyser, setAnalyser] = useState(null);
  const [audioData, setAudioData] = useState(null);
  
  // Initialize Web Audio API analyzer using Howler's AudioContext
  useEffect(() => {
    // Access Howler's Web Audio Context instead of creating our own
    const howlerCtx = Howler.ctx;
    
    if (howlerCtx && !analyser) {
      try {
        // Create analyzer node using Howler's context
        const analyserNode = howlerCtx.createAnalyser();
        analyserNode.fftSize = 256;
        analyserNode.smoothingTimeConstant = 0.8;
        setAnalyser(analyserNode);
        
        const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
        setAudioData(dataArray);
        
        // Connect analyzer to destination to ensure it's in the audio path
        analyserNode.connect(howlerCtx.destination);
      } catch (error) {
        console.error("Failed to initialize audio analyzer:", error);
      }
    }
    
    return () => {
      // No need to close context since Howler manages it
      if (analyser) {
        // Just disconnect our analyzer
        try {
          analyser.disconnect();
        } catch (error) {
          // Ignore disconnection errors
        }
      }
    };
  }, []);
  
  // Function to get visualization data
  const getVisualizationData = () => {
    if (analyser && audioData) {
      analyser.getByteFrequencyData(audioData);
      return audioData;
    }
    return null;
  };
  
  // Set up interval for tracking playback position
  useEffect(() => {
    let interval;
    
    if (howl && isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(howl.seek());
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [howl, isPlaying]);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    // Always round to nearest integer to ensure consistent display
    const totalSeconds = Math.round(seconds);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Create a unique key for the duration cache
  const getDurationCacheKey = (track) => {
    return `${track.artist}:${track.title}`;
  };

  // Get cached duration if available
  const getCachedDuration = (track) => {
    if (!track) return null;
    const key = getDurationCacheKey(track);
    return durationCache[key];
  };

  // Update duration cache with newly loaded duration
  const updateDurationCache = (track, actualDuration) => {
    if (!track || !actualDuration) return;
    const key = getDurationCacheKey(track);
    setDurationCache(prevCache => ({
      ...prevCache,
      [key]: actualDuration
    }));
  };

  const loadTrack = (track) => {
    if (!track) return;
    
    setHasPlayedFirstSong(true);
    const audioSrc = track.audioSrc ? normalizePath(track.audioSrc) : DEFAULT_AUDIO;
    
    if (howl) {
      howl.stop();
      howl.unload();
    }
    
    const newHowl = new Howl({
      src: [audioSrc],
      html5: true,
      volume: isMuted ? 0 : volume,
      onplay: () => {
        setIsPlaying(true);
      },
      onpause: () => {
        setIsPlaying(false);
      },
      onstop: () => {
        setIsPlaying(false);
        setCurrentTime(0);
      },
      onend: () => {
        if (isRepeat) {
          // For repeat, restart the same song
          setCurrentTime(0);
          newHowl.seek(0);
          const id = newHowl.play();
          setSoundId(id);
          return;
        }
        
        // If not repeating, move to next song based on shuffle state
        if (isRandom) {
          const nextRandomIndex = getRandomIndex();
          playTrack(nextRandomIndex);
        } else {
          const nextIndex = (currentTrackIndex + 1) % playlist.length;
          playTrack(nextIndex);
        }
      },
      onload: () => {
        const actualDuration = newHowl.duration();
        setDuration(actualDuration);
        updateDurationCache(track, actualDuration);
        setCurrentSong(prev => ({
          ...prev,
          duration: actualDuration
        }));

        const id = newHowl.play();
        setSoundId(id);
      },
      onloaderror: (soundId, error) => {
        console.error(`Error loading audio file: ${audioSrc}`, error);
        if (audioSrc !== DEFAULT_AUDIO) {
          console.log('Falling back to default audio...');
          loadTrack({ ...track, audioSrc: DEFAULT_AUDIO });
        }
      },
      onplayerror: (soundId, error) => {
        console.error(`Error playing audio file: ${audioSrc}`, error);
        if (howl) {
          howl.once('unlock', () => {
            howl.play();
          });
        }
      }
    });
    
    setHowl(newHowl);
    setCurrentSong(track);
  };

  const togglePlay = () => {
    if (!howl) return;
    
    if (isPlaying) {
      howl.pause();
    } else {
      if (soundId !== null) {
        howl.play(soundId);
      } else {
        const id = howl.play();
        setSoundId(id);
      }
    }
    setIsPlaying(!isPlaying);
  };

  // Direct time setting function for progress bar clicks
  const setCurrentTimeValue = (newTime) => {
    if (!howl) return;
    
    const clampedTime = Math.max(0, Math.min(newTime, duration));
    howl.seek(clampedTime);
    setCurrentTime(clampedTime);
  };

  // Legacy function for percentage-based seeking
  const seek = (percentage) => {
    if (!howl) return;
    
    const newTime = (percentage / 100) * duration;
    setCurrentTimeValue(newTime);
  };

  // Direct volume setting function (0-1 range)
  const setVolumeValue = (newVolume) => {
    const volumeValue = Math.max(0, Math.min(1, newVolume));
    
    if (howl) {
      howl.volume(volumeValue);
    }
    
    setVolume(volumeValue);
    if (volumeValue === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  // Legacy function for percentage-based volume (0-100 range)
  const setVolumeLevel = (newVolume) => {
    setVolumeValue(newVolume / 100);
  };

  const toggleMute = () => {
    if (!howl) return;
    
    if (isMuted) {
      howl.volume(volume);
      setIsMuted(false);
    } else {
      howl.volume(0);
      setIsMuted(true);
    }
  };

  const toggleRandom = () => {
    setIsRandom(prev => {
      const newValue = !prev;
      // If enabling random, disable repeat
      if (newValue) {
        setIsRepeat(false);
      }
      return newValue;
    });
  };

  const toggleRepeat = () => {
    setIsRepeat(prev => {
      const newValue = !prev;
      // If enabling repeat, disable random
      if (newValue) {
        setIsRandom(false);
      }
      return newValue;
    });
  };

  const getRandomIndex = () => {
    if (playlist.length <= 1) return 0;
    
    // Create an array of possible indices excluding the current one
    const possibleIndices = playlist
      .map((_, index) => index)
      .filter(index => index !== currentTrackIndex);
    
    // If no possible indices, return current
    if (possibleIndices.length === 0) return currentTrackIndex;
    
    // Pick a random index from the possible indices
    return possibleIndices[Math.floor(Math.random() * possibleIndices.length)];
  };

  const playTrack = (index) => {
    if (index >= 0 && index < playlist.length) {
      setCurrentTrackIndex(index);
      loadTrack(playlist[index]);
    }
  };

  const nextSong = () => {
    if (!playlist.length) return;

    if (isRepeat && howl) {
      // For repeat, restart the same song
      setCurrentTime(0);
      howl.seek(0);
      const id = howl.play();
      setSoundId(id);
      return;
    }

    // If not repeating, handle based on shuffle state
    const nextIndex = isRandom ? getRandomIndex() : (currentTrackIndex + 1) % playlist.length;
    playTrack(nextIndex);
  };

  const prevSong = () => {
    if (!playlist.length) return;

    if (currentTime > 3 || isRepeat) {
      // Restart current song if: more than 3 seconds in OR repeat is enabled
      if (howl) {
        setCurrentTime(0);
        howl.seek(0);
        const id = howl.play();
        setSoundId(id);
        return;
      }
    }

    // If not restarting or repeating, handle based on shuffle state
    const prevIndex = isRandom ? getRandomIndex() : (currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1);
    playTrack(prevIndex);
  };

  const toggleLike = (songId) => {
    setLikedSongs(prev => {
      const newLikedSongs = new Set(prev);
      if (newLikedSongs.has(songId)) {
        newLikedSongs.delete(songId);
      } else {
        newLikedSongs.add(songId);
      }
      return newLikedSongs;
    });
  };

  const isLiked = (songId) => {
    return likedSongs.has(songId);
  };

  const value = {
    currentSong,
    isPlaying,
    duration,
    currentTime,
    volume,
    isMuted,
    isRandom,
    isRepeat,
    playlist,
    currentTrackIndex,
    hasPlayedFirstSong,
    durationCache,
    formatTime,
    loadTrack,
    togglePlay,
    seek,
    setCurrentTime: setCurrentTimeValue,
    setVolumeLevel,
    setVolume: setVolumeValue,
    toggleMute,
    toggleRandom,
    toggleRepeat,
    playTrack,
    nextSong,
    prevSong,
    getCachedDuration,
    playNextTrack: nextSong, // Alias for backward compatibility
    playPreviousTrack: prevSong, // Alias for backward compatibility
    setPlaylist: (newPlaylist) => setPlaylist(newPlaylist),
    getVisualizationData,
    analyser,
    audioContext: Howler.ctx, // Export Howler's context
    toggleLike,
    isLiked
  };

  return (
    <AudioContextInstance.Provider value={value}>
      {children}
    </AudioContextInstance.Provider>
  );
} 