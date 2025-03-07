/**
 * Music Player Core Functionality
 * This file contains the core audio playback functionality for the Jammify Music Player
 */

class MusicPlayer {
    constructor() {
        // Audio Element
        this.audio = new Audio();
        this.playlist = [];
        this.currentTrackIndex = 0;
        this.isRandom = false;
        this.isRepeat = false;
        
        // DOM Elements
        this.playPauseBtn = document.querySelector('.play-pause');
        this.prevBtn = document.querySelector('.fa-step-backward').parentElement;
        this.nextBtn = document.querySelector('.fa-step-forward').parentElement;
        this.randomBtn = document.querySelector('.fa-random').parentElement;
        this.repeatBtn = document.querySelector('.fa-redo').parentElement;
        this.progressBar = document.querySelector('.progress-bar');
        this.progress = document.querySelector('.progress');
        this.currentTimeEl = document.querySelector('.progress-time.current');
        this.totalTimeEl = document.querySelector('.progress-time.total');
        this.volumeSlider = document.querySelector('.volume-slider');
        this.volumeLevel = document.querySelector('.volume-level');
        this.volumeIcon = document.querySelector('.volume-icon');
        this.songTitleElement = document.querySelector('.song-title');
        this.songArtistElement = document.querySelector('.song-artist');
        this.songCoverElement = document.querySelector('.song-cover');
        this.likeButton = document.querySelector('.like-button');
        
        // Initialize event listeners
        this.initAudioEvents();
        this.initControlEvents();
    }
    
    initAudioEvents() {
        // Update progress bar as song plays
        this.audio.addEventListener('timeupdate', () => {
            if (this.audio.duration) {
                const progressPercent = (this.audio.currentTime / this.audio.duration) * 100;
                this.progress.style.width = `${progressPercent}%`;
                
                // Update current time display
                this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
            }
        });
        
        // When song ends
        this.audio.addEventListener('ended', () => {
            if (this.isRepeat) {
                this.audio.currentTime = 0;
                this.audio.play();
            } else {
                this.playNextTrack();
            }
        });
        
        // Song loaded metadata
        this.audio.addEventListener('loadedmetadata', () => {
            this.totalTimeEl.textContent = this.formatTime(this.audio.duration);
        });
    }
    
    initControlEvents() {
        // Play/Pause button
        this.playPauseBtn.addEventListener('click', () => this.togglePlay());
        
        // Previous Track
        this.prevBtn.addEventListener('click', () => this.playPreviousTrack());
        
        // Next Track
        this.nextBtn.addEventListener('click', () => this.playNextTrack());
        
        // Random Toggle
        this.randomBtn.addEventListener('click', () => {
            const isRandom = this.toggleRandom();
            if (isRandom) {
                this.randomBtn.classList.add('active-control');
            } else {
                this.randomBtn.classList.remove('active-control');
            }
        });
        
        // Repeat Toggle
        this.repeatBtn.addEventListener('click', () => {
            const isRepeat = this.toggleRepeat();
            if (isRepeat) {
                this.repeatBtn.classList.add('active-control');
            } else {
                this.repeatBtn.classList.remove('active-control');
            }
        });
        
        // Progress Bar Seek
        this.progressBar.addEventListener('click', (e) => {
            const width = this.progressBar.clientWidth;
            const clickX = e.offsetX;
            const percentage = (clickX / width) * 100;
            this.seek(percentage);
        });
        
        // Volume Control
        this.volumeSlider.addEventListener('click', (e) => {
            const width = this.volumeSlider.clientWidth;
            const clickX = e.offsetX;
            const volumePercentage = (clickX / width) * 100;
            this.setVolume(volumePercentage);
            this.volumeLevel.style.width = `${volumePercentage}%`;
        });
        
        // Volume Mute Toggle
        this.volumeIcon.addEventListener('click', () => {
            if (this.audio.volume > 0) {
                this.lastVolume = this.audio.volume;
                this.setVolume(0);
                this.volumeLevel.style.width = '0%';
                this.volumeIcon.classList.remove('fa-volume-up');
                this.volumeIcon.classList.add('fa-volume-mute');
            } else {
                this.setVolume(this.lastVolume * 100 || 75);
                this.volumeLevel.style.width = `${this.lastVolume * 100 || 75}%`;
                this.volumeIcon.classList.remove('fa-volume-mute');
                this.volumeIcon.classList.add('fa-volume-up');
            }
        });
        
        // Like Button Toggle
        if (this.likeButton) {
            this.likeButton.addEventListener('click', () => {
                if (this.likeButton.classList.contains('far')) {
                    this.likeButton.classList.remove('far');
                    this.likeButton.classList.add('fas');
                    this.likeButton.classList.add('active');
                } else {
                    this.likeButton.classList.remove('fas');
                    this.likeButton.classList.add('far');
                    this.likeButton.classList.remove('active');
                }
            });
        }
        
        // Music Cards Click Event
        document.querySelectorAll('.music-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                this.playTrack(index);
            });
        });
        
        // Recently Played Cards Click Event
        document.querySelectorAll('.recently-played-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                // Use modulo to get a valid index within the playlist
                const playlistIndex = index % this.playlist.length;
                this.playTrack(playlistIndex);
            });
        });
        
        // Playlist Cards Click Event
        document.querySelectorAll('.playlist-card-small').forEach((card) => {
            card.addEventListener('click', () => {
                // In a real app, this would load a specific playlist
                console.log('Playlist clicked:', card.querySelector('.card-title').textContent);
            });
        });
        
        // Genre Cards Click Event
        document.querySelectorAll('.cards-grid .music-card').forEach((card) => {
            card.addEventListener('click', () => {
                // In a real app, this would load songs from a specific genre
                console.log('Genre clicked:', card.querySelector('.card-title').textContent);
            });
        });
        
        // Section navigation buttons
        document.querySelectorAll('.nav-button').forEach((button) => {
            button.addEventListener('click', (e) => {
                const direction = e.currentTarget.querySelector('.fa-chevron-left') ? 'left' : 'right';
                const section = e.currentTarget.closest('section');
                const container = section.querySelector('.cards-grid') || 
                                  section.querySelector('.recently-played-row') || 
                                  section.querySelector('.small-cards-row') ||
                                  section.querySelector('.popular-artists-grid');
                
                if (container) {
                    if (direction === 'left') {
                        container.scrollLeft -= 300;
                    } else {
                        container.scrollLeft += 300;
                    }
                }
            });
        });
    }
    
    loadTrack(track) {
        if (!track) return;
        
        // Set audio source if provided
        if (track.audioSrc) {
            this.audio.src = track.audioSrc;
            console.log("Loading audio track:", track.audioSrc);
        }
        
        // Update UI
        this.songTitleElement.textContent = track.title;
        this.songArtistElement.textContent = track.artist;
        this.songCoverElement.src = track.image;
        
        // Reset progress
        this.progress.style.width = '0%';
        this.currentTimeEl.textContent = '0:00';
        
        // If song duration is known, update it
        if (this.audio.duration) {
            this.totalTimeEl.textContent = this.formatTime(this.audio.duration);
        } else {
            // For demo, default to displaying a duration
            this.totalTimeEl.textContent = track.duration || '3:45';
        }
        
        // Update active track in UI
        this.updateActiveTrackUI();
    }
    
    updateActiveTrackUI() {
        // Remove active class from all music cards
        document.querySelectorAll('.music-card').forEach(card => {
            card.classList.remove('active-track');
        });
        
        // Add active class to current track if visible
        const musicCards = document.querySelectorAll('.music-card');
        if (this.currentTrackIndex < musicCards.length) {
            musicCards[this.currentTrackIndex].classList.add('active-track');
        }
    }
    
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
    
    play() {
        // Return a promise to track when play actually happens
        const playPromise = this.audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(error => {
                console.error('Playback failed:', error);
                this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            });
        }
    }
    
    pause() {
        this.audio.pause();
        this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
    
    togglePlay() {
        if (this.audio.paused) {
            this.play();
        } else {
            this.pause();
        }
    }
    
    setVolume(volume) {
        // Volume is 0-100, audio API expects 0-1
        const volumeNormalized = Math.min(Math.max(volume, 0), 100) / 100;
        this.audio.volume = volumeNormalized;
        
        // Update volume icon based on level
        if (volumeNormalized === 0) {
            this.volumeIcon.className = 'fas fa-volume-mute volume-icon';
        } else if (volumeNormalized < 0.5) {
            this.volumeIcon.className = 'fas fa-volume-down volume-icon';
        } else {
            this.volumeIcon.className = 'fas fa-volume-up volume-icon';
        }
    }
    
    seek(percentage) {
        if (this.audio.duration) {
            this.audio.currentTime = this.audio.duration * (percentage / 100);
        }
    }
    
    setPlaylist(playlist) {
        this.playlist = playlist;
    }
    
    playTrack(index) {
        if (index >= 0 && index < this.playlist.length) {
            this.currentTrackIndex = index;
            this.loadTrack(this.playlist[index]);
            this.play();
        }
    }
    
    playPreviousTrack() {
        let prevIndex;
        
        if (this.isRandom) {
            prevIndex = this.getRandomIndex();
        } else {
            prevIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
        }
        
        this.playTrack(prevIndex);
    }
    
    playNextTrack() {
        let nextIndex;
        
        if (this.isRandom) {
            nextIndex = this.getRandomIndex();
        } else {
            nextIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        }
        
        this.playTrack(nextIndex);
    }
    
    getRandomIndex() {
        // Make sure we don't get the same track again
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * this.playlist.length);
        } while (randomIndex === this.currentTrackIndex && this.playlist.length > 1);
        
        return randomIndex;
    }
    
    toggleRandom() {
        this.isRandom = !this.isRandom;
        return this.isRandom;
    }
    
    toggleRepeat() {
        this.isRepeat = !this.isRepeat;
        return this.isRepeat;
    }
    
    // Add songs to the current playlist
    addToPlaylist(songs) {
        if (Array.isArray(songs)) {
            this.playlist = [...this.playlist, ...songs];
        } else {
            this.playlist.push(songs);
        }
    }
    
    // Clear and set a new playlist
    replacePlaylist(songs) {
        this.playlist = songs;
        this.currentTrackIndex = 0;
    }
}

// Global player instance
const musicPlayer = new MusicPlayer();

// This would be populated from JSON in a real application
const dummyPlaylist = [
    {
        id: '1',
        title: "Faded",
        artist: "Alan Walker",
        image: "assets/images/dummy-post-square.jpg",
        audioSrc: "assets/audio/faded.ogg",
        duration: "3:32" 
    },
    {
        id: '2',
        title: "Marilag",
        artist: "Dionela",
        image: "assets/images/dummy-post-square.jpg",
        audioSrc: "assets/audio/faded.ogg",
        duration: "4:12"
    },
    {
        id: '3',
        title: "Blue",
        artist: "Yung Kai",
        image: "assets/images/dummy-post-square.jpg",
        audioSrc: "assets/audio/faded.ogg",
        duration: "3:27"
    },
    {
        id: '4',
        title: "Isa Lang",
        artist: "Arthur Nery",
        image: "assets/images/dummy-post-square.jpg",
        audioSrc: "assets/audio/faded.ogg",
        duration: "3:58"
    },
    {
        id: '5',
        title: "Luther",
        artist: "Kendrick Lamar, SZA",
        image: "assets/images/dummy-post-square.jpg",
        audioSrc: "assets/audio/faded.ogg",
        duration: "4:35"
    },
    {
        id: '6',
        title: "Blink Twice",
        artist: "BINI",
        image: "assets/images/dummy-post-square.jpg",
        audioSrc: "assets/audio/faded.ogg",
        duration: "3:15"
    },
    {
        id: '7',
        title: "Die With A Smile",
        artist: "Lady Gaga, Bruno Mars",
        image: "assets/images/dummy-post-square.jpg",
        audioSrc: "assets/audio/faded.ogg",
        duration: "3:52"
    }
];

// Map songs to populate different sections
const popularArtistsSongs = {
    'Taylor Swift': [
        { title: 'Anti-Hero', artist: 'Taylor Swift', image: 'assets/images/dummy-post-square.jpg', audioSrc: 'assets/audio/faded.ogg', duration: '3:21' },
        { title: 'Cruel Summer', artist: 'Taylor Swift', image: 'assets/images/dummy-post-square.jpg', audioSrc: 'assets/audio/faded.ogg', duration: '3:05' },
        { title: 'Cardigan', artist: 'Taylor Swift', image: 'assets/images/dummy-post-square.jpg', audioSrc: 'assets/audio/faded.ogg', duration: '4:11' }
    ],
    'Arthur Nery': [
        { title: 'Pagsamo', artist: 'Arthur Nery', image: 'assets/images/dummy-post-square.jpg', audioSrc: 'assets/audio/faded.ogg', duration: '3:32' },
        { title: 'Isa Lang', artist: 'Arthur Nery', image: 'assets/images/dummy-post-square.jpg', audioSrc: 'assets/audio/faded.ogg', duration: '3:58' },
        { title: 'Binhi', artist: 'Arthur Nery', image: 'assets/images/dummy-post-square.jpg', audioSrc: 'assets/audio/faded.ogg', duration: '4:02' }
    ],
    'Bruno Mars': [
        { title: 'Die With A Smile', artist: 'Lady Gaga, Bruno Mars', image: 'assets/images/dummy-post-square.jpg', audioSrc: 'assets/audio/faded.ogg', duration: '3:52' },
        { title: 'Leave The Door Open', artist: 'Silk Sonic, Bruno Mars', image: 'assets/images/dummy-post-square.jpg', audioSrc: 'assets/audio/faded.ogg', duration: '4:02' },
        { title: 'Talking to the Moon', artist: 'Bruno Mars', image: 'assets/images/dummy-post-square.jpg', audioSrc: 'assets/audio/faded.ogg', duration: '3:38' }
    ]
};

// Set up the playlist on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log("Music Player initializing...");
    
    // Set playlist
    musicPlayer.setPlaylist(dummyPlaylist);
    
    // Load the first track
    musicPlayer.loadTrack(dummyPlaylist[0]);
    
    // Set a default volume
    musicPlayer.setVolume(75);
    document.querySelector('.volume-level').style.width = '75%';
    
    // Debug log available audio elements
    console.log("Audio player element:", musicPlayer.audio);
    console.log("First track:", dummyPlaylist[0]);
    
    // Add event listeners to artist cards
    document.querySelectorAll('.popular-artist-card').forEach((card) => {
        card.addEventListener('click', () => {
            const artistName = card.querySelector('.popular-artist-name').textContent;
            console.log("Artist clicked:", artistName);
            if (popularArtistsSongs[artistName]) {
                // Replace current playlist with artist songs
                musicPlayer.replacePlaylist(popularArtistsSongs[artistName]);
                musicPlayer.playTrack(0);
                console.log(`Now playing ${artistName}'s top songs`);
            }
        });
    });
});