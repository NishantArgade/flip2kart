import React from "react";

const Categories = () => {
  return (
    <div className="bg-white">
      <div className="px-40 ">
        <div className="flex justify-between items-center pb-3">
          {[1, 2, 3, 4, 5, 6, 7].map((value, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center "
            >
              <div className="h-16 flex flex-col justify-center items-center ">
                <img className="w-12" src="mobiles.png" alt="" />
              </div>
              <p className="text-xs">Mobiles </p>
            </div>
          ))}
          <div className="flex flex-col justify-center items-center ">
            <div className="h-16 flex flex-col justify-center items-center ">
              <img className="w-12" src="camera.png" alt="" />
            </div>
            <p className="text-xs">Mobiles </p>
          </div>
          <div className="flex flex-col justify-center items-center ">
            <div className="h-16 flex flex-col justify-center items-center ">
              <img className="w-12" src="camera.png" alt="" />
            </div>
            <p className="text-xs">Mobiles </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
