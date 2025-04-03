import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file directory with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base directory for artist folders
const baseDir = path.join(__dirname, '../../public/assets/audio/artists');
// Output file path
const outputFile = path.join(__dirname, '../data/artistCatalog.json');

// Read all artist directories
function generateArtistCatalog() {
  const catalog = {};
  let totalSongs = 0;
  
  // Read the artist folders
  const artistFolders = fs.readdirSync(baseDir);
  
  artistFolders.forEach(artistFolder => {
    const artistPath = path.join(baseDir, artistFolder);
    if (fs.statSync(artistPath).isDirectory()) {
      const artistName = artistFolder.replace('_artist', '').split('_').map(
        word => word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      catalog[artistFolder] = {
        name: artistName,
        photo: '', // Will be filled if exists
        songs: []
      };
      
      // Check for artist photo
      const photoPath = path.join(artistPath, `${artistFolder.replace('_artist', '')}_photo.jpg`);
      if (fs.existsSync(photoPath)) {
        catalog[artistFolder].photo = `assets/audio/artists/${artistFolder}/${path.basename(photoPath)}`;
      }
      
      // Get audio files
      const audioPath = path.join(artistPath, 'audios');
      if (fs.existsSync(audioPath)) {
        const audioFiles = fs.readdirSync(audioPath);
        
        audioFiles.forEach(audioFile => {
          if (audioFile.endsWith('.ogg')) {
            const songName = audioFile.replace('.ogg', '').split('_').map(
              word => word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            
            // Check for cover
            const coverName = audioFile.replace('.ogg', '.jpg');
            const coverPath = path.join(artistPath, 'covers', coverName);
            let coverExists = fs.existsSync(coverPath);
            
            // Some cover files might have different naming conventions
            const alternateCoverName = coverName.replace(/_/g, '-');
            const alternateCoverPath = path.join(artistPath, 'covers', alternateCoverName);
            if (!coverExists) {
              coverExists = fs.existsSync(alternateCoverPath);
            }
            
            catalog[artistFolder].songs.push({
              title: songName,
              audioFile: `assets/audio/artists/${artistFolder}/audios/${audioFile}`,
              coverArt: coverExists ? 
                `assets/audio/artists/${artistFolder}/covers/${coverName}` : 
                '' // Empty if no cover found
            });
            
            totalSongs++;
          }
        });
      }
    }
  });
  
  // Write to file
  fs.writeFileSync(outputFile, JSON.stringify(catalog, null, 2));
  console.log(`Artist catalog generated at: ${outputFile}`);
  console.log(`Total artists: ${Object.keys(catalog).length}`);
  console.log(`Total songs: ${totalSongs}`);
  
  // Find artists with most songs
  const artistsByNumSongs = Object.entries(catalog)
    .map(([key, data]) => ({ 
      name: data.name, 
      numSongs: data.songs.length 
    }))
    .sort((a, b) => b.numSongs - a.numSongs);
  
  console.log("\nTop 10 artists by number of songs:");
  artistsByNumSongs.slice(0, 10).forEach((artist, index) => {
    console.log(`${index + 1}. ${artist.name}: ${artist.numSongs} songs`);
  });
}

// Run the function
generateArtistCatalog(); 