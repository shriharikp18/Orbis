import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthContextType } from '../types';
import { mockUsers, delay } from '../utils/mockData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await delay(800);

    // In production, this would be a real API call:
    // const response = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    // const data = await response.json();
    
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (!foundUser || password !== 'password123') {
      throw new Error('Invalid credentials');
    }

    // Generate mock JWT token (in production, this comes from backend)
    const mockToken = `mock.jwt.token.${foundUser.id}.${Date.now()}`;
    
    setUser(foundUser);
    setToken(mockToken);
    
    // Persist to localStorage
    localStorage.setItem('user', JSON.stringify(foundUser));
    localStorage.setItem('token', mockToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user && !!token
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
