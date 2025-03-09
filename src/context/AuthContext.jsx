import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children  }) => {
  const [token, setToken] = useState(localStorage.getItem('evolu_token') || null);
  const [newUser, setNewUser] = useState(() => {
    const storedUser = localStorage.getItem('user_logado');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (newToken, user) => {
    setToken(newToken);
    setNewUser(user);
    localStorage.setItem('evolu_token', newToken);
    localStorage.setItem('user_logado', JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setNewUser(null);
    localStorage.removeItem('evolu_token');
    localStorage.removeItem('user_logado');
  };



  return (
    <AuthContext.Provider value={{ token, login, logout, newUser }}>
      {children}
    </AuthContext.Provider>
  );
};
