"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLinkClick = (href) => {
    setMenuOpen(false);
    router.push(href);
  };

  return (
    <div className="w-full bg-white shadow-md sticky top-0 z-50 px-5 py-2">
      <div className="navbar max-w-[100vw] flex justify-between items-center">
        <div className="navbar-start">
          <Link href="/" legacyBehavior>
            <a className="text-xl md:text-3xl font-bold text-red-500">
              VP AUTO 91
            </a>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-[500]">
            <li>
              <Link href="/">NOS VOITURES</Link>
            </li>
            <li>
              <Link href="/garantie">GARANTIE</Link>
            </li>
            <li>
              <Link href="/about-us">QUI SOMMES NOUS</Link>
            </li>
            <li>
              <Link href="/contact" className="uppercase">
                Nous contacter{" "}
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <Link href="/contact" legacyBehavior>
            <button className="px-5 py-2 rounded-md bg-red-500 text-white hidden md:block">
              Nous Contacter
            </button>
          </Link>

          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="btn btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="w-full fixed top-[68px] left-0 right-0 bg-white shadow-lg z-40">
          <ul className="flex flex-col font-medium text-sm">
            <li className="border-b" onClick={() => handleLinkClick("/")}>
              <a className="block w-full py-4 px-6">NOS VOITURES</a>
            </li>
            <li
              className="border-b"
              onClick={() => handleLinkClick("/garantie")}
            >
              <a className="block w-full py-4 px-6">GARANTIE</a>
            </li>
            <li
              className="border-b"
              onClick={() => handleLinkClick("/about-us")}
            >
              <a className="block w-full py-4 px-6">QUI SOMMES NOUS</a>
            </li>
            <li
              className="border-b"
              onClick={() => handleLinkClick("/contact")}
            >
              <a className="block w-full py-4 px-6">Nous Contacter</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
