import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MusicList from '../components/music-player/MusicList';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';
import likedSongsData from '../data/likedSongs.json';
import artistCatalog from '../data/artistCatalog.json';
import Sidebar from '../components/music-player/Sidebar';
import PlayerPanel from '../components/music-player/PlayerPanel';
import DropDown from '../components/music-player/DropDown';
import '../styles/LikedSongs.css';

const LikedSongs = () => {
  const { playTrack, currentTrack, isPlaying, setPlaylist } = useAudio();
  const { currentUser } = useAuth();
  const { likedSongs } = likedSongsData;
  const navigate = useNavigate();
  
  // Map the liked songs with their catalog data using useMemo to prevent unnecessary recalculations
  const mappedLikedSongs = useMemo(() => {
    return likedSongs.map(song => {
      // Find the song in the catalog by searching through all artists' songs
      const catalogSong = Object.values(artistCatalog).reduce((found, artist) => {
        if (found) return found;
        return artist.songs.find(
          catalogSong => 
            catalogSong.title.toLowerCase() === song.title.toLowerCase() &&
            artist.name.toLowerCase() === song.artist.toLowerCase()
        );
      }, null);

      return {
        ...song,
        duration: catalogSong ? catalogSong.duration : song.duration
      };
    });
  }, [likedSongs]); // Only recalculate when likedSongs changes
  
  // Set the playlist when component mounts or when mappedLikedSongs changes
  useEffect(() => {
    setPlaylist(mappedLikedSongs);
  }, [setPlaylist, mappedLikedSongs]);
  
  return (
    <div className="music-app-container">
      <Sidebar />
      <div className="main-content">
        {/* Top Navigation Area */}
        <div className="flex justify-between items-center mb-8">
          <div className="back-button" onClick={() => navigate(-1)}>
            <i className="fas fa-chevron-left"></i>
          </div>
          <DropDown />
        </div>

        <div className="liked-songs-container">          
          <div className="liked-songs-header">
            <div className="liked-songs-image">
              <i className="fas fa-heart heart-icon"></i>
            </div>
            <div className="liked-songs-info">
              <div className="playlist-label">PLAYLIST</div>
              <h1 className="liked-songs-title">Liked Songs</h1>
              <p className="page-subtitle">Your favorite tracks in one place</p>
              <div className="liked-songs-details">
                <span className="username">{currentUser ? currentUser.username : 'Janzen Go'}</span>
                <span className="bullet">•</span>
                <span className="song-count">{mappedLikedSongs.length} songs</span>
              </div>
            </div>
          </div>
          
          <div className="liked-songs-content">
            <MusicList 
              title="" 
              description=""
              songs={mappedLikedSongs}
              showIndex={true}
              showArtist={true}
              showAlbum={true}
              showDuration={true}
              showHeader={true}
            />
          </div>
        </div>
      </div>
      <PlayerPanel />
    </div>
  );
};

export default LikedSongs;
