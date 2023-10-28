import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../constants/logo.png";
import menu from "../constants/menu.svg";
import close from "../constants/close.svg";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { getUser } from "../actions/posts";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [showDropdown, setShowDropdown] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  const handleGoogleLoginSuccess = async (response) => {
    const decoded = jwt_decode(response.credential);

    const user = {
      name: decoded.name,
      email: decoded.email,
      avatar: decoded.picture,
    };

    try {
      await dispatch(getUser(user));
      navigate("/dashboard");
      setShowDropdown(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLoginError = () => {
    console.log("Google login error");
  };

  const handleLogout = () => {
    localStorage.removeItem("profile");
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);

    setShowDropdown(false);
  };

  const mobileNavToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <nav className="z-10 relative">
      <div className="max-w-[1300px] p-8 mx-auto flex items-center justify-between">
        <div className="font-bold text-darkGrey text-[1.7em]">
          <Link to="/" className="flex flex-row items-center">
            <img src={logo} className="w-[45px] mr-2" alt="Logo" />
            <div className="hidden sm:block">TechPathways</div>
          </Link>
        </div>

        <div className="sm:block hidden sm:flex sm:flex-row items-center text-darkGrey space-x-8 font-semibold">
          <Link to="/summer" className="nav__text">
            Summer
          </Link>
          <Link to="/offseason" className="nav__text">
            Offseason
          </Link>
          <Link to="/newgrad" className="nav__text">
            New Grad
          </Link>
          {user && (
            <a href="/dashboard" className="nav__text">
              Dashboard
            </a>
          )}
        </div>
        {user && (
          <div
            className="sm:inline-flex hidden flex flex-row items-center space-x-2 btn__gradient2 rounded-md cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              className="w-[30px] h-[30px] object-cover rounded-full"
              src={user.avatar}
              alt={user.name}
            />
            <div className="text-white font-medium">{user.name}</div>
          </div>
        )}
        {!user && (
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
            cookiePolicy="single_host_origin"
          />
        )}

        <div className="sm:hidden block">
          <img
            src={toggle ? close : menu}
            className="w-[28px] h-[28px] object-contain mr-4 cursor-pointer"
            onClick={mobileNavToggle}
          />
        </div>
      </div>

      <div
        className={`${
          toggle ? "active" : ""
        } transition-transform absolute top-0 duration-300 ease-in-out transform sm:hidden`}
      >
        <div
          id="navbar"
          className={`${
            toggle ? "active" : ""
          } transition-transform duration-300 ease-in-out transform`}
        >
          <Link to="/summer" className="nav__text text-white">
            Summer
          </Link>
          <Link to="/offseason" className="nav__text text-white">
            Offseason
          </Link>
          <Link to="/newgrad" className="nav__text text-white">
            New Grad
          </Link>
          {user && (
            <a href="/dashboard" className="nav__text text-white">
              Dashboard
            </a>
          )}
          {user && (
            <div
              className="flex flex-row items-center space-x-2 btn__gradient2 rounded-md cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                className="w-[30px] h-[30px] object-cover rounded-full"
                src={user.avatar}
                alt={user.name}
              />
              <div className="text-white font-medium">{user.name}</div>
            </div>
          )}
          {!user && (
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              cookiePolicy="single_host_origin"
            />
          )}
        </div>
      </div>

      {showDropdown && user && (
        <div className="absolute top-[calc(100%+10px)] right-0 bg-white shadow-md rounded-md mt-2">
          <button
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
