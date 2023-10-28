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

  const handleLogout = () => {
    localStorage.removeItem("profile");
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };
  return (
    <div className="sticky z-10">
      <div
        className={
          expanded ? `sm:hidden fixed bg-[#00000090] w-full h-[100%] top-0` : ``
        }
      ></div>
      <div className=" flex flex-row">
        <div className={expanded ? `block` : `hidden sm:block`}>
          <div
            className={
              expanded
                ? `bg-darkGrey  w-[250px] h-full fixed bottom-0`
                : `bg-darkGrey h-full fixed inline-block bottom-0`
            }
          >
            <div className="w-[100%]  p-4 sm:pt-4 pt-8">
              <div className="font-semibold text-white text-[1.3em]">
                <Link to="/" className="flex flex-row">
                  <img src={logo} className="w-[30px] mr-2"></img>
                  {expanded ? "TechPathways" : ""}
                </Link>
              </div>
            </div>
            <Link to="/dashboard">
              <div
                title="Dashboard"
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
                title="Internships"
                className={
                  selected == "Internships"
                    ? `w-[100%] text-white  text-[16px] p-2 cursor-pointer nav__btn__no__hover`
                    : `w-[100%] text-white  text-[16px] p-2 cursor-pointer nav__btn`
                }
              >
                <i className="fa-solid fa-suitcase m-4"></i>
                {expanded ? "Find Jobs" : ""}
              </div>
            </Link>
            <Link to="/applications">
              <div
                title="Applications"
                className={
                  selected == "Applications"
                    ? `w-[100%] text-white  text-[16px] p-2 cursor-pointer nav__btn__no__hover`
                    : `w-[100%] text-white  text-[16px] p-2 cursor-pointer nav__btn`
                }
              >
                <i className="fa-solid fa-clock-rotate-left fa-flip-horizontal m-4"></i>
                {expanded ? "My Applications" : ""}
              </div>
            </Link>
            <div
              title="Logout"
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
                ? "flex flex-row items-center space-x-2 rounded-md  w-[250px] bottom-0 p-4 fixed"
                : "flex flex-row items-center space-x-2 rounded-md  w-[70px] bottom-0 p-4 fixed"
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
        <div className="sm:hidden absolute w-full h-[100px] ">
          {expanded ? (
            <i
              className=" fixed right-0 fa-solid fa-xmark text-white text-[32px] p-8"
              onClick={toggleExpanded}
            ></i>
          ) : (
            <i
              className="absolute left- fa-solid fa-bars text-white text-[32px] p-8"
              onClick={toggleExpanded}
            ></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashNav;
