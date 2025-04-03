<div align="center">
  <img alt="Logo" src="https://github.com/ws-jammify/ws-jammify.github.io/blob/6114109ee76036987d88d5c36db487b563113522/public/assets/images/brand/jammify-logo.png" width="100" />
</div>
<h1 align="center">
  jammify.me
</h1>

<p align="center">
  A front-end focused music player web application built with React and Vite, developed as a course requirement for WS101.
</p>

<p align="center">
  <a href="https://github.com/janzengo/janzengo.github.io/deployments" target="_blank">
    <img src="https://img.shields.io/badge/GitHub%20Pages-Deployed-success?style=for-the-badge&logo=github" alt="GitHub Pages Deployment Status" />
  </a>
</p>

![demo](https://github.com/ws-jammify/ws-jammify.github.io/blob/621178cd903e238daa619d84d146b41d1fc88dc6/public/assets/images/screenshot.png)


## About The Project

Jammify is a modern music player interface that demonstrates the implementation of front-end web technologies. This project showcases the use of React components, state management, and modern web APIs to create an interactive music player experience.

**Note:** This is a front-end demonstration project. All data is stored locally in JSON files, and there is no backend server or database integration.

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Implementation Details](#implementation-details)
  - [Front-end Features](#front-end-features)
  - [Mock Data Implementation](#mock-data-implementation)
- [Contributors](#contributors)
- [Acknowledgments](#acknowledgments)
- [License](#license)

## Features

- Client-side audio playback with playlist management
- Modern, responsive UI with Tailwind CSS
- Mock authentication system (using local JSON data)
- Like/unlike song functionality (state persists during session)
- Playback controls (volume)
- Responsive design for all screen sizes
- Real-time audio visualization using Web Audio API
- Static content organization by genres and artists

## Tech Stack

- React 18 (Front-end framework)
- Vite (Build tool)
- Howler.js (Audio handling)
- Tailwind CSS (Styling)
- React Router (Client-side routing)
- Web Audio API (Audio visualization)
- Local JSON (Mock data storage)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/jammify.git
cd jammify
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
jammify/
├── src/
│   ├── components/     # Reusable React components
│   ├── context/       # React context providers
│   ├── data/          # Local JSON data files
│   ├── pages/         # Page components
│   ├── styles/        # CSS and Tailwind styles
│   └── App.jsx        # Main app component
├── public/
│   ├── assets/        # Static assets (images, audio files)
│   └── index.html
└── package.json
```

## Implementation Details

### Front-end Features
- Client-side routing with React Router
- Context-based state management
- Component-based architecture
- Responsive design with Tailwind CSS
- Audio playback with Howler.js

### Mock Data Implementation
- User authentication simulated with local JSON
- Playlist and song data stored in JSON files
- Like/unlike functionality persists in session
- Artist and genre data managed through static files

## Contributors

- **Project Author**: Code Blue
  - [Ampato, Rasul](https://github.com/Sulraa) as the *Project Manager*
  - [Go, Janneil Janzen](https://github.com/janzengo) as the *Programmer*
  - [Gonzales, Angel](https://github.com/zeleina) as the *Lead Researcher*
  - [Dela Cruz, Katrina Paula](https://github.com/katrinadc) as the *Assistant Programmer*
  - [Garcia, Ajy Gabrielle](https://www.instagram.com/jygrxa) as the *UI/UX Designer*
  - [Fernando, Renz Mark](https://github.com/Bagoongtilapia) as the *UI/UX Assistant Designer*

## Acknowledgments

- Prof. Regina Santos for project guidance
- React and Vite communities for documentation and resources
- Open-source community for various tools and libraries used

## License

This project is created for educational purposes as part of WS101 coursework.

💙 Code Blue
