import artistCatalog from '../data/artistCatalog.json';

/**
 * Get all artists with their basic information
 * @returns {Array} Array of artist objects with name, photo, and song count
 */
export const getAllArtists = () => {
  return Object.entries(artistCatalog).map(([key, artist]) => ({
    id: key,
    name: artist.name,
    photo: artist.photo,
    songCount: artist.songs.length
  }));
};

/**
 * Get artist information by their folder ID
 * @param {string} artistId - The artist folder ID (e.g. "taylor_swift_artist")
 * @returns {Object|null} Artist information or null if not found
 */
export const getArtistById = (artistId) => {
  if (!artistId || !artistCatalog[artistId]) return null;
  
  return {
    id: artistId,
    name: artistCatalog[artistId].name,
    photo: artistCatalog[artistId].photo,
    songs: artistCatalog[artistId].songs
  };
};

/**
 * Get all songs for a specific artist
 * @param {string} artistId - The artist folder ID
 * @returns {Array|null} Array of song objects or null if artist not found
 */
export const getArtistSongs = (artistId) => {
  if (!artistId || !artistCatalog[artistId]) return null;
  
  return artistCatalog[artistId].songs;
};

/**
 * Get song information by artist ID and song title
 * @param {string} artistId - The artist folder ID
 * @param {string} songTitle - The song title to find
 * @returns {Object|null} Song object or null if not found
 */
export const getSongByTitle = (artistId, songTitle) => {
  if (!artistId || !artistCatalog[artistId]) return null;
  
  const normalizedTitle = songTitle.toLowerCase();
  
  return artistCatalog[artistId].songs.find(
    song => song.title.toLowerCase() === normalizedTitle
  ) || null;
};

/**
 * Search for songs across all artists
 * @param {string} query - Search query
 * @returns {Array} Array of song objects with artist information
 */
export const searchSongs = (query) => {
  if (!query || typeof query !== 'string') return [];
  
  const normalizedQuery = query.toLowerCase();
  const results = [];
  
  Object.entries(artistCatalog).forEach(([artistId, artist]) => {
    const matchedSongs = artist.songs.filter(song => 
      song.title.toLowerCase().includes(normalizedQuery)
    );
    
    matchedSongs.forEach(song => {
      results.push({
        ...song,
        artistId,
        artistName: artist.name
      });
    });
  });
  
  return results;
};

/**
 * Get random songs from the catalog
 * @param {number} count - Number of random songs to return
 * @returns {Array} Array of random songs with artist information
 */
export const getRandomSongs = (count = 10) => {
  const allSongs = [];
  
  Object.entries(artistCatalog).forEach(([artistId, artist]) => {
    artist.songs.forEach(song => {
      allSongs.push({
        ...song,
        artistId,
        artistName: artist.name
      });
    });
  });
  
  // Shuffle and take the first 'count' songs
  return allSongs
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
};

export default {
  getAllArtists,
  getArtistById,
  getArtistSongs,
  getSongByTitle,
  searchSongs,
  getRandomSongs
}; 