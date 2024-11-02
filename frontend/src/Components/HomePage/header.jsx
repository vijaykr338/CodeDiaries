import React, { useEffect, useState, useContext } from "react";
import { GoHomeFill } from "react-icons/go";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../assets/logo.png";
import Button from "./Button";
import { Link } from "react-router-dom";

import { AuthContext } from "../../AuthContext";

const Header = () => {
  const { user, loading, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="w-screen flex justify-center items-center pt-5 h-32 pl-5 pr-5 md:pl-10 md:pr-10 overflow-hidden">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-white"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen flex justify-between items-center py-5 px-5 md:px-10 md: overflow-hidden sticky top-0">
      <div className="flex justify-between items-center gap-2 md:gap-3 lg:gap-5">
       {user && <Link to={`/profile/${user.email}`}>
          <img
            src={logo}
            className="bg-white h-10 w-10 md:h-16 md:w-16 rounded-full mr-3"
          />
        </Link>}
        <Link to="/">
          <GoHomeFill className="text-white h-14 w-14" />
        </Link>
        <Link to="/create-post">
          {user ? (
            <div className=" border-2 border-gray-500 px-3 py-1 rounded-xl text-gray-500 text-md md:text-xl font-bold hover:text-white duration-500 flex items-center gap-1">
              <MdEdit className="text-2xl" /> CREATE POST
            </div>
          ) : null}
        </Link>
      </div>
      <div className="flex  justify-center items-center gap-2 md:gap-5">
        <div className="md:flex hidden ml-[380px] items-center gap-2 md:gap-5">
          <FaInstagram className="text-white font-bold bg-gradient-to-br from-indigo-500 to-red-600 rounded-xl h-12 w-12" />
          <FaFacebookSquare className="text-[#3b5999] h-12 w-12" />
          <FaXTwitter className="text-white h-12 w-12" />
        </div>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-white text-black border border-gray-300 px-4 py-2 rounded cursor-pointer text-lg"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/signup">
              <Button title="Sign Up" />
            </Link>
            <Link to="/signin">
              <Button title="Sign In" />
            </Link>
          </>
        )}
        <GiHamburgerMenu className="text-white h-10 w-10" />
      </div>
    </div>
  );
};

export default Header;
