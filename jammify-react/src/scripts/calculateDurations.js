import { dirname, join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { getAudioDurationInSeconds } from 'get-audio-duration';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '../../');
const publicDir = join(projectRoot, 'public');

const catalogPath = join(projectRoot, 'src/data/artistCatalog.json');

async function getAudioDuration(audioPath) {
  try {
    const fullPath = join(publicDir, audioPath);
    console.log(`Processing file: ${fullPath}`);
    const duration = await getAudioDurationInSeconds(fullPath);
    return duration || null;
  } catch (error) {
    console.error(`Error reading audio file: ${error.message}`);
    return null;
  }
}

async function updateDurations() {
  try {
    const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
    let successCount = 0;
    let failCount = 0;

    for (const [artistId, artistData] of Object.entries(catalog)) {
      console.log(`\nProcessing songs for ${artistData.name}...`);
      
      for (const song of artistData.songs) {
        if (song.audioFile) {
          const duration = await getAudioDuration(song.audioFile);
          if (duration !== null) {
            song.duration = duration.toFixed(2);
            console.log(`✓ Updated duration for "${song.title}": ${song.duration} seconds`);
            successCount++;
          } else {
            console.log(`✗ Could not determine duration for "${song.title}"`);
            failCount++;
          }
        }
      }
    }

    writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
    console.log(`\nFinished updating durations:\n- Successfully updated: ${successCount} songs\n- Failed to update: ${failCount} songs`);
  } catch (error) {
    console.error('Error updating durations:', error);
    process.exit(1);
  }
}

updateDurations(); 