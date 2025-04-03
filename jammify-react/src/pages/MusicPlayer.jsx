import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaChevronDown, FaPlay, FaPause } from 'react-icons/fa';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';
import PlayerPanel from '../components/music-player/PlayerPanel';
import Sidebar from '../components/music-player/Sidebar';
import DropDown from '../components/music-player/DropDown';
import '../styles/MusicPlayer.css';
import { playlists } from '../data/categorizedPlaylists.json';
import { Link, useNavigate } from 'react-router-dom';
import artistCatalog from '../data/artistCatalog.json';
import { popularSongs } from '../data/popularSongs.json';
import popularArtistsData from '../data/popularArtists.json';
import { genres as genreData } from '../data/categorizedGenre.json';

const MusicPlayer = () => {
  const { 
    currentSong, 
    isPlaying, 
    playlist, 
    setPlaylist, 
    playTrack, 
    togglePlay 
  } = useAudio();
  const { getFirstName } = useAuth();
  const navigate = useNavigate();

  // Refs for scrollable sections
  const genreRef = useRef(null);
  const popularSongsRef = useRef(null);
  const recentPlaysRef = useRef(null);
  const artistsRef = useRef(null);

  // Function to handle scrolling for navigation buttons
  const handleScroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 350; // Adjust scroll amount based on card width + gap
      const currentScroll = ref.current.scrollLeft;
      ref.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const genres = genreData.map(genre => ({
    id: genre.id,
    title: genre.name,
    subtitle: `${genre.songs.slice(0, 3).map(song => song.artist).join(', ')} and more...`,
    image: genre.image
  }));

  const getArtistPhoto = (artistName) => {
    const artistKey = `${artistName.toLowerCase().replace(/[&\s]+/g, '_')}_artist`;
    const artist = artistCatalog[artistKey];
    
    if (artist && artist.photo) {
      // If photo path exists in catalog, ensure it starts with a forward slash
      return artist.photo.startsWith('/') ? artist.photo : `/${artist.photo}`;
    }
    
    // Construct the default path based on artist name
    const formattedName = artistName.toLowerCase().replace(/[&\s]+/g, '_');
    return `/assets/audio/artists/${formattedName}_artist/${formattedName}_photo.jpg`;
  };

  const { popularArtists } = popularArtistsData;

  useEffect(() => {
    // Set the playlist when component mounts
    if (playlist.length === 0) {
      setPlaylist(popularSongs);
    }
  }, [setPlaylist, playlist]);

  const handlePlayClick = (song, index) => {
    if (currentSong?.id === song.id) {
      togglePlay();
    } else {
      playTrack(index);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };
  
  return (
    <div className="music-app-container">
      <Sidebar />
      <div className="main-content">
        {/* Top Navigation Area */}
        <div className="flex justify-between items-center mb-8">
          <div className="greeting">
            <h1 id="time-greeting">{getGreeting()}</h1>
            <p className="welcome-text">Welcome back, {getFirstName() || 'Janzen'}!</p>
          </div>
          <DropDown />
        </div>

        {/* Small Playlist Cards */}
        <div className="small-cards-row">
          {playlists.map((playlist) => (
            <Link 
              to={`/music-player/playlist/${playlist.id}`} 
              key={playlist.id} 
              className="playlist-card-small"
            >
              <img src={playlist.image} alt={playlist.name} />
              <div className="card-title">{playlist.name}</div>
            </Link>
          ))}
        </div>

        {/* Genre Section */}
        <section className="section-container">
          <div className="section-header">
            <h2 className="section-title">Genre <a href="#" className="show-all">Show all</a></h2>
            <div className="section-nav">
              <button className="nav-button" onClick={() => handleScroll(genreRef, 'left')}>
                <FaChevronLeft />
              </button>
              <button className="nav-button" onClick={() => handleScroll(genreRef, 'right')}>
                <FaChevronRight />
              </button>
            </div>
          </div>
          
          <div className="cards-grid" ref={genreRef}>
            {genres.map((genre) => (
              <Link 
                to={`/music-player/genre/${genre.id}`} 
                key={genre.id} 
                className="music-card"
              >
                <img src={genre.image} alt={genre.title} className="card-image" />
                <div className="card-content">
                  <h3 className="card-title">{genre.title}</h3>
                  <p className="card-subtitle">{genre.subtitle}</p>
                </div>
                <div className="card-play-button">
                  <FaPlay />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Songs Section */}
        <section className="section-container">
          <div className="section-header">
            <h2 className="section-title">Popular Songs <a href="#" className="show-all">Show all</a></h2>
            <div className="section-nav">
              <button className="nav-button" onClick={() => handleScroll(popularSongsRef, 'left')}>
                <FaChevronLeft />
              </button>
              <button className="nav-button" onClick={() => handleScroll(popularSongsRef, 'right')}>
                <FaChevronRight />
              </button>
            </div>
          </div>
          
          <div className="cards-grid" ref={popularSongsRef}>
            {popularSongs.map((song, index) => (
              <Link 
                to={`/music-player/song/${song.title.toLowerCase().replace(/\s+/g, '_')}`}
                key={song.id} 
                className={`music-card ${currentSong?.id === song.id ? 'active-track' : ''}`}
              >
                <img src={song.image} alt={song.title} className="card-image" />
                <div className="card-content">
                  <h3 className="card-title">{song.title}</h3>
                  <p className="card-subtitle">{song.artist}</p>
                </div>
                <div 
                  className="card-play-button"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePlayClick(song, index);
                  }}
                >
                  {currentSong?.id === song.id && isPlaying ? (
                    <FaPause />
                  ) : (
                    <FaPlay />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>


        {/* Popular Artists Section */}
        <section className="section-container">
          <div className="section-header">
            <h2 className="section-title">Popular Artists</h2>
            <div className="section-nav">
              <button className="nav-button" onClick={() => handleScroll(artistsRef, 'left')}>
                <FaChevronLeft />
              </button>
              <button className="nav-button" onClick={() => handleScroll(artistsRef, 'right')}>
                <FaChevronRight />
              </button>
            </div>
          </div>
          
          <div className="popular-artists-grid" ref={artistsRef}>
            {popularArtists.map((artist) => (
              <Link 
                to={`/music-player/artist/${artist.name.toLowerCase().replace(/\s+/g, '_')}`}
                key={artist.id} 
                className="popular-artist-card"
              >
                <div className="popular-artist-image-container">
                  <img src={artist.image} alt={artist.name} className="popular-artist-image" />
                </div>
                <h3 className="popular-artist-name">{artist.name}</h3>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <PlayerPanel />
    </div>
  );
};

export default MusicPlayer;