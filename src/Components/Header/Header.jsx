import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full bg-white shadow-md sticky top-0 z-50 px-5 py-2">
      <div className="navbar">
        <div className="navbar-start ">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/item1" legacyBehavior>
                  <a className="text-sm">Item 1</a>
                </Link>
              </li>
              <li>
                <Link href="/parent" legacyBehavior>
                  <a className="text-sm">Parent</a>
                </Link>
                <ul className="p-2">
                  <li>
                    <Link href="/submenu1" legacyBehavior>
                      <a className="text-sm">Submenu 1</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/submenu2" legacyBehavior>
                      <a className="text-sm">Submenu 2</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/item3" legacyBehavior>
                  <a className="text-sm">Item 3</a>
                </Link>
              </li>
            </ul>
          </div>
          <Link href="/" legacyBehavior>
            <h1 className="text-3xl font-bold text-orange-300">VP AUTO 91</h1>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-[500]">
            {/* <li>
              <Link href="/" legacyBehavior>
                <a>ACC className="text-sm"EUIL</a>
              </Link>
            </li> */}
            <li>
              <Link href="/" legacyBehavior>
                <a className="text-sm">NOS VOITURES</a>
              </Link>
            </li>
            <li>
              <Link href="/garantie" legacyBehavior>
                <a className="text-sm">GARANTIE</a>
              </Link>
            </li>
            <li>
              <Link href="/about-us" legacyBehavior>
                <a className="text-sm">QUI SOMMES NOUS</a>
              </Link>
            </li>
            <li>
              <Link href="/contact" legacyBehavior>
                <a className="text-sm">CONTACT</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link href="/button-action" legacyBehavior>
            <button className=" px-5 py-2 rounded-md bg-orange-300 text-white ">
              Call us today
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
