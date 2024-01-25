import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="h-96 grid place-content-center">
      <div className="flex flex-col justify-center items-center">
        <img src="/notFound.png" alt="" />
        <p className="text-gray-900 text-sm my-4">
          Unfortunately the page you are looking for has been moved or deleted
        </p>
        <Link
          to="/"
          className="text-sm bg-[#2874F0] rounded-sm py-2 px-4 text-white shadow-lg"
        >
          GO TO HOMEPAGE
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
