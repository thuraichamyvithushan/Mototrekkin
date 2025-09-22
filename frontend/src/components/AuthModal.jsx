import React, { useState } from "react";
import authimg from "../assets/login-sideimage.webp";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="bg-black rounded-2xl shadow-lg w-full max-w-3xl flex flex-col md:flex-row overflow-hidden">
        {/* Left side (Image) */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={authimg}
            alt="Bike"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right side (Form) */}
        <div className="w-full md:w-1/2 p-8 relative text-white">
          {/* Close button */}
          <button
            className="absolute p-1 top-3 right-3 text-gray-400 hover:text-white cursor-pointer hover:border hover:rounded-2xl hover:bg-yellow-600 transition"
            onClick={onClose}
          >
            ✕
          </button>

          {/* Tabs */}
          <div className="flex mb-6 border-b border-gray-700 mt-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 p-2 text-lg font-semibold cursor-pointer rounded-md ${
                isLogin
                  ? "border-b-2 border-yellow-500 text-yellow-400 bg-yellow-900"
                  : "text-gray-400"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 p-2 text-lg font-semibold cursor-pointer rounded-md ${
                !isLogin
                  ? "border-b-2 border-yellow-500 text-yellow-400 bg-yellow-900"
                  : "text-gray-400"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          {isLogin ? (
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email / Username"
                className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
              />
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-yellow-400 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <button className="w-full py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 cursor-pointer">
                Sign In
              </button>
            </form>
          ) : (
            /* Signup Form */
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
              />

              {/* Terms of Service Checkbox */}
              <label className="flex items-center space-x-2 text-sm cursor-pointer">
                <input type="checkbox" className="h-4 w-4" />
                <span>
                  I accept the{" "}
                  <a href="#" className="text-yellow-400 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-yellow-400 hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>

              <button className="w-full py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 cursor-pointer">
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
