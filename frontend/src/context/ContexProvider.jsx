import React, { createContext, useContext, useState } from "react";

export const BASE_URL = "https://notesapp-backend-wloz.onrender.com/api";

const AuthContext = createContext();

export const ContexProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (data) => {
    setUser(data); // { user, token }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
