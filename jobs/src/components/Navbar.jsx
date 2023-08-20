import React from "react";
import { Link } from "react-router-dom";
import logo from "../constants/logo.png";

const Navbar = () => {
  return (
    <nav className=" h-[50px] z-10 relative">
      <div className="max-w-[1300px] py-8 mx-auto flex items-center justify-between">
        <div className="font-semibold text-white text-[1.5em]">
          <Link to="/" className="flex flex-row">
            <img src={logo} className="w-[40px] mr-2"></img>
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
        </div>

        {/* <button className="btn__gradient px-4 py-2 rounded-md">Button</button> */}
      </div>
    </nav>
  );
};

export default Navbar;
