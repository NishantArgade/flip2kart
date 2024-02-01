import { IoMdNotifications } from "react-icons/io";
import { MdStar } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

const LoginInfoStep = ({ nextStep }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-6 gap-y-10  py-2 border-t-[1px]">
      <div>
        <div className="bg-r flex md:flex-row flex-col gap-y-6 items-start justify-center lg:gap-x-20 gap-x-4">
          <div className="flex flex-col justify-start items-start gap-y-2">
            <div className="flex items-center justify-start gap-x-3">
              <p className="text-gray-500">Name</p>
              <p>Nishant Argade</p>
            </div>
            <div className="flex items-center justify-start gap-x-3">
              <p className="text-gray-500">Name</p>
              <p>Nishant Argade</p>
            </div>
            <p className="text-blue-500">
              Lorem ipsum dolor sit amet consectetur.
            </p>
            <button
              onClick={nextStep}
              className="bg-[#FB641B] py-3 lg:px-10 px-4  mt-2 lg:w-64 text-white rounded-sm   cursor-pointer shadow-md"
            >
              Continue Checkout
            </button>
          </div>
          <div className="flex flex-col justify-start items-start gap-y-2">
            <p className="text-xs text-gray-500">
              Lorem ipsum dolor sit amet consectetur.
            </p>
            <div className="flex items-center gap-x-3">
              <TbTruckDelivery className="text-lg  text-blue-500" />
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <div className="flex items-center gap-x-3">
              <IoMdNotifications className="text-lg text-blue-500" />
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <div className="flex items-center gap-x-3">
              <MdStar className="text-lg text-blue-500" />
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
          </div>
        </div>
        <p className="mt-7 text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium,
          error?
        </p>
      </div>
    </div>
  );
};

export default LoginInfoStep;
