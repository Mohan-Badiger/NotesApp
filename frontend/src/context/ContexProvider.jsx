
import React, { createContext, useContext, useState } from "react";

// ✅ Backend Base URL
export const BASE_URL = "http://localhost:5000/api";

// Create Context
const AuthContext = createContext();

// Provider
export const ContexProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login function
  const login = (userData) => {
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        BASE_URL,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};
