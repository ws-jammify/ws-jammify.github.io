import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useAudio } from '../../context/AudioContext';

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const { setPlaylist, currentSong, isPlaying, togglePlay } = useAudio();
  const navigate = useNavigate();
  
  const username = currentUser ? currentUser.username : 'Janzen Go';
  
  // Get profile image path based on user's first name
  const getProfileImagePath = () => {
    if (!currentUser) return '/assets/images/dummy-post-square.jpg';
    
    // Extract first name from username and convert to lowercase
    const firstName = currentUser.username.split(' ')[0].toLowerCase();
    
    // Return path to formal.png in the corresponding folder
    return `/assets/images/about-images/${firstName}/formal.png`;
  };
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleLogout = () => {
    // Stop any playing audio
    if (isPlaying) {
      togglePlay(); // This will pause the current playback
    }
    // Clear the playlist
    setPlaylist([]);
    // Perform logout and navigate
    logout();
    navigate('/login');
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div ref={dropdownRef} className="relative">
      {/* Profile Button */}
      <button 
        onClick={toggleDropdown}
        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full py-2 px-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
      >
        <img 
          src={getProfileImagePath()} 
          alt={username}
          className="w-6 h-6 rounded-full object-cover border border-teal-400"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/assets/images/dummy-post-square.jpg';
          }}
        />
        <span className="text-sm font-medium">{username}</span>
        <FaChevronDown className={`text-xs transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg overflow-hidden z-50">
          <div className="py-2">
            <div className="px-4 py-3 border-b border-gray-700">
              <p className="text-sm text-teal-400">Signed in as</p>
              <p className="text-sm font-semibold text-white truncate">{username}</p>
            </div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-red-400 w-full text-left transition-colors duration-200"
            >
              <FaSignOutAlt className="text-gray-400" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
