import React, { useState, createContext } from 'react';
import axios from 'axios';
import { baseUrl } from '../config/config';

export const AuthContext = createContext({
  user: null,

  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const signIn = async (email, password) => {
    try {
      const response = await axios.post(`${baseUrl}/signIn`, {
        email: email.toLowerCase(),
        password,
      });
      console.log('response:', response.data.role);

      setUser(response.data.user);
      setRole(response.data.role);
      return response.data.role;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error('Invalid email or password');
      } else {
        console.log('Server error:', error);
        throw new Error(
          'An error occurred while signing in. Please try again later.'
        );
      }
    }
  };


  const signOut = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider;
