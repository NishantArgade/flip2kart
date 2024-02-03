import { IoMdHeart } from "react-icons/io";
import ButtonSection from "./ButtonSection";
import LargeDeviceIMGCarousel from "./LargeDeviceIMGCarousel";
import SmallDeviceIMGCarousel from "./SmallDeviceIMGCarousel";

const ImageCarousel = () => {
  return (
    <div className="relative">
      <LargeDeviceIMGCarousel />
      <SmallDeviceIMGCarousel />
      <ButtonSection />
      <IoMdHeart
        className="absolute top-2 right-2 z-10  text-gray-300 cursor-pointer bg-gray-100 p-1 rounded-full border-e-2 border-gray-200"
        size={35}
      />
    </div>
  );
};

export default ImageCarousel;
