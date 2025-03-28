import { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    AOS.init({
      once: true,
      mirror: false,
      offset: 120,
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, you would send the form data to a server here
    setShowSuccess(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setShowSuccess(false), 5000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center" data-aos="fade-up" data-aos-duration="1000">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-jammify-teal bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed font-light mb-8">
            Have questions, suggestions, or just want to say hello? We'd love to hear from you. Our team is here to help and respond to your inquiries.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Email */}
          <div className="contact-card glass-card p-8 rounded-2xl text-center" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
            <div className="contact-icon w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-[#152238]/70 text-jammify-teal text-2xl">
              <i className="fas fa-envelope"></i>
            </div>
            <h3 className="font-display text-xl font-semibold mb-3">Email Us</h3>
            <p className="text-gray-300 text-sm font-light mb-4">
              Send us an email anytime, we'll get back to you within 24 hours.
            </p>
            <a href="mailto:support@jammify.com" className="text-jammify-teal hover:text-white transition duration-300">support@jammify.com</a>
          </div>

          {/* Phone */}
          <div className="contact-card glass-card p-8 rounded-2xl text-center" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
            <div className="contact-icon w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-[#152238]/70 text-jammify-teal text-2xl">
              <i className="fas fa-phone"></i>
            </div>
            <h3 className="font-display text-xl font-semibold mb-3">Call Us</h3>
            <p className="text-gray-300 text-sm font-light mb-4">
              For immediate assistance, give us a call during business hours.
            </p>
            <a href="tel:+1234567890" className="text-jammify-teal hover:text-white transition duration-300">+1 (234) 567-890</a>
          </div>

          {/* Social */}
          <div className="contact-card glass-card p-8 rounded-2xl text-center" data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
            <div className="contact-icon w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-[#152238]/70 text-jammify-teal text-2xl">
              <i className="fas fa-comments"></i>
            </div>
            <h3 className="font-display text-xl font-semibold mb-3">Social Media</h3>
            <p className="text-gray-300 text-sm font-light mb-4">
              Connect with us on social media for quick responses and updates.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="social-icon w-10 h-10 rounded-full flex items-center justify-center bg-[#152238]/70 text-jammify-teal hover:text-white transition duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon w-10 h-10 rounded-full flex items-center justify-center bg-[#152238]/70 text-jammify-teal hover:text-white transition duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon w-10 h-10 rounded-full flex items-center justify-center bg-[#152238]/70 text-jammify-teal hover:text-white transition duration-300">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-8 md:p-12 rounded-2xl" data-aos="fade-up" data-aos-duration="1000">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="How can we help you?"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="form-input"
                  placeholder="Your message here..."
                  required
                ></textarea>
              </div>
              <div>
                <button type="submit" className="form-button w-full md:w-auto">Send Message</button>
              </div>
            </form>
            {showSuccess && (
              <div className="success-message mt-6 bg-green-900/30 text-green-400 p-4 rounded-md">
                <i className="fas fa-check-circle mr-2"></i> Your message has been sent successfully! We'll get back to you soon.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact 