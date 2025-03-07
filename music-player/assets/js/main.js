// DOM Elements
const playPauseBtn = document.querySelector('.play-pause');
const prevBtn = document.querySelector('.fa-step-backward').parentElement;
const nextBtn = document.querySelector('.fa-step-forward').parentElement;
const randomBtn = document.querySelector('.fa-random').parentElement;
const repeatBtn = document.querySelector('.fa-redo').parentElement;
const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('.progress');
const currentTimeEl = document.querySelector('.progress-time.current');
const totalTimeEl = document.querySelector('.progress-time.total');
const volumeSlider = document.querySelector('.volume-slider');
const volumeLevel = document.querySelector('.volume-level');
const volumeIcon = document.querySelector('.volume-icon');
const musicCards = document.querySelectorAll('.music-card');
const timeGreeting = document.getElementById('time-greeting');
const playlistCardsSmall = document.querySelectorAll('.playlist-card-small');
const recentlyPlayedCards = document.querySelectorAll('.recently-played-card');
const likeButton = document.querySelector('.like-button');
const popularArtistCards = document.querySelectorAll('.popular-artist-card');

// Player state
let isPlaying = false;
let isMuted = false;
let previousVolume = 100;
let currentVolume = 100;

// Set time-based greeting
function setGreeting() {
    if (!timeGreeting) return;
    
    const currentHour = new Date().getHours();
    
    if (currentHour < 12) {
        timeGreeting.textContent = 'Good morning';
    } else if (currentHour < 18) {
        timeGreeting.textContent = 'Good afternoon';
    } else {
        timeGreeting.textContent = 'Good evening';
    }
}

// Call the greeting function on page load
document.addEventListener('DOMContentLoaded', setGreeting);

// Event Listeners
playPauseBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', playPreviousSong);
nextBtn.addEventListener('click', playNextSong);
randomBtn.addEventListener('click', toggleRandom);
repeatBtn.addEventListener('click', toggleRepeat);
progressBar.addEventListener('click', seekTo);
volumeSlider.addEventListener('click', adjustVolume);
volumeIcon.addEventListener('click', toggleMute);
likeButton.addEventListener('click', toggleLike);

// Initialize cards with hover effects and click events
musicCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        addPlayButton(card);
    });
    
    card.addEventListener('mouseleave', () => {
        removePlayButton(card);
    });
    
    card.addEventListener('click', () => {
        playSong(card);
    });
});

// Initialize small playlist cards with click events
playlistCardsSmall.forEach(card => {
    card.addEventListener('click', () => {
        // In a real app, this would navigate to the playlist or play it
        console.log('Playlist clicked:', card.querySelector('.card-title').textContent);
    });
});

// Initialize recently played cards with hover effects and click events
recentlyPlayedCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        addPlayButton(card);
    });
    
    card.addEventListener('mouseleave', () => {
        removePlayButton(card);
    });
    
    card.addEventListener('click', () => {
        playSong(card);
    });
});

// Initialize artist cards with hover effects and click events
popularArtistCards.forEach(card => {
    card.addEventListener('click', function() {
        const artistName = this.querySelector('.popular-artist-name').textContent;
        console.log(`Playing music by ${artistName}`);
        // In a real app, this would lead to the artist's page or play their top songs
    });
});

// Functions
function togglePlayPause() {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        // In a real app, this would play the audio
    } else {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        // In a real app, this would pause the audio
    }
}

function playPreviousSong() {
    // In a real app, this would play the previous song
    console.log('Previous song');
}

function playNextSong() {
    // In a real app, this would play the next song
    console.log('Next song');
}

function toggleRandom() {
    randomBtn.classList.toggle('active-control');
    // In a real app, this would toggle random playback
}

function toggleRepeat() {
    repeatBtn.classList.toggle('active-control');
    // In a real app, this would toggle repeat
}

function seekTo(e) {
    const progressWidth = progressBar.clientWidth;
    const clickX = e.offsetX;
    const percentage = (clickX / progressWidth) * 100;
    
    progress.style.width = `${percentage}%`;
    // In a real app, this would seek to the position in the audio
}

function adjustVolume(e) {
    const sliderWidth = volumeSlider.clientWidth;
    const clickX = e.offsetX;
    currentVolume = (clickX / sliderWidth) * 100;
    
    volumeLevel.style.width = `${currentVolume}%`;
    updateVolumeIcon();
    // In a real app, this would set the audio volume
}

function toggleMute() {
    isMuted = !isMuted;
    
    if (isMuted) {
        previousVolume = currentVolume;
        currentVolume = 0;
        volumeLevel.style.width = '0%';
        volumeIcon.className = 'fas fa-volume-mute volume-icon';
    } else {
        currentVolume = previousVolume;
        volumeLevel.style.width = `${currentVolume}%`;
        updateVolumeIcon();
    }
    // In a real app, this would mute/unmute the audio
}

function updateVolumeIcon() {
    if (currentVolume > 50) {
        volumeIcon.className = 'fas fa-volume-up volume-icon';
    } else if (currentVolume > 0) {
        volumeIcon.className = 'fas fa-volume-down volume-icon';
    } else {
        volumeIcon.className = 'fas fa-volume-mute volume-icon';
    }
}

function addPlayButton(card) {
    // Remove any existing play button
    removePlayButton(card);
    
    // Create play button overlay
    const playButton = document.createElement('div');
    playButton.className = 'card-play-button';
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    
    // Add play button to card
    card.appendChild(playButton);
}

function removePlayButton(card) {
    const playButton = card.querySelector('.card-play-button');
    if (playButton) {
        playButton.remove();
    }
}

function playSong(card) {
    // Update current song info
    const title = card.querySelector('.card-title').textContent;
    const artist = card.querySelector('.card-subtitle').textContent;
    const imageSrc = card.querySelector('.card-image').src;
    
    document.querySelector('.song-title').textContent = title;
    document.querySelector('.song-artist').textContent = artist;
    document.querySelector('.song-cover').src = imageSrc;
    
    // Start playing
    if (!isPlaying) {
        togglePlayPause();
    }
    
    // In a real app, this would load and play the audio file
}

function toggleLike() {
    if (likeButton.classList.contains('far')) {
        likeButton.classList.remove('far');
        likeButton.classList.add('fas');
        likeButton.classList.add('active');
    } else {
        likeButton.classList.remove('fas');
        likeButton.classList.add('far');
        likeButton.classList.remove('active');
    }
}

// Side navigation functionality
const menuItems = document.querySelectorAll('.sidebar-menu ul li a');

menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
        // If this is not an actual page link (e.g., #), prevent default
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
        }
        
        // Remove active class from all items
        menuItems.forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
    });
});