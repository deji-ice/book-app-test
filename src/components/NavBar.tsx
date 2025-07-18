"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const currentUser = useUserStore((state) => state.currentUser);
  const setUser = useUserStore((state) => state.setUser);

  return (
    <nav className="bg-white fixed w-full inset-x-0 top-0 border-b shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-teal-700">
            Book Store
          </Link>
          <div className="hidden md:flex space-x-4">
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
                  className="hover:text-teal-600 bg-transparent border-none cursor-pointer"
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
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="text-teal-700 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
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
        </div>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link href="/" className="block hover:text-teal-600">
            Home
          </Link>

          {currentUser?.id ? (
            <>
              <Link href="/account" className="block hover:text-teal-600">
                Account
              </Link>
              <button
                onClick={() => setUser(null)}
                className="block hover:text-teal-600 bg-transparent border-none cursor-pointer w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/register" className="block hover:text-teal-600">
                Register
              </Link>
              <Link href="/login" className="block hover:text-teal-600">
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
