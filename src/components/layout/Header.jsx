import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-10 glass-header">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/">
          <img src="/assets/images/brand/jammify-logo-white.png" alt="Jammify Logo" className="h-8" />
          </a>
          <a href="/">
          <span className="ml-2 text-xl font-bold font-display brand-text">Jammify</span>
          </a>
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8 items-center">
            <li>
              <Link 
                to="/" 
                className={`hover:text-jammify-teal transition duration-300 text-sm font-medium ${
                  location.pathname === '/' ? 'text-jammify-teal border-b-2 border-jammify-teal pb-1' : ''
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`hover:text-jammify-teal transition duration-300 text-sm font-medium ${
                  location.pathname === '/about' ? 'text-jammify-teal border-b-2 border-jammify-teal pb-1' : ''
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`hover:text-jammify-teal transition duration-300 text-sm font-medium ${
                  location.pathname === '/contact' ? 'text-jammify-teal border-b-2 border-jammify-teal pb-1' : ''
                }`}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link 
                to="/login" 
                className="border border-jammify-teal rounded-md px-6 py-2 text-sm font-semibold text-jammify-teal hover:bg-jammify-teal hover:text-[#16253f] transition duration-300"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={`md:hidden glass-card border-t-0 rounded-t-none absolute left-0 right-0 z-50 transform transition-all duration-300 origin-top ${
          isMobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col space-y-5 p-6 my-2">
          <li>
            <Link 
              to="/" 
              className={`hover:text-jammify-teal transition duration-300 block text-sm font-medium ${
                location.pathname === '/' ? 'text-jammify-teal border-b border-jammify-teal pb-1' : ''
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={`hover:text-jammify-teal transition duration-300 block text-sm font-medium ${
                location.pathname === '/about' ? 'text-jammify-teal border-b border-jammify-teal pb-1' : ''
              }`}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={`hover:text-jammify-teal transition duration-300 block text-sm font-medium ${
                location.pathname === '/contact' ? 'text-jammify-teal border-b border-jammify-teal pb-1' : ''
              }`}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link 
              to="/login" 
              className="border border-jammify-teal rounded-md px-6 py-2.5 text-sm font-semibold text-jammify-teal hover:bg-jammify-teal hover:text-[#16253f] transition duration-300 inline-block mt-2 w-full text-center"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header; 