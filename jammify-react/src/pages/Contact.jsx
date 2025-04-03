import { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import '../styles/Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
    
    AOS.init({
      once: true,
      mirror: false,
      offset: 120,
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Simulate form submission
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 5000)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 bg-[#1A2C51]">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6" data-aos="fade-up">
          Contact Us
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg" data-aos="fade-up" data-aos-delay="100">
          Have questions or suggestions? We'd love to hear from you. Get in touch with our team and let's make music together.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-20">
          <div className="glass-card p-8 rounded-xl backdrop-blur-sm bg-[#1E375F]/30 border border-jammify-teal/10" data-aos="fade-right">
            <div className="w-16 h-16 bg-jammify-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-envelope text-2xl text-jammify-teal"></i>
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-4">Email Us</h2>
            <p className="text-gray-300 leading-relaxed">
              support@jammify.com<br />
              business@jammify.com
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl backdrop-blur-sm bg-[#1E375F]/30 border border-jammify-teal/10" data-aos="fade-up">
            <div className="w-16 h-16 bg-jammify-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-phone-alt text-2xl text-jammify-teal"></i>
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-4">Call Us</h2>
            <p className="text-gray-300 leading-relaxed">
              +1 (555) 123-4567<br />
              Mon-Fri, 9am-6pm PST
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl backdrop-blur-sm bg-[#1E375F]/30 border border-jammify-teal/10" data-aos="fade-left">
            <div className="w-16 h-16 bg-jammify-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-map-marker-alt text-2xl text-jammify-teal"></i>
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-4">Visit Us</h2>
            <p className="text-gray-300 leading-relaxed">
              221 Gil Carlos St.<br />
              Baliwag City, Bulacan
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 bg-[#1A2C51]/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="font-display text-3xl font-bold text-white mb-4">Send Us a Message</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl backdrop-blur-sm bg-[#1E375F]/30 border border-jammify-teal/10" data-aos="fade-up" data-aos-delay="100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#152238] border border-jammify-teal/10 text-white placeholder-gray-400 focus:outline-none focus:border-jammify-teal focus:ring-1 focus:ring-jammify-teal transition duration-200"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white text-sm font-medium mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#152238] border border-jammify-teal/10 text-white placeholder-gray-400 focus:outline-none focus:border-jammify-teal focus:ring-1 focus:ring-jammify-teal transition duration-200"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-white text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#152238] border border-jammify-teal/10 text-white placeholder-gray-400 focus:outline-none focus:border-jammify-teal focus:ring-1 focus:ring-jammify-teal transition duration-200"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 rounded-lg bg-[#152238] border border-jammify-teal/10 text-white placeholder-gray-400 focus:outline-none focus:border-jammify-teal focus:ring-1 focus:ring-jammify-teal transition duration-200 resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-8 py-3 bg-jammify-teal text-[#1c3057] font-semibold rounded-lg hover:bg-jammify-teal/90 focus:outline-none focus:ring-2 focus:ring-jammify-teal focus:ring-offset-2 focus:ring-offset-[#1A2C51] transition duration-200"
                >
                  Send Message
                </button>
              </div>
            </form>

            {showSuccess && (
              <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-center">
                <p className="text-green-400">Thank you! Your message has been sent successfully.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-8" data-aos="fade-up">Connect With Us</h2>
          <div className="flex justify-center space-x-6" data-aos="fade-up" data-aos-delay="100">
            <a href="mailto:codedelta2025@gmail.com" target="_blank" rel="noopener noreferrer" className="social-icon w-12 h-12 rounded-full flex items-center justify-center bg-[#152238]/70 text-jammify-teal hover:text-white transition duration-300">
              <i className="fas fa-envelope text-xl"></i>
            </a>
            <a href="https://www.github.com/ws-jammify/" target="_blank" rel="noopener noreferrer" className="social-icon w-12 h-12 rounded-full flex items-center justify-center bg-[#152238]/70 text-jammify-teal hover:text-white transition duration-300">
              <i className="fab fa-github text-xl"></i>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact 