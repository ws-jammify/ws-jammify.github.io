import { useState, useRef, useEffect } from 'react'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)

  // Load a sample track (you'll replace this with your actual track data)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = '/assets/audio/sample.mp3'
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
      setVolume(newVolume)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-jammify-dark-blue/50 rounded-lg p-6">
        {/* Track Info */}
        <div className="flex items-center space-x-4 mb-6">
          <img
            src="/assets/images/album-cover.jpg"
            alt="Album Cover"
            className="w-24 h-24 rounded-lg"
          />
          <div>
            <h2 className="text-xl font-semibold">Song Title</h2>
            <p className="text-gray-400">Artist Name</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-4">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleMute}
              className="text-gray-400 hover:text-white"
            >
              <i className={`fas ${isMuted ? 'fa-volume-mute' : 'fa-volume-up'}`}></i>
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-gray-400 hover:text-white">
              <i className="fas fa-step-backward"></i>
            </button>
            <button
              onClick={togglePlay}
              className="w-12 h-12 bg-jammify-teal rounded-full flex items-center justify-center text-jammify-dark-blue hover:bg-[#29b3a9] transition-colors"
            >
              <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
            </button>
            <button className="text-gray-400 hover:text-white">
              <i className="fas fa-step-forward"></i>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white">
              <i className="fas fa-random"></i>
            </button>
            <button className="text-gray-400 hover:text-white">
              <i className="fas fa-redo"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="hidden"
      />
    </div>
  )
}

export default MusicPlayer 