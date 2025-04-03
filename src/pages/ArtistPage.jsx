import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaPlay, FaPause } from 'react-icons/fa';
import MusicList from '../components/music-player/MusicList';
import { useAudio } from '../context/AudioContext';
import Sidebar from '../components/music-player/Sidebar';
import PlayerPanel from '../components/music-player/PlayerPanel';
import DropDown from '../components/music-player/DropDown';
import artistCatalog from '../data/artistCatalog.json';
import '../styles/ArtistPage.css';

const ArtistPage = () => {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const { setPlaylist } = useContext(AudioContext);
  const [artist, setArtist] = useState(null);
  const [artistSongs, setArtistSongs] = useState([]);

  // Function to normalize file paths
  const normalizePath = (path) => {
    if (!path) return '';
    // Replace spaces and special characters in the path
    return path.replace(/[&]/g, 'and')
              .replace(/[\s-]/g, '_')
              .toLowerCase();
  };

  useEffect(() => {
    // Handle special cases for artist IDs
    let normalizedArtistId = artistId;
    if (artistId === 'ben&ben') {
      normalizedArtistId = 'ben_and_ben';
    }

    // Find the artist from artistCatalog.json
    const artistKey = `${normalizedArtistId}_artist`;
    const foundArtist = artistCatalog[artistKey];
    
    if (foundArtist) {
      // Create a copy of the artist with the correct display name
      const displayArtist = {
        ...foundArtist,
        name: artistId === 'ben&ben' ? 'Ben&Ben' : foundArtist.name
      };
      setArtist(displayArtist);
      
      // Convert artist songs to the format expected by MusicList
      const songs = foundArtist.songs.map((song, index) => {
        // Normalize the audio file and cover art paths
        const normalizedAudioPath = song.audioFile.split('/').map(part => {
          // Only normalize the filename part
          if (part.includes('.')) {
            return normalizePath(part);
          }
          return part;
        }).join('/');

        const normalizedCoverPath = song.coverArt?.split('/').map(part => {
          // Only normalize the filename part
          if (part.includes('.')) {
            return normalizePath(part);
          }
          return part;
        }).join('/');

        return {
          id: `${artistId}-${index + 1}`,
          title: song.title,
          artist: displayArtist.name,
          album: 'Popular Songs',
          duration: 180,
          audioSrc: `/${normalizedAudioPath}`,
          image: normalizedCoverPath ? `/${normalizedCoverPath}` : `/${foundArtist.photo}`,
          artistImage: `/${foundArtist.photo}`
        };
      });
      
      setArtistSongs(songs);
    }
  }, [artistId]); // Only depend on artistId changes

  // Separate useEffect for setting playlist to avoid infinite loop
  useEffect(() => {
    if (artistSongs.length > 0) {
      setPlaylist(artistSongs);
    }
  }, [artistSongs, setPlaylist]);

  if (!artist) {
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

        <div className="artist-container">
          <div className="artist-header">
            <div className="artist-image">
              <img src={`/${artist.photo}`} alt={artist.name} />
            </div>
            <div className="artist-info">
              <div className="artist-label">ARTIST</div>
              <h1 className="artist-title">{artist.name}</h1>
              <div className="artist-details">
                <span className="song-count">{artistSongs.length} songs</span>
              </div>
            </div>
          </div>
          
          <div className="artist-content">
            <MusicList 
              title="" 
              description=""
              songs={artistSongs}
              showIndex={true}
              showArtist={false}
              showAlbum={false}
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

export default ArtistPage; 