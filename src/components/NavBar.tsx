"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const currentUser = useUserStore((state) => state.currentUser);
  const setUser = useUserStore((state) => state.setUser);

  return (
    <nav className="bg-teal-800 fixed w-full inset-x-0 top-0 border-b shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/" className="text-xl font-bold text-white">
          Book Store
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex text-white font-semibold space-x-6 items-center">
          <Link href="/" className="hover:text-teal-600">
            Home
          </Link>

          {currentUser?.id ? (
            <>
              <Link href="/account" className="hover:text-teal-600">
                Account
              </Link>
              <button
                onClick={() => setUser(null)}
                className="hover:text-teal-600 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/register" className="hover:text-teal-600">
                Register
              </Link>
              <Link href="/login" className="hover:text-teal-600">
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
          className="md:hidden text-teal-700 focus:outline-none"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="white"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-teal-800 text-white font-semibold px-4 pb-4 overflow-hidden transition-all duration-300 ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Link href="/" className="block py-2 hover:text-teal-600">
          Home
        </Link>

        {currentUser?.id ? (
          <>
            <Link href="/account" className="block py-2 hover:text-teal-600">
              Account
            </Link>
            <button
              onClick={() => setUser(null)}
              className="block w-full text-left py-2 hover:text-teal-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/register" className="block py-2 hover:text-teal-600">
              Register
            </Link>
            <Link href="/login" className="block py-2 hover:text-teal-600">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
