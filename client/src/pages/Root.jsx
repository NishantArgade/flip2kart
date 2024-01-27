import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Root = () => {
  console.log("welcome in root");
  // add authentication here
  // check user is auth or not using token in server side only

  return (
    <div className="">
      <Navbar />
      <div className="bg-[#F1F2F4] pt-2    flex flex-col justify-between min-h-screen max-h-fit">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Root;
