import { IoMdHeart } from "react-icons/io"
import ButtonSection from "./ButtonSection"
import LargeDeviceIMGCarousel from "./LargeDeviceIMGCarousel"
import SmallDeviceIMGCarousel from "./SmallDeviceIMGCarousel"

const ProductImgCarousel = () => {
  return (
    <div className="relative z-0">
      <LargeDeviceIMGCarousel />
      <SmallDeviceIMGCarousel />
      <ButtonSection />
      <IoMdHeart
        className="absolute right-2 top-2 z-10  cursor-pointer rounded-full border-e-2 border-gray-200 bg-gray-100 p-1 text-gray-300"
        size={35}
      />
    </div>
  )
}

export default ProductImgCarousel
