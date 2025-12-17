import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const ContexProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); // userData must include token
    localStorage.setItem("user", JSON.stringify(userData)); // persist login
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
