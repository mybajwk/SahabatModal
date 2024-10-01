import React from "react";
import { FaSignInAlt } from "react-icons/fa"; // Icon for the button

const LoginButton = () => {
  return (
    <a
      href="#login"
      className="flex items-center justify-center space-x-2 text-white py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300"
      style={{
        background: "radial-gradient(circle, #3B47BC 100%, #374583 100%)", // Radial gradient background
      }}
    >
      <span className="font-medium">Login</span>
      <FaSignInAlt className="ml-2" /> {/* Icon on the right */}
    </a>
  );
};

export default LoginButton;
