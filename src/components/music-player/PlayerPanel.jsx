import React, { useRef, useState, useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';
import AudioVisualizer from './AudioVisualizer';
import '../../styles/PlayerPanel.css';
import '../../styles/AudioVisualizer.css';

const PlayerPanel = () => {
    const { 
        currentSong, 
        isPlaying, 
        togglePlay, 
        nextSong, 
        prevSong, 
        formatTime,
        currentTime,
        duration,
        setCurrentTime,
        volume,
        setVolume,
        isMuted,
        toggleMute,
        isRandom,
        toggleRandom,
        isRepeat,
        toggleRepeat,
        hasPlayedFirstSong,
        toggleLike,
        isLiked
    } = useAudio();

    const [showExpanded, setShowExpanded] = useState(false);
    const progressRef = useRef(null);
    const volumeRef = useRef(null);
    const audioRef = useRef(null);

    const handleProgressClick = (e) => {
        const progressBar = progressRef.current;
        if (!progressBar) return;
        
        const rect = progressBar.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const newProgress = (offsetX / rect.width) * duration;
        
        if (isFinite(newProgress)) {
            setCurrentTime(newProgress);
        }
    };

    const handleVolumeClick = (e) => {
        const volumeBar = volumeRef.current;
        if (!volumeBar) return;
        
        const rect = volumeBar.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const newVolume = Math.max(0, Math.min(1, offsetX / rect.width));
        
        setVolume(newVolume);
    };
    
    const handleLikeClick = () => {
        if (!currentSong) return;
        toggleLike(currentSong.id);
    };
    
    const getVolumeIcon = () => {
        if (isMuted || volume === 0) {
            return <i className="fas fa-volume-mute"></i>;
        } else if (volume < 0.5) {
            return <i className="fas fa-volume-down"></i>;
        } else {
            return <i className="fas fa-volume-up"></i>;
        }
    };

    const toggleExpandedView = () => {
        setShowExpanded(!showExpanded);
    };

    // Normalize path to ensure it starts with a forward slash
    const normalizePath = (path) => {
        if (!path) return '';
        return path.startsWith('/') ? path : `/${path}`;
    };

    // Default images
    const DEFAULT_COVER = "/assets/images/default-album-art.jpg";

    // Get the normalized image path with fallback
    const getImageSrc = (imagePath) => {
        return imagePath ? normalizePath(imagePath) : DEFAULT_COVER;
    };

    useEffect(() => {
        if (!audioRef.current || !currentSong?.audioSrc) return;
        
        // Set up audio element for visualization
        audioRef.current.src = currentSong.audioSrc;
        audioRef.current.volume = 0; // Mute this audio element since we're using Howler for playback
        
        // Synchronize with main playback
        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Ignore abort errors when quickly switching songs
                    if (error.name !== 'AbortError') {
                        console.error('Visualizer audio play error:', error);
                    }
                });
            }
        }
        
        return () => {
            const audio = audioRef.current;
            if (audio) {
                // Store the current state
                const wasPlaying = !audio.paused;
                
                if (wasPlaying) {
                    // If it was playing, pause it first
                    audio.pause();
                }
                audio.src = '';
                audio.load(); // Clear the audio element completely
            }
        };
    }, [currentSong, isPlaying]);

    return (
        <div className={`player-bar ${showExpanded ? 'expanded' : ''} ${isPlaying ? 'playing' : ''} ${hasPlayedFirstSong ? 'visible' : 'initial'} ${currentSong && !hasPlayedFirstSong ? 'animate-in' : ''}`}>
            {/* Hidden audio element for visualization */}
            <audio ref={audioRef} crossOrigin="anonymous" />
            
            <div className="player-bar-inner">
                {/* Album art and song info */}
                <div className="song-info">
                    <div className="album-wrapper">
                        <img 
                            src={getImageSrc(currentSong?.image)} 
                            alt={currentSong?.title || 'Album artwork'} 
                            className={`song-cover ${isPlaying ? 'rotating' : ''}`}
                        />
                    </div>
                    <div className="song-details">
                        <p className="song-title">{currentSong?.title || 'No song playing'}</p>
                        <p className="song-artist">{currentSong?.artist || 'Unknown artist'}</p>
                    </div>
                    <button 
                        className={`like-button ${isLiked(currentSong?.id) ? 'active' : ''}`} 
                        title={isLiked(currentSong?.id) ? "Unlike" : "Like"}
                        onClick={handleLikeClick}
                    >
                        {isLiked(currentSong?.id) ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
                    </button>
                </div>
                
                {/* Center section with controls and progress */}
                <div className="player-center">
                    {/* Player controls */}
                    <div className="player-controls">
                        <button className="control-button" title="Previous" onClick={prevSong}>
                            <i className="fas fa-step-backward"></i>
                        </button>
                        <button className="play-pause" title={isPlaying ? "Pause" : "Play"} onClick={togglePlay}>
                            {isPlaying ? <i className="fas fa-pause"></i> : <i className="fas fa-play play-icon"></i>}
                        </button>
                        <button className="control-button" title="Next" onClick={nextSong}>
                            <i className="fas fa-step-forward"></i>
                        </button>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="progress-container">
                        <span className="progress-time">{formatTime(currentTime)}</span>
                        <div 
                            className="progress-bar" 
                            ref={progressRef} 
                            onClick={handleProgressClick}
                        >
                            <div className="progress-background"></div>
                            <div 
                                className="progress" 
                                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                            >
                                <div className="progress-glow"></div>
                            </div>
                            <div 
                                className="progress-handle" 
                                style={{ left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                            ></div>
                        </div>
                        <span className="progress-time">{formatTime(duration)}</span>
                    </div>
                </div>
                
                {/* Volume and additional controls */}
                <div className="player-right">
                    <button className="control-button" title="Queue">
                        <i className="fas fa-list-ul"></i>
                    </button>
                    <div className="volume-container">
                        <button className="volume-icon" onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
                            {getVolumeIcon()}
                        </button>
                        <div 
                            className="volume-slider" 
                            ref={volumeRef} 
                            onClick={handleVolumeClick}
                        >
                            <div className="volume-background"></div>
                            <div 
                                className="volume-level" 
                                style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                            ></div>
                            <div 
                                className="volume-handle" 
                                style={{ left: `${isMuted ? 0 : volume * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    <button className="expand-button" onClick={toggleExpandedView}>
                        <i className={`fas fa-chevron-up ${showExpanded ? 'rotate-180' : ''}`}></i>
                    </button>
                </div>
            </div>
            
            {/* Expanded view */}
            <div className="player-expanded-view">
                <div className="expanded-content">
                    <div className="expanded-album">
                        <img 
                            src={getImageSrc(currentSong?.image)} 
                            alt={currentSong?.title || 'Album artwork'} 
                            className="expanded-album-art"
                        />
                    </div>
                    <div className="expanded-details">
                        <h3 className="expanded-title">{currentSong?.title || 'No song playing'}</h3>
                        <h4 className="expanded-artist">{currentSong?.artist || 'Unknown artist'}</h4>
                        <p className="expanded-album-name">{currentSong?.album || 'Unknown album'}</p>
                        
                        <div className="expanded-controls">
                            <button 
                                className={`expanded-control-button ${isLiked(currentSong?.id) ? 'active' : ''}`}
                                onClick={handleLikeClick}
                            >
                                {isLiked(currentSong?.id) ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
                                <span>Like</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerPanel;
