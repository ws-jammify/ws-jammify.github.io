import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useAudio } from '../context/AudioContext'

const Home = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
    
    AOS.init({
      once: true,
      mirror: false,
      offset: 120,
    })
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-16 mt-6" data-aos="fade-up" data-aos-duration="1000">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right" data-aos-duration="1000">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-jammify-teal bg-clip-text text-transparent">
              Your Music, <br />Your Way, <span className="text-jammify-teal">Anywhere</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed font-light mb-8">
              Experience your favorite tracks with stunning clarity and personalized playlists. Jammify brings your music to life, wherever you go.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/login" className="hero-button bg-jammify-teal text-[#16253f] px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition duration-300">
                Get Started
              </Link>
              <Link to="/about" className="hero-button bg-transparent border border-jammify-teal text-jammify-teal px-8 py-3 rounded-md font-semibold hover:bg-jammify-teal hover:text-[#16253f] transition duration-300">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hero-image-container hidden md:block" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
            <img src="/assets/images/person-1.png" alt="Person" className="mx-auto w-full max-w-xl" />
          </div>
        </div>
        <hr className="border-[#37E2D520] w-full mt-0 mb-0" />
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 pt-8 pb-12 md:pt-16 md:pb-20" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 md:mb-20 bg-gradient-to-r from-white to-jammify-teal bg-clip-text text-transparent" data-aos="fade-up" data-aos-duration="800">
          Why Choose Jammify?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="feature-card glass-card p-8 rounded-2xl" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
            <div className="feature-icon-container mb-6">
              <i className="fas fa-music text-jammify-teal text-2xl"></i>
            </div>
            <h3 className="font-display text-2xl font-semibold mb-4">Millions of Songs</h3>
            <p className="text-gray-300 text-base leading-relaxed font-light">
              Access a vast library of tracks from around the world.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="feature-card glass-card p-8 rounded-2xl" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
            <div className="feature-icon-container mb-6">
              <i className="fas fa-bolt text-jammify-teal text-2xl"></i>
            </div>
            <h3 className="font-display text-2xl font-semibold mb-4">High Quality</h3>
            <p className="text-gray-300 text-base leading-relaxed font-light">
              Experience crystal clear audio streaming.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="feature-card glass-card p-8 rounded-2xl" data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
            <div className="feature-icon-container mb-6">
              <i className="fas fa-mobile-alt text-jammify-teal text-2xl"></i>
            </div>
            <h3 className="font-display text-2xl font-semibold mb-4">Listen Anywhere</h3>
            <p className="text-gray-300 text-base leading-relaxed font-light">
              Stream on any device, anytime you want.
            </p>
          </div>
        </div>
        
        {/* CTA Banner */}
        <div className="cta-banner mt-20 p-10 md:p-12 rounded-2xl glass-card text-center relative overflow-hidden" data-aos="fade-up" data-aos-duration="1000">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-jammify-teal bg-clip-text text-transparent">
            Ready to start your musical journey?
          </h3>
          <p className="text-gray-300 text-lg mb-8 font-light">
            Join Jammify today and discover a world of music tailored just for you.
          </p>
          <Link to="/login" className="hero-button bg-jammify-teal hover:bg-opacity-90 text-[#16253f] font-semibold rounded-md px-8 py-3 transition duration-300 inline-flex items-center group">
            Sign Up Now 
            <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home 