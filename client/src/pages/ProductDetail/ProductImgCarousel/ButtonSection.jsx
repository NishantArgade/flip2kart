import { BsFillLightningFill } from "react-icons/bs";
import { IoCart } from "react-icons/io5";

const ButtonSection = () => {
  return (
    <div className="flex  p-2 gap-3 lg:flex-row md:flex-col mt-4  flex-col">
      <div className="bg-[#FF9F00] py-3 px-auto w-full text-white flex items-center justify-center gap-x-1  cursor-pointer shadow-md">
        <IoCart className="text-[1.1rem]" />
        <button className="text-xs font-semibold uppercase">Add to Cart</button>
      </div>
      <div className="bg-[#FB641B] py-3 px-auto  w-full text-white flex items-center justify-center gap-x-1 cursor-pointer shadow-md">
        <BsFillLightningFill className="text-[0.9rem]" />
        <button className="text-xs font-semibold uppercase">Buy Now</button>
      </div>
    </div>
  );
};

export default ButtonSection;
