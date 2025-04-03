import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import MusicList from '../components/music-player/MusicList';
import { useAudio } from '../context/AudioContext';
import Sidebar from '../components/music-player/Sidebar';
import PlayerPanel from '../components/music-player/PlayerPanel';
import DropDown from '../components/music-player/DropDown';
import { genres } from '../data/categorizedGenre.json';
import '../styles/GenrePage.css';

const GenrePage = () => {
  const { genreId } = useParams();
  const navigate = useNavigate();
  const { setPlaylist } = useAudio();
  const [genre, setGenre] = useState(null);
  const [mappedSongs, setMappedSongs] = useState([]);
  const hasSetPlaylist = useRef(false);

  useEffect(() => {
    const foundGenre = genres.find(g => g.id === genreId);
    if (foundGenre) {
      setGenre(foundGenre);
      
      // Convert genre songs to the format expected by MusicList
      const songs = foundGenre.songs.map((song, index) => ({
        id: `${genreId}-${index + 1}`,
        title: song.title,
        artist: song.artist,
        duration: song.duration || 0,
        audioSrc: song.audioFile.startsWith('/') ? song.audioFile : `/${song.audioFile}`,
        image: song.coverArt.startsWith('/') ? song.coverArt : `/${song.coverArt}`,
        artistImage: song.artistImage ? 
          (song.artistImage.startsWith('/') ? song.artistImage : `/${song.artistImage}`) :
          `/assets/audio/artists/${song.artist.toLowerCase().replace(/\s+/g, '_')}_artist/${song.artist.toLowerCase().replace(/\s+/g, '_')}_photo.jpg`
      }));
      
      setMappedSongs(songs);
      
      // Only set playlist once when songs are available
      if (songs.length > 0 && !hasSetPlaylist.current) {
        setPlaylist(songs);
        hasSetPlaylist.current = true;
      }
    } else {
      navigate('/music-player');
    }
  }, [genreId, navigate]); // Remove setPlaylist from dependencies

  if (!genre) {
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
            title="Go back to previous page"
          >
            <FaChevronLeft />
          </button>
          <DropDown />
        </div>

        <div className="genre-container">
          <div className="genre-header">
            <div className="genre-image">
              <img src={genre.image} alt={genre.name} />
            </div>
            <div className="genre-info">
              <div className="genre-label">GENRE</div>
              <h1 className="genre-title">{genre.name}</h1>
              <div className="genre-details">
                <span>{genre.songs.length} songs</span>
                <span className="bullet">•</span>
                <span>{genre.description}</span>
              </div>
            </div>
          </div>
          
          <div className="genre-content">
            <MusicList 
              title="" 
              description=""
              songs={mappedSongs}
              showIndex={true}
              showArtist={true}
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

export default GenrePage; 