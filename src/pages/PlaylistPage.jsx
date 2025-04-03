import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MusicList from '../components/music-player/MusicList';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/music-player/Sidebar';
import PlayerPanel from '../components/music-player/PlayerPanel';
import DropDown from '../components/music-player/DropDown';
import { playlists } from '../data/categorizedPlaylists.json';
import artistCatalog from '../data/artistCatalog.json';
import '../styles/PlaylistPage.css';

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const { currentSong, setPlaylist } = useAudio();
  const [playlist, setPlaylistData] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Helper function to find a song in the catalog
  const findSongInCatalog = (songTitle, artistName) => {
    // Convert artist name to catalog format
    const artistKey = `${artistName.toLowerCase().replace(/\s+/g, '_')}_artist`;

    // Normalize the song title for comparison (handle special characters and apostrophes)
    const normalizeTitle = (title) => {
      return title.toLowerCase()
        .trim()
        .replace(/[']/g, '') // Remove apostrophes
        .replace(/[^a-z0-9\s]/g, '') // Remove special characters
        .replace(/\s+/g, ' '); // Normalize spaces
    };
    
    const normalizedSearchTitle = normalizeTitle(songTitle);
    
    // First try direct artist lookup
    const artist = artistCatalog[artistKey];
    if (artist && artist.songs) {
      const song = artist.songs.find(s => 
        normalizeTitle(s.title) === normalizedSearchTitle
      );
    }

    // If not found, try searching all artists (fallback)
    const foundSong = Object.entries(artistCatalog).reduce((found, [key, artist]) => {
      if (found) return found;
      
      const matchingSong = artist.songs.find(
        catalogSong => 
          normalizeTitle(catalogSong.title) === normalizedSearchTitle
      );
      
      return matchingSong;
    }, null);

    if (!foundSong) {
      // Log available songs for this artist if we found their entry
      if (artist && artist.songs) {
        console.log('Available songs for this artist:', artist.songs.map(s => s.title));
      }
    }

    return foundSong;
  };

  useEffect(() => {
    // Find the playlist from categorizedPlaylists.json
    const foundPlaylist = playlists.find(p => p.id === playlistId);
    if (foundPlaylist) {
      setPlaylistData(foundPlaylist);
      
      // Convert playlist songs to the format expected by MusicList
      const songs = foundPlaylist.songs.map((song, index) => {
        // Find the song in the catalog to get accurate duration
        const catalogSong = findSongInCatalog(song.title, song.artist);
      

        return {
          id: `${playlistId}-${index + 1}`,
          title: song.title,
          artist: song.artist,
          album: foundPlaylist.name,
          duration: catalogSong ? catalogSong.duration : song.duration || 0,
          audioSrc: song.audioFile.startsWith('/') ? song.audioFile : `/${song.audioFile}`,
          image: song.coverArt.startsWith('/') ? song.coverArt : `/${song.coverArt}`,
          artistImage: song.artistImage ? 
            (song.artistImage.startsWith('/') ? song.artistImage : `/${song.artistImage}`) :
            `/assets/audio/artists/${song.artist.toLowerCase().replace(/\s+/g, '_')}_artist/${song.artist.toLowerCase().replace(/\s+/g, '_')}_photo.jpg`
        };
      });
      
      setPlaylistSongs(songs);
      // Set the playlist in the audio context
      setPlaylist(songs);
    }
  }, [playlistId]);

  if (!playlist) {
    return null;  // Return null instead of undefined
  }

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

        <div className="playlist-container">
          <div className="playlist-header">
            <div className="playlist-image">
              <img src={playlist.image} alt={playlist.name} />
            </div>
            <div className="playlist-info">
              <div className="playlist-label">PLAYLIST</div>
              <h1 className="playlist-title">{playlist.name}</h1>
              <p className="page-subtitle">{playlist.description}</p>
              <div className="playlist-details">
                <span className="username">{currentUser ? currentUser.username : 'Janzen Go'}</span>
                <span className="bullet">•</span>
                <span className="song-count">{playlistSongs.length} songs</span>
              </div>
            </div>
          </div>
          
          <div className="playlist-content">
            <MusicList 
              title="" 
              description=""
              songs={playlistSongs}
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

export default PlaylistPage; 