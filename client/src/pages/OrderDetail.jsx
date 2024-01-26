import React from "react";
import { BsQuestionSquareFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";

const OrderDetail = () => {
  const { orderId } = useParams();

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-start items-start gap-y-2 text-xs p-4 bg-white shadow-md">
        <p className="text-sm">Delivery Address</p>
        <p className="font-semibold">Nishant Argade</p>
        <p className="font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
          quidem. sdfdsf sdfsdf asdfds fds asdf
        </p>
        <span className="flex gap-2 items-center justify-start">
          <p className="font-semibold">Phone Number</p>
          <p>8007896396</p>
        </span>
      </div>
      <div
        // to={`/order-detail/${i}`}
        // key={i}
        className="bg-white my-4 shadow-md flex justify-between items-start px-4 gap-x-16  py-5"
      >
        <div className="flex justify-start items-start gap-x-3 ">
          <Link
            to={"/product-detail/1"}
            className="px-3 pt-1 w-20 cursor-pointer"
          >
            <img src="/shirt.png" alt="" />
          </Link>

          <div className="text-sm w-[32rem]">
            <Link
              to={"/product-detail/1"}
              className="cursor-pointer text-gray-800 hover:text-blue-500"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Link>
            <p className=" text-xs text-gray-500 mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
            </p>
            <p className=" text-xs text-gray-500 mt-2">
              <span>Seller: </span>
              <span> Amenora mall</span>
            </p>
            <p className="font-semibold text-sm text-gray-800 mt-2">₹2,000</p>
          </div>
        </div>
        <div className="text-sm  text-center">₹2,000</div>
        <div>
          <Link
            to="/chatboat-support"
            className="flex justify-center  items-center gap-x-2 text-blue-500"
          >
            <BsQuestionSquareFill size={19} />
            <p className="text-sm"> Need Help?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
