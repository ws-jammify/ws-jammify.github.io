# Jammify Music Web App

> **Note: This project is currently under active development and is not yet complete. For details on planned features and upcoming updates, please refer to the CHANGELOGS.md file.**

Jammify is a modern music web app that allows users to listen to their favorite tracks anywhere, anytime. This project mimics some of the core functionality of Spotify, focusing on a clean and intuitive user interface.

## Project Overview

- **Frontend Focus**: Built with HTML, TailwindCSS, and JavaScript (jQuery)
- **Design**: Modern, responsive dark theme with turquoise accent color
- **Hosted on**: GitHub Pages

## Features

- **Landing Pages**: Home, About, Contact, Login, and Signup pages
- **Audio Player**: Music playback using HTML5 audio element
- **Playlists**: Create and manage playlists of favorite songs
- **Single Page Application**: Hash-based routing for seamless navigation
- **Dynamic Content**: Load artist and song data from JSON files

## Project Structure

```
jammify/
├── index.html               # Homepage
├── about.html               # About page
├── contact.html             # Contact page
├── login.html               # Login page
├── signup.html              # Signup page
├── music-player.html        # Main app page (to be implemented)
├── css/
│   ├── styles.css           # Base styles
│   └── tailwind.css         # Tailwind configuration
├── js/
│   ├── router.js            # SPA routing logic
│   ├── audio-player.js      # Audio playback functionality
│   └── data-loader.js       # Load and display music data
├── assets/
│   ├── images/              # App images
│   │   └── brand/           # Logo files
│   └── data/                # JSON data files
│       ├── artists.json     # Artist information
│       └── songs.json       # Song information
└── README.md                # Project documentation
```

## Getting Started

1. Clone this repository
2. Open `index.html` in your browser
3. Navigate through the pages using the navigation links

## Development

This project uses TailwindCSS via CDN for styling. The core functionality is implemented with vanilla JavaScript and jQuery.

### CSS Styling

All custom styles beyond Tailwind utilities are in the `css/styles.css` file. The design follows a dark navy blue theme with teal accents.

### JavaScript Functionality

- `router.js`: Handles SPA navigation without page reloads
- `audio-player.js`: Manages music playback functionality
- `data-loader.js`: Loads and displays artist and song data

## Future Enhancements

According to our development roadmap (see CHANGELOGS.md for details):

1. **Music Player Implementation**
   - Complete the `music-player.html` interface
   - Implement audio playback functionality in `js/audio-player.js`

2. **Data Loading & Management**
   - Complete implementation of artist and song data loading from JSON
   - Create and manage user playlists

3. **User Authentication**
   - Connect login and signup forms to authentication system
   - Implement secure user account management

4. **Design Refinements**
   - Further responsive design optimizations
   - Additional interactive elements
   - Enhanced mobile experience

## Credits

- Design inspiration: Spotify
- Icons: Font Awesome
- Music: Royalty-free sources

## License

This project is for educational purposes only.
