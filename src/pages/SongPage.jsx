import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaChevronLeft, FaPlay, FaPause, FaHeart, FaRegHeart, FaClock, FaMusic } from 'react-icons/fa';
import { useAudio } from '../context/AudioContext';
import Sidebar from '../components/music-player/Sidebar';
import PlayerPanel from '../components/music-player/PlayerPanel';
import DropDown from '../components/music-player/DropDown';
import artistCatalog from '../data/artistCatalog.json';
import '../styles/SongPage.css';

const SongPage = () => {
  const { songId } = useParams();
  const navigate = useNavigate();
  const { 
    currentSong, 
    isPlaying, 
    setPlaylist, 
    playTrack, 
    togglePlay,
    toggleLike,
    isLiked 
  } = useAudio();
  const [song, setSong] = useState(null);
  const [artistSongs, setArtistSongs] = useState([]);

  useEffect(() => {
    // Find the song and artist's other songs from artistCatalog
    for (const artistKey in artistCatalog) {
      const artist = artistCatalog[artistKey];
      const foundSong = artist.songs.find(s => 
        s.title.toLowerCase().replace(/\s+/g, '_') === songId
      );
      
      if (foundSong) {
        setSong({
          ...foundSong,
          id: songId,
          artist: artist.name,
          artistImage: `/${artist.photo}`,
          image: foundSong.coverArt ? `/${foundSong.coverArt}` : `/${artist.photo}`,
          audioSrc: `/${foundSong.audioFile}`,
          genre: foundSong.genre || 'Pop',
          releaseDate: foundSong.releaseDate || '2024',
          duration: foundSong.duration || '3:30'
        });

        // Get other songs by the same artist
        const otherSongs = artist.songs
          .filter(s => s.title !== foundSong.title)
          .map(s => ({
            ...s,
            id: s.title.toLowerCase().replace(/\s+/g, '_'),
            artist: artist.name,
            artistImage: `/${artist.photo}`,
            image: s.coverArt ? `/${s.coverArt}` : `/${artist.photo}`,
            audioSrc: `/${s.audioFile}`
          }));
        setArtistSongs(otherSongs);
        
        // Set this song as the only item in playlist
        setPlaylist([{
          id: songId,
          title: foundSong.title,
          artist: artist.name,
          audioSrc: `/${foundSong.audioFile}`,
          image: foundSong.coverArt ? `/${foundSong.coverArt}` : `/${artist.photo}`,
          artistImage: `/${artist.photo}`
        }]);
        break;
      }
    }
  }, [songId]);

  const handlePlayClick = () => {
    if (currentSong?.id === song.id) {
      togglePlay();
    } else {
      playTrack(0);
    }
  };

  const handleLikeClick = () => {
    toggleLike(songId);
  };

  if (!song) {
    return null;
  }

  return (
    <div className="music-app-container">
      <Sidebar />
      <div className="main-content">
        {/* Top Navigation Area */}
        <div className="flex justify-between items-center mb-8">
          <button 
            className="back-button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <FaChevronLeft />
          </button>
          <DropDown />
        </div>

        <div className="song-page-container">
          {/* Song Header */}
          <div className="song-page-header">
            <div className="song-page-image">
              <img src={song.image} alt={song.title} />
              <button 
                className="play-button"
                onClick={handlePlayClick}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {currentSong?.id === song.id && isPlaying ? <FaPause /> : <FaPlay />}
              </button>
            </div>
            <div className="song-page-info">
              <div className="song-page-label">SONG</div>
              <h1 className="song-page-title">{song.title}</h1>
              <div className="song-page-details">
                <img 
                  src={song.artistImage} 
                  alt={song.artist} 
                  className="artist-page-thumbnail"
                />
                <span className="artist-page-name">{song.artist}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="song-page-actions">
            <button 
              className={`action-button like-button ${isLiked(songId) ? 'active' : ''}`}
              onClick={handleLikeClick}
              title={isLiked(songId) ? "Unlike" : "Like"}
            >
              {isLiked(songId) ? <FaHeart /> : <FaRegHeart />}
              <span>{isLiked(songId) ? 'Liked' : 'Like'}</span>
            </button>
          </div>

          {/* Song Details */}
          <div className="song-page-details-section">
            <h2 className="section-title">Song Details</h2>
            <div className="details-grid">
              <div className="detail-item">
                <FaClock className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Duration</span>
                  <span className="detail-value">{song.duration}</span>
                </div>
              </div>
              <div className="detail-item">
                <FaMusic className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Genre</span>
                  <span className="detail-value">{song.genre}</span>
                </div>
              </div>
              <div className="detail-item">
                <FaHeart className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Release Date</span>
                  <span className="detail-value">{song.releaseDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* More from Artist */}
          {artistSongs.length > 0 && (
            <div className="more-from-artist">
              <h2 className="section-title">More from {song.artist}</h2>
              <div className="artist-songs-grid">
                {artistSongs.slice(0, 4).map((song) => (
                  <Link 
                    to={`/music-player/song/${song.id}`} 
                    key={song.id}
                    className="related-song-card"
                  >
                    <div className="related-song-image">
                      <img src={song.image} alt={song.title} />
                      <button className="play-overlay">
                        <FaPlay />
                      </button>
                    </div>
                    <div className="related-song-info">
                      <h3 className="related-song-title">{song.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <PlayerPanel />
    </div>
  );
};

export default SongPage; 