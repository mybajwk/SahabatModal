"use client";

import React from "react";
import { FaSignInAlt } from "react-icons/fa"; // Icon for the button

const Navbar = () => {
  return (
    <header
      className="h-20 px-8 flex justify-between items-center font-lexend bg-cover bg-center"
      style={{
        backgroundImage: "url('/BG_Navbar.png')",
      }}
    >
      {/* Left: Logo */}
      <div className="flex items-center space-x-4">
        {/* <img src="/logo.png" alt="Sahabat Modal Logo" className="w-20 h-auto" /> */}
      </div>

      {/* Center: Navigation Links */}
      <nav className="hidden md:flex space-x-8">
        <a href="/" className="text-white hover:text-gray-900 text-lg">
          Home
        </a>
        <a href="#artikel" className="text-white hover:text-gray-900 text-lg">
          Artikel
        </a>
        <a href="/forum" className="text-white hover:text-gray-900 text-lg">
          Forum
        </a>
      </nav>

      {/* Right: Login Button */}
      <a
        href="/login"
        className="flex items-center justify-center space-x-2 text-white py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300"
        style={{
          background: "radial-gradient(circle, #3B47BC 100%, #374583 100%)", // Previous radial gradient for button
        }}
      >
        <span className="font-medium">Login</span>
        <FaSignInAlt className="ml-2" />
      </a>
    </header>
  );
};

export default Navbar;
