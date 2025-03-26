import { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    rememberMe: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-jammify-dark-blue via-[#1E375F] to-jammify-blue p-4">
      <div className="w-full max-w-4xl bg-[#1A2C51]/50 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden flex">
        {/* Form Container */}
        <div className={`w-full md:w-1/2 p-8 transition-transform duration-500 ${isLogin ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="relative">
            <button
              onClick={() => window.history.back()}
              className="absolute -left-4 -top-4 w-8 h-8 rounded-full bg-[#152238]/70 text-jammify-teal flex items-center justify-center hover:bg-jammify-teal hover:text-[#16253f] transition duration-300"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
          </div>
          
          <h2 className="text-3xl font-display font-bold mb-8 text-center bg-gradient-to-r from-white to-jammify-teal bg-clip-text text-transparent">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md py-3 px-4 bg-[#152238]/70 border border-[#37E2D520] text-white focus:border-jammify-teal focus:ring-1 focus:ring-jammify-teal transition duration-300"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md py-3 px-4 bg-[#152238]/70 border border-[#37E2D520] text-white focus:border-jammify-teal focus:ring-1 focus:ring-jammify-teal transition duration-300"
                placeholder="john@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-md py-3 px-4 bg-[#152238]/70 border border-[#37E2D520] text-white focus:border-jammify-teal focus:ring-1 focus:ring-jammify-teal transition duration-300"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-md py-3 px-4 bg-[#152238]/70 border border-[#37E2D520] text-white focus:border-jammify-teal focus:ring-1 focus:ring-jammify-teal transition duration-300"
                  placeholder="••••••••"
                  required
                />
              </div>
            )}
            
            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="rounded border-[#37E2D520] text-jammify-teal focus:ring-jammify-teal"
                  />
                  <span className="ml-2 text-sm">Remember me</span>
                </label>
                <a href="#" className="text-sm text-jammify-teal hover:text-white transition duration-300">
                  Forgot password?
                </a>
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-jammify-teal text-[#16253f] py-3 rounded-md font-semibold hover:bg-opacity-90 transition duration-300"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-jammify-teal hover:text-white transition duration-300"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
        
        {/* Cover Section */}
        <div className={`hidden md:block w-1/2 bg-gradient-to-br from-jammify-teal to-jammify-blue p-8 transition-transform duration-500 ${isLogin ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-full flex flex-col justify-center items-center text-center text-white">
            <h2 className="text-3xl font-display font-bold mb-4">
              {isLogin ? 'Welcome Back!' : 'Hello, Friend!'}
            </h2>
            <p className="text-lg mb-8">
              {isLogin
                ? 'Enter your personal details and start your journey with us'
                : 'Enter your personal details and start your journey with us'}
            </p>
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
              <div className="absolute inset-4 bg-white/5 rounded-full animate-pulse delay-75"></div>
              <div className="absolute inset-8 bg-white/5 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login; 