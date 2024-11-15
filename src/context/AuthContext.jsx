import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [newUser, setNewUser] = useState(() => {
    const storedUser = localStorage.getItem('user_work');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (newToken, user) => {
    setToken(newToken);
    setNewUser(user);
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('user_work', JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setNewUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user_work');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, newUser }}>
      {children}
    </AuthContext.Provider>
  );
};
