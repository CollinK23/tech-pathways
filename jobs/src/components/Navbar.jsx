import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../constants/logo.png";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { getUser } from "../actions/posts";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [showDropdown, setShowDropdown] = useState(false);

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

  return (
    <nav className="h-[50px] z-10 relative">
      <div className="max-w-[1300px] py-8 mx-auto flex items-center justify-between">
        <div className="font-semibold text-white text-[1.5em]">
          <Link to="/" className="flex flex-row">
            <img src={logo} className="w-[40px] mr-2" alt="Logo" />
            TechPathways
          </Link>
        </div>

        <div className="flex text-white space-x-8 font-medium">
          <Link to="/summer" className="nav__text">
            Summer
          </Link>
          <Link to="/offseason" className="nav__text">
            Offseason
          </Link>
          <Link to="/newgrad" className="nav__text">
            New Grad
          </Link>
          {user ? (
            <a href="/dashboard" className="nav__text">
              Dashboard
            </a>
          ) : null}
        </div>

        <div>
          {user ? (
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
          ) : (
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              cookiePolicy="single_host_origin"
            />
          )}
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
      </div>
    </nav>
  );
};

export default Navbar;
