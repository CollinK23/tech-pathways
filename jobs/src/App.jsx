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
  DashNav,
} from "./components";
import { Route, Routes, useParams, useLocation } from "react-router-dom";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PrivateRoute from "./privateRoute/PrivateRoute";

const App = () => {
  const location = useLocation();

  const nonNavbarRoutes = ["/dashboard", "/internships", "/applications"];
  const shouldRenderNavbar = !nonNavbarRoutes.includes(location.pathname);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
      {shouldRenderNavbar && <Navbar />}

      <div className={!shouldRenderNavbar ? "sm:flex sm:flex-row" : ""}>
        {!shouldRenderNavbar && (
          <DashNav className="absolute z-10 !important" />
        )}
        <Routes>
          <Route index element={<Home />} />
          <Route path="/summer" element={<Summer />} />
          <Route path="/offseason" element={<Offseason />} />
          <Route path="/newgrad" element={<Newgrad />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/internships"
            element={
              <PrivateRoute>
                <Internships />
              </PrivateRoute>
            }
          />
          <Route
            path="/applications"
            element={
              <PrivateRoute>
                <Applications />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
