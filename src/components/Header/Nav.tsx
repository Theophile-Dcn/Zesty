'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <Link href="/recettes" className="">
            Liste de recettes
          </Link>
          <Link href="/courses" className="">
            liste de courses
          </Link>
          <Link href="/cuisine" className="">
            Passer en cuisine
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className=" focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <Link href="/" className="block  py-2">
          Home
        </Link>
        <Link href="/about" className="block  py-2">
          About
        </Link>
        <Link href="/services" className="block  py-2">
          Services
        </Link>
        <Link href="/contact" className="block  py-2">
          Contact
        </Link>
      </div>
    </nav>
  );
}
