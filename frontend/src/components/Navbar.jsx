import { useState } from "react";
import { Search, User, ShoppingCart, Menu, X,  } from "lucide-react";
import { NavLink } from 'react-router-dom';
import logo from "../assets/MT.webp"

export default function Navbar({ onUserClick }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-yellow-500 px-6 py-3 flex items-center justify-between sticky top-0 z-1000">
      {/* Left: Logo */}
      <div className=" font-extrabold ">
        <NavLink to="/">
        <img src={logo} alt="logo" className="w-50"/>
        </NavLink>
      </div>

      {/* Desktop Nav */}
      <div className="hidden lg:flex space-x-8 text-sm font-medium">
        <a href="/motorcycle-adventures" className="hover:text-yellow-400 transition">Adventures</a>
        <a href="/MotorcycleHire" className="hover:text-yellow-400 transition">Hire</a>
        <a href="/mototrekkin-videos" className="hover:text-yellow-400 transition">Videos</a>
          <a href="https://store.mototrekkin.com.au/" className="hover:text-yellow-400 transition">Shop</a>
        <a href="/training" className="hover:text-yellow-400 transition">Training</a>
        <a href="https://store.mototrekkin.com.au/tyres/" className="hover:text-yellow-400 transition">Tyres</a>
        <a href="/services" className="hover:text-yellow-400 transition">Service</a>
        <a href="tel:0240724511" className="hover:text-yellow-400 transition">02 4072 4511</a>
      </div>

      {/* Right: Icons + Hamburger */}
      <div className="flex items-center space-x-6 text-white">
        {/* <button className="hover:text-yellow-400">
          <Search size={20} />
        </button> */}
        {/* User Icon */}
      <button
        onClick={onUserClick}
        className="ml-4 p-2 rounded-full hover:bg-yellow-600 transition cursor-pointer"
      >
        <User size={24} />
      </button>
        {/* <button className="hover:text-yellow-400">
          <ShoppingCart size={20} />
        </button> */}

        {/* Hamburger menu for mobile */}
        <button
          className="lg:hidden text-yellow-500 hover:text-yellow-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-black text-yellow-500 flex flex-col items-center space-y-4 py-6 lg:hidden">
          <a href="/motorcycle-adventures" className="hover:text-yellow-400 transition">Adventures</a>
          <a href="/MotorcycleHire" className="hover:text-yellow-400 transition">Hire</a>
          <a href="/mototrekkin-videos" className="hover:text-yellow-400 transition">Videos</a>
          <a href="https://store.mototrekkin.com.au/" className="hover:text-yellow-400 transition">Shop</a>
          <a href="/training" className="hover:text-yellow-400 transition">Training</a>
          <a href="https://store.mototrekkin.com.au/tyres/" className="hover:text-yellow-400 transition">Tyres</a>
          <a href="/services" className="hover:text-yellow-400 transition">Service</a>
          <a href="tel:0240724511" className="hover:text-yellow-400 transition">02 4072 4511</a>
        </div>
      )}
    </nav>
  );
}
