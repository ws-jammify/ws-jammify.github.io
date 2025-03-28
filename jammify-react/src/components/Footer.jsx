import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="glass-card py-12 mt-auto border-t border-[#37E2D520]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          {/* Brand Section */}
          <div className="mb-6 md:mb-0">
            <img src="/assets/images/brand/jammify-logo-white.png" alt="Jammify Logo" className="h-8 mb-4" />
            <p className="text-gray-400 text-sm font-light">Your ultimate music streaming platform.</p>
          </div>
          
          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            <h4 className="font-display text-base font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-jammify-teal transition duration-300">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-jammify-teal transition duration-300">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-jammify-teal transition duration-300">Contact</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-jammify-teal transition duration-300">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-jammify-teal transition duration-300">Privacy Policy</Link></li>
            </ul>
          </div>
          
          {/* Social Links */}
          <div>
            <h4 className="font-display text-base font-semibold mb-3">Connect With Us</h4>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/jammify" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon w-9 h-9 rounded-full flex items-center justify-center bg-[#152238]/70 text-jammify-teal hover:text-white transition duration-300"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="https://twitter.com/jammify" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon w-9 h-9 rounded-full flex items-center justify-center bg-[#152238]/70 text-jammify-teal hover:text-white transition duration-300"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href="https://instagram.com/jammify" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon w-9 h-9 rounded-full flex items-center justify-center bg-[#152238]/70 text-jammify-teal hover:text-white transition duration-300"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-[#37E2D520] pt-6 text-center text-gray-400 text-sm font-light">
          <p>&copy; {new Date().getFullYear()} Jammify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 