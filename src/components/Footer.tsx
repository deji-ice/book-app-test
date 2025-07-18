import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t mt-10 py-6 h-full min-h-[5rem]  max-h-[10rem] lg:min-h-[7rem] flex flex-col md:flex-row items-center justify-between  px-4 lg:px-10">
      <span className="text-gray-500 text-sm text-center md:text-left">
        &copy; {new Date().getFullYear()} Book Store. All rights reserved.
      </span>
      <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-2 md:mt-0">
        <a href="/" className="text-blue-600 hover:underline text-sm">
          Home
        </a>
        <a href="/register" className="text-blue-600 hover:underline text-sm">
          Register
        </a>
        <a href="/login" className="text-blue-600 hover:underline text-sm">
          Login
        </a>
      </div>
    </footer>
  );
};

export default Footer;
