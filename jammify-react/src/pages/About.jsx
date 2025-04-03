import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../styles/About.css'
import TeamSection from '../components/about/TeamSection'

const About = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
    
    AOS.init({
      once: true,
      mirror: false,
      offset: 120,
    })

    // Close modal with ESC key
    const handleEscKey = (event) => {
      // Removed code here
    }

    // Removed code here
  }, [])

  // Removed code here

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 bg-[#1A2C51]">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6" data-aos="fade-up">
            About Jammify
          </h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg" data-aos="fade-up" data-aos-delay="100">
            We're on a mission to revolutionize the way people experience and share music. Our platform brings together music lovers, artists, and technology to create a unique streaming experience.
          </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-20">
          <div className="glass-card p-8 rounded-xl backdrop-blur-sm bg-[#1E375F]/30 border border-jammify-teal/10" data-aos="fade-right">
            <h2 className="font-display text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed">
              To create a world where music connects people across boundaries, cultures, and genres. We believe in the power of music to inspire, unite, and transform lives.
            </p>
          </div>
          <div className="glass-card p-8 rounded-xl backdrop-blur-sm bg-[#1E375F]/30 border border-jammify-teal/10" data-aos="fade-left">
            <h2 className="font-display text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              To provide the most innovative and user-friendly music streaming platform that empowers both listeners and artists, fostering a vibrant musical ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section Component */}
      <TeamSection />
    </div>
  )
}

export default About