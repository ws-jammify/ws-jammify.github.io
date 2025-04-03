import React, { useContext, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaHeart, FaRegHeart, FaMusic } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useAudio } from '../../context/AudioContext';
import likedSongsData from '../../data/likedSongs.json';
import artistCatalog from '../../data/artistCatalog.json';
import '../../styles/MusicList.css';

// Default assets for missing content
const DEFAULT_COVER = "/assets/images/dummy-post-square.jpg";
const DEFAULT_AUDIO = "/assets/audio/faded.ogg";

// Local storage key for liked songs
const LIKED_SONGS_KEY = 'jammify_liked_songs';

// Get default liked song IDs from likedSongs.json
const getDefaultLikedSongIds = () => {
  return new Set(likedSongsData.likedSongs.map(song => song.id));
};

const MusicList = ({ 
  title, 
  description, 
  songs, 
  showIndex = true, 
  showArtist = true, 
  showAlbum = false,
  showDuration = true,
  showHeader = true
}) => {
  const [likedSongs, setLikedSongs] = useState(() => {
    // Initialize with default liked songs
    const defaultLikedSongs = getDefaultLikedSongIds();
    
    // Get any additional liked songs from local storage
    const savedLikedSongs = localStorage.getItem(LIKED_SONGS_KEY);
    if (savedLikedSongs) {
      const parsedSavedSongs = new Set(JSON.parse(savedLikedSongs));
      // Combine default liked songs with saved liked songs
      return new Set([...defaultLikedSongs, ...parsedSavedSongs]);
    }
    
    return defaultLikedSongs;
  });

  // Save liked songs to local storage whenever they change
  useEffect(() => {
    localStorage.setItem(LIKED_SONGS_KEY, JSON.stringify(Array.from(likedSongs)));
  }, [likedSongs]);

  const { 
    currentSong, 
    isPlaying, 
    togglePlay, 
    formatTime, 
    setPlaylist, 
    playTrack,
    duration: activeDuration,
    playlist,
    durationCache,
    getCachedDuration
  } = useAudio();

  // Get duration from artist catalog
  const getDurationFromCatalog = (song) => {
    // Normalize artist name for lookup
    const artistKey = song.artist
      .toLowerCase()
      .replace(/[&\s]+/g, '_') // Replace spaces and & with underscore
      .replace(/[^a-z0-9_]/g, '') // Remove any other special characters
      + '_artist';

    // Get artist data from catalog
    const artistData = artistCatalog[artistKey];
    if (artistData && artistData.songs) {
      // Try to find the song by exact title match first
      let songData = artistData.songs.find(s => 
        s.title.toLowerCase() === song.title.toLowerCase()
      );

      // If not found, try to find by audio file name
      if (!songData) {
        const normalizedTitle = song.title.toLowerCase().replace(/['-\s]+/g, '_');
        songData = artistData.songs.find(s => 
          s.audioFile.toLowerCase().includes(normalizedTitle)
        );
      }

      // If still not found, try partial title match
      if (!songData) {
        songData = artistData.songs.find(s => 
          s.title.toLowerCase().includes(song.title.toLowerCase()) ||
          song.title.toLowerCase().includes(s.title.toLowerCase())
        );
      }

      if (songData && songData.duration) {
        // The duration in the catalog is stored as a string number
        return parseFloat(songData.duration);
      }
    }
    return null;
  };

  // Helper function to normalize all durations to the same format
  const handleDuration = (song, duration) => {
    // If this is the currently playing song, use the accurate duration from the player
    if (isCurrentSong(song)) {
      return formatTime(activeDuration);
    }
    
    // Try to get duration from artist catalog
    const catalogDuration = getDurationFromCatalog(song);
    if (catalogDuration) {
      return formatTime(catalogDuration);
    }
    
    // If the song has a duration in seconds (from catalog), use that
    if (duration && typeof duration === 'string' && !duration.includes(':')) {
      const seconds = parseFloat(duration);
      if (!isNaN(seconds)) {
        return formatTime(seconds);
      }
    }
    
    // If it's already a number, just format it
    if (typeof duration === 'number') {
      return formatTime(duration);
    }
    
    // If it's a string with a colon (like "3:45"), convert to seconds then format
    if (typeof duration === 'string' && duration.includes(':')) {
      const parts = duration.split(':');
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        const minutes = parseInt(parts[0], 10);
        const seconds = parseInt(parts[1], 10);
        const totalSeconds = minutes * 60 + seconds;
        return formatTime(totalSeconds);
      }
    }
    
    // Default fallback
    return '0:00';
  };

  // Normalize path to ensure it starts with a forward slash
  const normalizePath = (path) => {
    if (!path) return '';
    return path.startsWith('/') ? path : `/${path}`;
  };

  // Check if a song is the current song
  const isCurrentSong = (song) => {
    return currentSong && currentSong.id === song.id;
  };

  // Prepare a song for playback - ensure paths are normalized
  const prepareSongForPlayback = (song) => {
    return {
      ...song,
      audioSrc: song.audioSrc ? normalizePath(song.audioSrc) : DEFAULT_AUDIO,
      image: song.image ? normalizePath(song.image) : DEFAULT_COVER,
      // Ensure duration is preserved as a number
      duration: typeof song.duration === 'number' ? song.duration : 
               (typeof song.duration === 'string' && song.duration.includes(':')) ? 
               (() => {
                 const parts = song.duration.split(':');
                 return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
               })() : 0
    };
  };

  // Handle play button click
  const handlePlay = (song, index) => {
    if (isCurrentSong(song)) {
      togglePlay();
    } else {
      // Prepare all songs in the playlist to ensure consistent paths
      const normalizedPlaylist = songs.map(prepareSongForPlayback);
      setPlaylist(normalizedPlaylist);
      playTrack(index);
    }
  };

  // Handle play all button click
  const handlePlayAll = () => {
    if (songs.length > 0) {
      // Prepare all songs in the playlist to ensure consistent paths
      const normalizedPlaylist = songs.map(prepareSongForPlayback);
      setPlaylist(normalizedPlaylist);
      playTrack(0);
    }
  };

  // Toggle like status for a song
  const toggleLike = (e, song) => {
    e.stopPropagation(); // Prevent triggering play when clicking like button
    
    const songId = song.id || `${song.artist}-${song.title}`.toLowerCase().replace(/\s+/g, '-');
    const newLikedSongs = new Set(likedSongs);
    
    if (newLikedSongs.has(songId)) {
      // Only allow unliking if it's not in the default liked songs
      if (!getDefaultLikedSongIds().has(songId)) {
        newLikedSongs.delete(songId);
      }
    } else {
      newLikedSongs.add(songId);
    }
    
    setLikedSongs(newLikedSongs);
  };

  // Check if a song is liked
  const isLiked = (song) => {
    const songId = song.id || `${song.artist}-${song.title}`.toLowerCase().replace(/\s+/g, '-');
    return likedSongs.has(songId);
  };

  return (
    <div className="music-list-container">
      {(title || description) && (
        <div className="music-list-header">
          {title && <h2 className="music-list-title">{title}</h2>}
          {description && <p className="music-list-description">{description}</p>}
        </div>
      )}
      
      <div className="music-list-controls">
        <button className="play-all-button" onClick={handlePlayAll}>
          <i className="fas fa-play"></i>
        </button>
      </div>
      
      <div className="music-list-table-container">
        <table className="music-list-table">
          {showHeader && (
            <thead>
              <tr>
                {showIndex && <th className="column-index">#</th>}
                <th className="column-title">Title</th>
                {showArtist && <th className="column-artist">Artist</th>}
                {showDuration && <th className="column-duration">Duration</th>}
                <th className="column-actions"></th>
              </tr>
            </thead>
          )}
          <tbody>
            {songs && songs.length > 0 ? (
              songs.map((song, index) => (
                <tr 
                  key={song.id || index} 
                  className={`music-list-row ${isCurrentSong(song) ? 'current-song' : ''}`}
                >
                  {showIndex && (
                    <td className="column-index">
                      {isCurrentSong(song) ? (
                        <button 
                          className="play-pause-button current"
                          onClick={() => handlePlay(song, index)}
                        >
                          {isPlaying ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
                        </button>
                      ) : (
                        <div className="song-index">
                          <span className="index-number">{index + 1}</span>
                          <button 
                            className="play-pause-button hover"
                            onClick={() => handlePlay(song, index)}
                          >
                            <i className="fas fa-play"></i>
                          </button>
                        </div>
                      )}
                    </td>
                  )}
                  <td className="column-title" onClick={() => handlePlay(song, index)}>
                    <div className="song-info">
                      {song.image ? (
                        <img src={normalizePath(song.image)} alt={song.title} className="song-image" />
                      ) : (
                        <div className="song-image-placeholder">
                          <i className="fas fa-music"></i>
                        </div>
                      )}
                      <span className="song-title">{song.title}</span>
                    </div>
                  </td>
                  {showArtist && (
                    <td className="column-artist">{song.artist}</td>
                  )}
                  {showDuration && (
                    <td className="column-duration">{handleDuration(song, song.duration)}</td>
                  )}
                  <td className="column-actions">
                    <button 
                      className={`like-button ${isLiked(song) ? 'active' : ''}`}
                      onClick={(e) => toggleLike(e, song)}
                      title={isLiked(song) ? "Remove from liked songs" : "Add to liked songs"}
                    >
                      {isLiked(song) ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={showIndex + 2 + showArtist + showDuration} className="no-songs">
                  No songs available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MusicList;
