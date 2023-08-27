import { React, useEffect } from "react";
import {
  Home,
  Navbar,
  Summer,
  Offseason,
  Newgrad,
  Dashboard,
  Internships,
  Applications,
} from "./components";
import { Route, Routes, useParams, useLocation } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";
import { getApps } from "./actions/posts";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getApps());
  }, [dispatch]);

  const nonNavbarRoutes = ["/dashboard", "/internships", "/applications"];
  const shouldRenderNavbar = !nonNavbarRoutes.includes(location.pathname);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
      {shouldRenderNavbar && <Navbar />}

      <Routes>
        <Route index element={<Home />} />
        <Route path="/summer" element={<Summer />} />
        <Route path="/offseason" element={<Offseason />} />
        <Route path="/newgrad" element={<Newgrad />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
