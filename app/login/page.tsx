"use client";

import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in", username, password);
  };

  return (
    <div className="flex h-screen">
      <div 
        className="relative flex items-center justify-center text-white" 
        style={{
          width: '675px',
          opacity: 0.75, 
          background: 'conic-gradient(from -68deg at 50.89% 26.15%, #6B90E8 0deg, #3E3183 308.53201389312744deg)', 
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <img 
          src="/logo.png" 
          alt="SahabatModal Logo" 
          className="absolute z-20 top-0 left-0 m-4"
          style={{ width: '82.68px', height: 'auto' }}
        />
        <img 
          src="ellipse-login.svg" 
          alt="Ellipse" 
          className="absolute z-10"
          style={{ top: '150px', right: '0', width: '453px', height: 'auto' }} 
        />
        <div className="text-center p-10">
          <h1 className="text-3xl font-bold mb-4">Koneksi, Inkubasi, Ekspansi</h1>
          <p className="text-lg" style={{ fontSize: '42px' }}>with</p>
          <h2 className="text-4xl font-bold mt-2"  style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>= SahabatModal</h2>
        </div>
      </div>
      <div 
        className="flex items-center justify-center bg-white" 
        style={{ width: '837px'}}
      >
        <div className="w-3/4">
          <div 
            className="absolute top-20 right-20 flex flex-col justify-center items-center mb-4" 
            style={{
              width: '60px',
              height: '60px',
              padding: '26px 16px',
              borderRadius: '50%',
              border: '2.633px solid',
              borderImage: 'linear-gradient(135deg, #F103CF, #74A3FF) 1',
            }}
          >
            <p className="text-gray-500" >1/1</p>
          </div>
          <h2 className="text-4xl font-semibold mb-8 text-center  text-black" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>LOGIN</h2>
          <div className="mb-4">
            <label className="block mb-2" style={{ color: '#0010A4' }}>
              Username<span style={{ color: 'red' }}> *</span>
            </label>
            <input
              type="text"
              placeholder="Masukkan username Anda.."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={(e) => e.target.style.color = '#0010A4'}
              onBlur={(e) => e.target.style.color = username ? '#0010A4' : 'initial'} 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              style={{
                borderRadius: '5px',
                border: '1.5px solid #C9C9C9',
                background: 'var(--Miscellaneous-Floating-Tab---Pill-Fill, #FFF)',
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" style={{ color: '#0010A4' }}>
              Password<span style={{ color: 'red' }}> *</span>
            </label>
            <input
              type="password"
              placeholder="Masukkan password Anda.."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => e.target.style.color = '#0010A4'}
              onBlur={(e) => e.target.style.color = username ? '#0010A4' : 'initial'} 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              style={{
                borderRadius: '5px',
                border: '1.5px solid #C9C9C9',
                background: 'var(--Miscellaneous-Floating-Tab---Pill-Fill, #FFF)',
              }}
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full py-2 transition duration-200"
            style={{
              borderRadius: '269.667px',
              background: 'radial-gradient(61.94% 48.96% at 49.96% 96.22%, #3B47BC 0%, #374583 100%)',
              boxShadow: '0px 1.079px 67.417px 0px #D9E6FE, 0px 0px 0px 11.865px rgba(255, 255, 255, 0.07), 0px -1.079px 0px 2.697px rgba(0, 0, 0, 0.20) inset, 0px 1.079px 0px 2.697px rgba(255, 255, 255, 0.40) inset',
              color: 'white', 
            }}
          >
            LOGIN
          </button>
          <div className="text-center mt-4">
            <p className="text-gray-500">
              belum memiliki akun?{" "}
              <a href="#" style={{ color: '#DC2522', textDecoration: 'underline' }}>
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
