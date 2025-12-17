import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar onSearch={setSearchQuery} />

      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/home" element={<Home searchQuery={searchQuery} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
