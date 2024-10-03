"use client";

import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import Image from "next/image";
import SamoLogo from "@/public/logo2.png";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <header
      className="h-20 px-8 flex justify-between items-center font-lexend bg-cover bg-center"
      style={{
        backgroundImage: "url('/BG_Navbar.png')",
      }}
    >
      <Image
        src={SamoLogo}
        alt="thumbnail"
        width={0}
        height={0}
        sizes="100vw"
        className="object-cover w-[120px] object-center"
      />

      {/* Center: Navigation Links */}
      <nav className="hidden md:flex space-x-8">
        <a href="/" className="text-white hover:text-gray-900 text-lg">
          Home
        </a>
        {(session?.user.role === 4 || session?.user.role === 3) && (
          <a
            href={session?.user.role === 4 ? "/investor-view" : "/funding"}
            className="text-white hover:text-gray-900 text-lg"
          >
            Crowdfunding
          </a>
        )}

        <a href="#artikel" className="text-white hover:text-gray-900 text-lg">
          Artikel
        </a>
        <a href="/forum" className="text-white hover:text-gray-900 text-lg">
          Forum
        </a>
      </nav>

      {!session ? (
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
      ) : (
        <a href="/profile">
          <Avatar>
            <AvatarImage src={session.user.image} />
            <AvatarFallback className="bg-yellow-400">CN</AvatarFallback>
          </Avatar>
        </a>
      )}
    </header>
  );
};

export default Navbar;
