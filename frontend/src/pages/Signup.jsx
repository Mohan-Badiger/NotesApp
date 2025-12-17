import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../context/ContexProvider"; // import BASE_URL

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, {
        name,
        email,
        password,
      });

      toast.success("Signup Successful!");

      // Redirect to Home page after signup
      navigate("/home");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center place-items-start p-10 bg-gray-200 px-0">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center ">Signup</h1>

        <label className="text-sm font-medium">Name</label>
        <input
          className="border w-full px-3 py-2 rounded mb-3 text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          className="border w-full px-3 py-2 rounded mb-3 text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="text-sm font-medium">Password</label>
        <input
          type="password"
          className="border w-full px-3 py-2 rounded mb-4 text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-orange-500 text-white w-full py-2 rounded text-sm sm:text-base hover:bg-orange-300 transition">
          Signup
        </button>

        <p className="mt-3 text-center text-sm sm:text-base">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
