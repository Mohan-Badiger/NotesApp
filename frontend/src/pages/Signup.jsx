import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../context/ContexProvider";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/auth/register`, {
        name,
        email,
        password,
      });

      toast.success("Signup successful ✅");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Signup failed ❌");
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-[#0f172a] overflow-hidden">
      <form
        onSubmit={handleSignup}
        className="bg-[#111827] border border-gray-700 p-6 rounded-md shadow-lg w-full max-w-sm text-gray-100"
      >
        <h2 className="text-2xl font-semibold mb-5 text-center tracking-wide">
          Signup
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 px-3 py-2 rounded-sm bg-[#1f2937] border border-gray-600
          text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 rounded-sm bg-[#1f2937] border border-gray-600
          text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 rounded-sm bg-[#1f2937] border border-gray-600
          text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-500 transition
          text-white py-2 rounded-md font-medium tracking-wide"
        >
          Signup
        </button>

        <p className="text-center mt-4 text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-400 hover:text-teal-300 font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
