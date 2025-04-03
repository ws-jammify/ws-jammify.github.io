import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaHeart } from 'react-icons/fa';
import { playlists } from '../../data/categorizedPlaylists.json';
import '../../styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <img src="/assets/images/brand/jammify-logo.png" alt="Jammify Logo" />
        <span>Jammify</span>
      </div>
      
      {/* Main Navigation */}
      <div className="sidebar-menu">
        <ul>
          <li>
            <Link 
              to="/music-player" 
              className={isActive('/music-player') ? 'active' : ''}
            >
              <FaHome />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/music-player/liked-songs" 
              className={isActive('/music-player/liked-songs') ? 'active' : ''}
            >
              <FaHeart />
              <span>Liked Songs</span>
            </Link>
          </li>
        </ul>
      </div>
      
      {/* Playlists Section */}
      <div className="sidebar-heading">Your Playlists</div>
      <div className="sidebar-menu user-playlists">
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <Link 
                to={`/music-player/playlist/${playlist.id}`}
                className={isActive(`/music-player/playlist/${playlist.id}`) ? 'active' : ''}
              >
                <img src={playlist.image} alt={playlist.name} className="playlist-thumbnail" />
                <span>{playlist.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar; 