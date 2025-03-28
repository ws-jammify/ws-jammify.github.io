import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Library = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      mirror: false,
      offset: 120,
    });
  }, []);

  return (
    <main className="flex-1 pt-20">
      <div className="container mx-auto px-4">
        {/* Greeting & User Section */}
        <div className="flex justify-between items-center mb-8" data-aos="fade-up" data-aos-duration="1000">
          <div className="greeting">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-jammify-teal bg-clip-text text-transparent">
              Your Library
            </h1>
            <p className="text-gray-300 text-lg">Welcome back, Music Lover!</p>
          </div>
          <div className="user-profile flex items-center space-x-3">
            <img src="/assets/images/dummy-post-square.jpg" alt="User" className="w-10 h-10 rounded-full" />
            <span className="text-gray-300">Guest User</span>
          </div>
        </div>

        {/* Quick Access Section */}
        <section className="mb-12" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/library/liked" className="glass-card p-4 rounded-xl flex items-center space-x-3 hover:bg-[#1A2C51]/70 transition duration-300">
              <i className="fas fa-heart text-jammify-teal text-xl"></i>
              <span>Liked Songs</span>
            </Link>
            <Link to="/library/recent" className="glass-card p-4 rounded-xl flex items-center space-x-3 hover:bg-[#1A2C51]/70 transition duration-300">
              <i className="fas fa-history text-jammify-teal text-xl"></i>
              <span>Recently Played</span>
            </Link>
            <Link to="/library/playlists" className="glass-card p-4 rounded-xl flex items-center space-x-3 hover:bg-[#1A2C51]/70 transition duration-300">
              <i className="fas fa-list text-jammify-teal text-xl"></i>
              <span>Your Playlists</span>
            </Link>
            <Link to="/library/artists" className="glass-card p-4 rounded-xl flex items-center space-x-3 hover:bg-[#1A2C51]/70 transition duration-300">
              <i className="fas fa-microphone text-jammify-teal text-xl"></i>
              <span>Following Artists</span>
            </Link>
          </div>
        </section>

        {/* Your Playlists Section */}
        <section className="mb-12" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-2xl font-semibold">Your Playlists</h2>
            <Link to="/library/playlists" className="text-jammify-teal hover:text-white transition duration-300">
              Show all
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Chill Vibes', 'Workout Mix', 'Study Session', 'Road Trip Jams'].map((playlist, index) => (
              <div key={index} className="glass-card rounded-xl overflow-hidden hover:bg-[#1A2C51]/70 transition duration-300">
                <img src="/assets/images/dummy-post-square.jpg" alt={playlist} className="w-full aspect-square object-cover" />
                <div className="p-4">
                  <h3 className="font-medium truncate">{playlist}</h3>
                  <p className="text-gray-400 text-sm">12 songs</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Genre Section */}
        <section className="mb-12" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-2xl font-semibold">Browse by Genre</h2>
            <Link to="/library/genres" className="text-jammify-teal hover:text-white transition duration-300">
              Show all
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'Pop Hits', artists: 'Taylor Swift, Ed Sheeran, SIXCO' },
              { name: 'OPM', artists: 'TJ Monterde, Reneé, Arthur Nery' },
              { name: 'R&B', artists: 'Chris Brown, Usher, Bruno Mars' },
              { name: 'Rock', artists: 'Linkin Park, Guns N\' Roses, Nirvana' }
            ].map((genre, index) => (
              <div key={index} className="glass-card p-4 rounded-xl hover:bg-[#1A2C51]/70 transition duration-300">
                <h3 className="font-medium mb-2">{genre.name}</h3>
                <p className="text-gray-400 text-sm truncate">{genre.artists}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Songs Section */}
        <section className="mb-12" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-2xl font-semibold">Popular Songs</h2>
            <Link to="/library/popular" className="text-jammify-teal hover:text-white transition duration-300">
              Show all
            </Link>
          </div>
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-4 px-6 text-left">#</th>
                    <th className="py-4 px-6 text-left">Title</th>
                    <th className="py-4 px-6 text-left">Artist</th>
                    <th className="py-4 px-6 text-left">Album</th>
                    <th className="py-4 px-6 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { title: 'Marilag', artist: 'Dionela', album: 'Singles', duration: '3:45' },
                    { title: 'Blue', artist: 'Yung Kai', album: 'Blue EP', duration: '4:20' },
                    { title: 'Isa Lang', artist: 'Arthur Nery', album: 'Letters to You', duration: '3:55' },
                    { title: 'Luther', artist: 'Kendrick Lamar, SZA', album: 'Black Panther', duration: '3:35' },
                    { title: 'Blink Twice', artist: 'BINI', album: 'Feel Good', duration: '3:15' }
                  ].map((song, index) => (
                    <tr key={index} className="border-b border-white/10 hover:bg-[#1A2C51]/70 transition duration-300">
                      <td className="py-4 px-6">{index + 1}</td>
                      <td className="py-4 px-6">{song.title}</td>
                      <td className="py-4 px-6 text-gray-400">{song.artist}</td>
                      <td className="py-4 px-6 text-gray-400">{song.album}</td>
                      <td className="py-4 px-6 text-gray-400">{song.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Library; 