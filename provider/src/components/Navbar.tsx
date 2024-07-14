import React, { useState } from "react";
import { useNavigate } from "react-router";
import { userState } from "../store/user";
import { useRecoilState } from "recoil";
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useRecoilState(userState);
  console.log(isUserLoggedIn);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen); // Toggle the state correctly
  };

  const handleSignIn = () => {
    // Simulating sign-in action
    navigate("/login");
    console.log("User signed in.");
  };

  const handleLogout = () => {
    // Simulating logout action
    navigate("/");
    console.log("User logged out.");
  };

  return (
    <div className="relative top-0 left-0 right-0  flex justify-between items-center px-4 py-2 z-40">
      {/* Hamburger Icon or Close Icon */}
      <div className="cursor-pointer flex gap-2" onClick={toggleMenu}>
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
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
        <h1>Avon Health</h1>
        {/* )} */}
      </div>

      {/* Conditional Rendering for Sign-in/Logout Buttons */}
      {isUserLoggedIn?.email != "" ? (
        <button
          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <button
          className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
          onClick={handleSignIn}
        >
          Sign In
        </button>
      )}

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-orange-50 z-50 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={toggleMenu}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <ul className="p-4 ">
            <li
              className="pt-6 pb-2 hover:text-gray-300"
              onClick={() => {
                toggleMenu();
                navigate("/dashboard");
              }}
            >
              Home
            </li>
            <li
              className="pb-2 hover:text-gray-300"
              onClick={() => {
                toggleMenu();
                navigate("/add-patient");
              }}
            >
              Add Patient
            </li>
            <li
              className="py-2 hover:text-gray-300"
              onClick={() => {
                toggleMenu();
                navigate("/add-medical-center");
              }}
            >
              Add Medical Center
            </li>
            <li
              className="py-2 hover:text-gray-300"
              onClick={() => {
                toggleMenu();
                navigate("/add-provider");
              }}
            >
              Add Provider
            </li>
            <li
              className="py-2 hover:text-gray-300"
              onClick={() => {
                toggleMenu();
                navigate("/add-support");
              }}
            >
              Add Support
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
