import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContexProvider";
import { FiSearch, FiLogOut, FiUser } from "react-icons/fi";

const Navbar = ({ onSearch }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <nav className="bg-[#0f172a] border-b border-gray-700 px-5 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* LOGO */}
        <Link
          to="/"
          className="text-xl font-semibold tracking-wide text-teal-400"
        >
          NoteApp
        </Link>

        {/* SEARCH */}
        <div className="relative w-full md:w-1/3">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search notes..."
            value={query}
            onChange={handleSearch}
            className="w-full pl-10 pr-3 py-2 rounded-md
            bg-[#1f2937] border border-gray-600
            text-gray-100 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-[#1f2937] border border-gray-600
                text-gray-100 hover:bg-gray-700 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 rounded-md bg-teal-600
                text-white hover:bg-teal-500 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 px-3 py-2 rounded-md
                bg-[#1f2937] border border-gray-600 text-gray-200">
                <FiUser size={16} />
                <span className="text-sm font-medium">{user.name}</span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-md
                bg-red-600 text-white hover:bg-red-500 transition"
              >
                <FiLogOut size={16} />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
