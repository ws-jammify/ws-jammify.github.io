import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AudioProvider from './context/AudioContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import MusicPlayer from './pages/MusicPlayer';
import LikedSongs from './pages/LikedSongs';
import PlaylistPage from './pages/PlaylistPage';
import ArtistPage from './pages/ArtistPage';
import SongPage from './pages/SongPage';
import GenrePage from './pages/GenrePage';

const App = () => {
  return (
    <AuthProvider>
      <AudioProvider>
        <Router basename="/app">
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/music-player" element={<MusicPlayer />} />
            <Route path="/music-player/liked-songs" element={<LikedSongs />} />
            <Route path="/music-player/playlist/:playlistId" element={<PlaylistPage />} />
            <Route path="/music-player/artist/:artistId" element={<ArtistPage />} />
            <Route path="/music-player/song/:songId" element={<SongPage />} />
            <Route path="/music-player/genre/:genreId" element={<GenrePage />} />
          </Routes>
        </Router>
      </AudioProvider>
    </AuthProvider>
  );
};

export default App;
