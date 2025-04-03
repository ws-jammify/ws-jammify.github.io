import React from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import PlayerControls from './PlayerControls';

const MusicPlayer = () => {
  return (
    <div className="music-player bg-[#121212] min-h-screen">
      <Sidebar />
      <MainContent />
      <PlayerControls />
    </div>
  );
};

export default MusicPlayer; 