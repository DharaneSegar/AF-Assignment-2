import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../components/signIn";
import SignUp from "../components/signUp";
import Home from "../components/home";
import APOD from "../components/apod";
import Mars from "../components/mars";
import Earth from "../components/earth";
import Error from "../components/error";

const FrontendRoutes = () => {
  // Check if a valid token exists in local storage
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    // Check if token exists and is not expired (you can implement token expiration logic if needed)
    console.log(token)
    return token !== null;
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/error" element={<Error/>} />
        {/* Protected routes */}
        <Route exact path="/home" element={isAuthenticated() ? <Home /> : <Navigate to="/error" replace />} />
        <Route exact path="/apod" element={isAuthenticated() ? <APOD /> : <Navigate to="/error" replace />} />
        <Route exact path="/mars" element={isAuthenticated() ? <Mars /> : <Navigate to="/error" replace />} />
        <Route exact path="/earth" element={isAuthenticated() ? <Earth /> : <Navigate to="/error" replace />} />
      </Routes>
    </Router>
  );
};

export default FrontendRoutes;
