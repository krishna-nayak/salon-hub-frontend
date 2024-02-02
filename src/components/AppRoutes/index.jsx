import React from "react";
import { Route, Routes } from "react-router-dom";
import SalonRegister from "../../pages/SalonRegister";

function Index() {
  return (
    <Routes>
      <Route path="/salonRegister" exact element={<SalonRegister />} />
    </Routes>
  );
}

function PageNotFound() {
  return (
    <div style={{ minHeight: "calc(100vh - 51px)" }}>Page Not Found:404</div>
  );
}

export default Index;
