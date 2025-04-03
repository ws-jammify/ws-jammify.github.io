import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/Login.css';
import userData from '../data/userData.json';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    name: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    AOS.init({
      once: true,
      mirror: false,
      offset: 120,
    });

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (isSignUp && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number';
    }

    if (isSignUp) {
      if (!formData.name) {
        newErrors.name = 'Full name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setLoginError('');

    try {
      // Wait for a short period to simulate processing
      await new Promise(resolve => setTimeout(resolve, 800));

      if (isSignUp) {
        // Signup logic
        // Create a new user object
        const newUser = {
          email: formData.email,
          password: formData.password,
          username: formData.name
        };
        
        // In a real app, you'd send this to a server
        // For now, just log in the user with the new account
        login(newUser);
        navigate('/music-player');
      } else {
        // Login logic using userData.json
        const user = userData.users.find(user => 
          user.email === formData.email && 
          user.password === formData.password
        );
        
        if (user) {
          // Successful login - store user in context
          login(user);
        navigate('/music-player');
        } else {
          // Failed login
          setLoginError('Invalid email or password');
        }
      }
    } catch (err) {
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleView = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      email: '',
      password: '',
      rememberMe: false,
      name: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl relative">
        <div className={`account-container rounded-xl mobile-container ${isMobile ? 'mobile-view' : ''}`}>
          {/* Back button */}
          <Link 
            to="/" 
            className="absolute top-4 left-4 z-30 h-8 w-8 flex items-center justify-center rounded-full bg-jammify-dark-blue/80 text-jammify-teal hover:text-white hover:bg-jammify-dark-blue transition duration-300 border border-jammify-teal/30"
          >
            <i className="fas fa-arrow-left text-sm"></i>
          </Link>

          {/* Cover section */}
          <div className={`cover-section ${isSignUp ? 'to-left' : ''} ${isMobile && isSignUp ? 'mobile-signup' : ''}`}>
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            
            <div className="cover-content-container">
              <div className={isSignUp ? 'hidden' : ''}>
                <h2 className="text-2xl font-bold mb-4">New Here?</h2>
                <p className="text-white/80 mb-6 text-sm">
                  Join the Jammify community and unlock your musical journey today
                </p>
                <button 
                  onClick={toggleView}
                  className="border border-jammify-teal rounded-md px-5 py-2 text-sm text-jammify-teal hover:bg-jammify-teal hover:text-[#16253f] transition duration-300"
                >
                  Sign Up
                </button>
              </div>

              <div className={!isSignUp ? 'hidden' : ''}>
                <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>
                <p className="text-white/80 mb-6 text-sm">
                  Sign in to continue your musical journey with Jammify
                </p>
                <button 
                  onClick={toggleView}
                  className="border border-jammify-teal rounded-md px-5 py-2 text-sm text-jammify-teal hover:bg-jammify-teal hover:text-[#16253f] transition duration-300"
                >
                  Log In
                </button>
              </div>
            </div>
          </div>

          {/* Login section */}
          <div className={`form-section login-section ${!isSignUp ? 'active' : ''}`}>
            <div className="form-wrapper">
              <div className="text-center mb-6">
                <div className="relative mb-2">
                  <img src="/assets/images/brand/jammify-logo-white.png" alt="Jammify Logo" className="h-8 mx-auto" />
                </div>
                <h1 className="text-xl font-bold">LOGIN</h1>
                {loginError && (
                  <div className="mt-2 text-red-400 text-sm">{loginError}</div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 max-w-xs mx-auto">
                <div>
                  <label htmlFor="login-email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="login-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input w-full rounded-md p-2 text-white ${errors.email ? 'input-error' : ''}`}
                    placeholder="jammify@gmail.com"
                  />
                  {errors.email && (
                    <div className="form-error visible">{errors.email}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="login-password" className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="login-password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-input w-full rounded-md p-2 text-white ${errors.password ? 'input-error' : ''}`}
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <div className="form-error visible">{errors.password}</div>
                  )}
                </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                      className="form-checkbox"
                      />
                    <label htmlFor="rememberMe" className="ml-2 block text-xs text-gray-300">
                        Remember me
                      </label>
                    </div>
                  <Link to="#" className="text-xs text-jammify-teal hover:text-white">
                      Forgot password?
                    </Link>
                  </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="submit-btn w-full bg-jammify-teal text-[#16253f] py-2 rounded-md font-medium text-sm"
                >
                  {isLoading ? (
                    <>
                      <span>Signing in...</span>
                      <div className="spinner"></div>
                    </>
                  ) : (
                    'Log in'
                  )}
                </button>

                <div className="text-center text-xs text-gray-400 mt-4">
                  Or continue with
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="social-btn flex items-center justify-center px-3 py-1.5 rounded-md text-xs">
                    <i className="fab fa-google text-white mr-2"></i>
                    Google
                  </button>
                  <button className="social-btn flex items-center justify-center px-3 py-1.5 rounded-md text-xs">
                    <i className="fab fa-facebook-f text-white mr-2"></i>
                    Facebook
                  </button>
                </div>
              </form>
              </div>
            </div>

          {/* Signup section */}
          <div className={`form-section signup-section ${isSignUp ? 'active' : ''}`}>
            <div className="form-wrapper">
              <div className="text-center mb-6">
                <div className="relative mb-2">
                  <img src="/assets/images/brand/jammify-logo-white.png" alt="Jammify Logo" className="h-8 mx-auto" />
                </div>
                <h1 className="text-xl font-bold">SIGN UP</h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 max-w-xs mx-auto">
                <div>
                  <label htmlFor="fullname" className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input w-full rounded-md p-2 text-white ${errors.name ? 'input-error' : ''}`}
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <div className="form-error visible">{errors.name}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="signup-email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="signup-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input w-full rounded-md p-2 text-white ${errors.email ? 'input-error' : ''}`}
                    placeholder="jammify@gmail.com"
                  />
                  {errors.email && (
                    <div className="form-error visible">{errors.email}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="signup-password" className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="signup-password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-input w-full rounded-md p-2 text-white ${errors.password ? 'input-error' : ''}`}
                    placeholder="Choose a password"
                  />
                  {errors.password && (
                    <div className="form-error visible">{errors.password}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`form-input w-full rounded-md p-2 text-white ${errors.confirmPassword ? 'input-error' : ''}`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <div className="form-error visible">{errors.confirmPassword}</div>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    className="form-checkbox"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 block text-xs text-gray-300">
                    I agree to the <Link to="#" className="text-jammify-teal hover:text-white">Terms</Link> and{' '}
                    <Link to="#" className="text-jammify-teal hover:text-white">Privacy Policy</Link>
                  </label>
              </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="submit-btn w-full bg-jammify-teal text-[#16253f] py-2 rounded-md font-medium text-sm"
                >
                  {isLoading ? (
                    <>
                      <span>Creating Account...</span>
                      <div className="spinner"></div>
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Mobile toggle view */}
          {isMobile && (
            <div id="mobile-toggle-view">
              <p className="text-gray-300 text-sm text-center pb-4">
                {isSignUp ? (
                  <span>Already have an account? <button onClick={toggleView} className="text-jammify-teal">Log in</button></span>
                ) : (
                  <span>Need an account? <button onClick={toggleView} className="text-jammify-teal">Sign up</button></span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login; 