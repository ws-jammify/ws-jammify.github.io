import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="glass-card py-12 mt-auto border-t border-[#37E2D520]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <img src="/assets/images/brand/jammify-logo-white.png" alt="Jammify Logo" className="h-8 mb-4" />
            <p className="text-gray-400 text-sm font-light">Your ultimate music streaming platform.</p>
          </div>
          
          <div className="mb-6 md:mb-0">
            <h4 className="font-display text-base font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-jammify-teal transition duration-300">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-jammify-teal transition duration-300">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-jammify-teal transition duration-300">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-base font-semibold mb-3">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="mailto:codedelta2025@gmail.com" target="_blank" rel="noopener noreferrer" className="social-icon w-9 h-9 rounded-full flex items-center justify-center bg-[#152238]/70 text-jammify-teal hover:text-white transition duration-300">
                <i className="fas fa-envelope"></i>
              </a>
              <a href="https://github.com/ws-jammify" target="_blank" rel="noopener noreferrer" className="social-icon w-9 h-9 rounded-full flex items-center justify-center bg-[#152238]/70 text-jammify-teal hover:text-white transition duration-300">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#37E2D520] pt-6 text-center text-gray-400 text-sm font-light">
          <p>&copy; 2025 Jammify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 