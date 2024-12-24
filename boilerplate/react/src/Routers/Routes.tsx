import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Home, Login } from "./Links.ts";

function RouteConfig() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/auth/signup" element={<Signup />} />
         */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default RouteConfig;
