import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if we have a stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('jammifyUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem('jammifyUser', JSON.stringify(user));
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('jammifyUser');
  };
  
  // Helper to get user's first name
  const getFirstName = () => {
    return currentUser ? currentUser.username.split(' ')[0] : null;
  };

  const value = {
    currentUser,
    login,
    logout,
    loading,
    getFirstName
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext; 