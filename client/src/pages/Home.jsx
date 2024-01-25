import React from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import Categories from "../components/Categories.jsx";
import HomeCarousel from "../components/HomeCarousel.jsx";

const Home = () => {
  return (
    <div className="container mx-auto">
      <Categories />
      <HomeCarousel />
      <div className="mt-3 h-50 bg-white p-2 ">
        <div className="flex justify-between items-center py-4">
          <span>Best of Electronics</span>
          <Link
            to="all-products"
            className="bg-blue-700 text-white w-6 h-6 flex justify-center items-center rounded-full"
          >
            <MdOutlineNavigateNext />
          </Link>
        </div>
        <div className="flex justify-start items-center gap-x-3">
          <Link
            to="/product-detail/2"
            className="border rounded-sm pt-2 cursor-pointer"
          >
            <div className="h-44 flex flex-col justify-center overflow-hidden ">
              <img
                src="camera.png"
                className="w-[9.5rem]  m-2 hover:scale-105"
                alt=""
              />
            </div>
            <div className="mb-2 text-center mt-2">
              <p className="text-xs text-gray-700">Printer</p>
              <p className="text-xs text-gray-800 font-bold">From $300</p>
            </div>
          </Link>
          <div className="border rounded-sm pt-2 cursor-pointer">
            <div className="h-44 flex flex-col justify-center overflow-hidden ">
              <img
                src="shirt.png"
                className="w-[9.5rem]  m-2 hover:scale-105"
                alt=""
              />
            </div>
            <div className="mb-2 text-center mt-2">
              <p className="text-xs text-gray-700">Printer</p>
              <p className="text-xs text-gray-800 font-bold">From $300</p>
            </div>
          </div>
          <div className="border rounded-sm pt-2 cursor-pointer">
            <div className="h-44 flex flex-col justify-center overflow-hidden ">
              <img
                src="grocery.png"
                className="w-[9.5rem]  m-2 hover:scale-105"
                alt=""
              />
            </div>
            <div className="mb-2 text-center mt-2">
              <p className="text-xs text-gray-700">Printer</p>
              <p className="text-xs text-gray-800 font-bold">From $300</p>
            </div>
          </div>
        </div>
      </div>
      {/* another category */}
      <div className="mt-3 h-50 bg-white p-2 cursor-pointer">
        <div className="flex justify-between items-center py-4">
          <span>Best of Electronics</span>
          <Link
            to="/all-products"
            className="bg-blue-700 text-white w-6 h-6 flex justify-center items-center rounded-full"
          >
            <MdOutlineNavigateNext />
          </Link>
        </div>
        <div className="flex justify-start items-center gap-x-3">
          <div className="border rounded-sm pt-2">
            <div className="h-44 flex flex-col justify-center overflow-hidden ">
              <img
                src="camera.png"
                className="w-[9.5rem]  m-2 hover:scale-105"
                alt=""
              />
            </div>
            <div className="mb-2 text-center mt-2">
              <p className="text-xs text-gray-700">Printer</p>
              <p className="text-xs text-gray-800 font-bold">From $300</p>
            </div>
          </div>
          <div className="border rounded-sm pt-2 cursor-pointer">
            <div className="h-44 flex flex-col justify-center overflow-hidden ">
              <img
                src="shirt.png"
                className="w-[9.5rem]  m-2 hover:scale-105"
                alt=""
              />
            </div>
            <div className="mb-2 text-center mt-2">
              <p className="text-xs text-gray-700">Printer</p>
              <p className="text-xs text-gray-800 font-bold">From $300</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
