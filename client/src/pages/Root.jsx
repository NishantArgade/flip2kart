import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Root = () => {
  console.log("welcome in root");
  // add authentication here
  // check user is auth or not using token in server side only
  
  return (
    <div className="bg-[#F1F2F4] ">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
