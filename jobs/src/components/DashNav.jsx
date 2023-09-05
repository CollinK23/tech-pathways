import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../constants/logo.png";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";

const DashNav = ({ selected }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(
    useSelector((state) => state.expand.expanded)
  );

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  const toggleExpanded = () => {
    if (expanded) {
      dispatch({ type: "CLOSE" });
    } else {
      dispatch({ type: "EXPAND" });
    }
    setExpanded(!expanded);
  };

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth >= 768) {
  //       dispatch({ type: "EXPAND" });
  //     } else {
  //       dispatch({ type: "CLOSE" });
  //     }
  //     setExpanded(!expanded);
  //   };

  //   handleResize();

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem("profile");
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };
  return (
    <div>
      <div
        className={
          expanded
            ? `bg-primary w-[250px] h-full fixed bottom-0`
            : `bg-primary h-full fixed inline-block bottom-0`
        }
      >
        <div className="w-[100%]  p-4">
          <div className="font-semibold text-white text-[1.3em]">
            <div className="flex flex-row">
              <img src={logo} className="w-[30px] mr-2"></img>
              {expanded ? "TechPathways" : ""}
            </div>
          </div>
        </div>
        <Link to="/dashboard">
          <div
            className={
              selected == "Dashboard"
                ? `w-[100%] text-white  text-[16px] p-2 cursor-pointer nav__btn__no__hover`
                : `w-[100%] text-white  text-[16px] p-2 cursor-pointer nav__btn`
            }
          >
            <i className="fa-solid fa-house m-4"></i>
            {expanded ? "Dashboard" : ""}
          </div>
        </Link>
        <Link to="/internships">
          <div
            className={
              selected == "Internships"
                ? `w-[100%] text-white  text-[16px] p-2 cursor-pointer nav__btn__no__hover`
                : `w-[100%] text-white  text-[16px] p-2 cursor-pointer nav__btn`
            }
          >
            <i className="fa-solid fa-suitcase m-4"></i>
            {expanded ? "Internships" : ""}
          </div>
        </Link>
        <Link to="/applications">
          <div
            className={
              selected == "Applications"
                ? `w-[100%] text-white  text-[16px] p-2 cursor-pointer nav__btn__no__hover`
                : `w-[100%] text-white  text-[16px] p-2 cursor-pointer nav__btn`
            }
          >
            <i className="fa-solid fa-clock-rotate-left fa-flip-horizontal m-4"></i>
            {expanded ? "Applications" : ""}
          </div>
        </Link>
        <div
          className={`w-[100%] text-white  text-[16px] p-2 cursor-pointer nav__btn`}
          onClick={handleLogout}
        >
          <i className="fa-solid fa-arrow-right-from-bracket m-4"></i>
          {expanded ? "Sign Out" : ""}
        </div>
        <div className="hidden sm:flex justify-center items-end h-[60px] text-white">
          <div onClick={toggleExpanded} className="cursor-pointer">
            {expanded ? (
              <>
                <i className="fa-solid fa-chevron-up fa-rotate-270 -mr-1"></i>
                <i className="fa-solid fa-chevron-up fa-rotate-270"></i>
              </>
            ) : (
              <>
                <i className="fa-solid fa-chevron-up fa-rotate-90 -mr-1"></i>
                <i className="fa-solid fa-chevron-up fa-rotate-90"></i>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className={
          expanded
            ? `bg-primary w-[250px] bottom-0`
            : `bg-primary h-full w-[70px] top-0`
        }
      ></div>

      <div
        className={
          expanded
            ? "flex flex-row items-center space-x-2 rounded-md bg-primary w-[250px] bottom-0 p-4 fixed"
            : "flex flex-row items-center space-x-2 rounded-md bg-primary w-[70px] bottom-0 p-4 fixed"
        }
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <img
          className="w-[36px] h-[36px] object-cover rounded-full"
          src={user.avatar}
          alt={user.name}
        />
        {expanded ? (
          <div className="text-white font-medium">{user.name}</div>
        ) : null}
      </div>
    </div>
  );
};

export default DashNav;
