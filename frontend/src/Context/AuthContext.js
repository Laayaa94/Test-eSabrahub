// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    token: localStorage.getItem('token') || null,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/auth/verify', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setAuthState({ user: response.data.user, token });
        } catch (error) {
          console.error('Token validation failed:', error);
          localStorage.removeItem('token');
          setAuthState({ user: null, token: null });
        }
      }
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    if (authState.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authState.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [authState.token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      setAuthState({ user: response.data.user, token: response.data.token });
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      throw error;
    }
  };

  const signup = async (username, email, password, confirmPassword) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', { username, email, password, confirmPassword });
      setAuthState({ user: response.data.user, token: response.data.token });
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    setAuthState({ user: null, token: null });
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
