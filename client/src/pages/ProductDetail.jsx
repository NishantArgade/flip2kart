import { BsFillLightningFill } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import { MdLocalOffer } from "react-icons/md";
import { useParams } from "react-router-dom";
import CustomerReview from "../components/CustomerReview";
import ProductHighlight from "../components/ProductHighlight";
import ProductIMGCarousel from "../components/ProductIMGCarousel";
import ProductOffers from "../components/ProductOffers";
import ProductSpecification from "../components/ProductSpecification";
import ProductsCarousel from "../components/ProductsCarousel";

const ProductDetail = () => {
  const { productId } = useParams();
  // console.log(params)

  return (
    <>
      <div className="container mx-auto bg-red-20 w-full  grid grid-cols-12 object-center gap-x-2 m-2 ">
        <div className="col-span-12 md:col-span-4 bg-white md:h-fit pb-4 relative md:sticky md:top-[4.6rem] md:left-0 shadow-md">
          <ProductIMGCarousel />
          <div className="flex  p-2 gap-3 lg:flex-row md:flex-col mt-4  flex-col">
            <div className="bg-[#FF9F00] py-4 px-8 w-full text-white flex items-center justify-center gap-x-1  cursor-pointer shadow-md">
              <IoCart className="text-[1.1rem]" />
              <button className="text-xs font-semibold uppercase">
                Add to Cart
              </button>
            </div>
            <div className="bg-[#FB641B] py-4 px-8  w-full text-white flex items-center justify-center gap-x-1 cursor-pointer shadow-md">
              <BsFillLightningFill className="text-[0.9rem]" />
              <button className="text-xs font-semibold uppercase">
                Buy Now
              </button>
            </div>
          </div>

          <IoMdHeart
            className="absolute top-2 right-2 z-10  text-gray-300 cursor-pointer bg-gray-100 p-1 rounded-full border-e-2 border-gray-200"
            size={35}
          />
        </div>

        <div className="col-span-12 md:col-span-8 bg-white shadow-md p-2 flex flex-col justify-start items-start gap-y-4 ">
          {/* Basic Info */}
          <div className="flex flex-col justify-start items-start gap-y-2  pt-10 md:pt-0">
            <p className="text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
            <p className="text-xs text-gray-800">
              Description Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Debitis exercitationem iure excepturi sed. Obcaecati sit
              repellat magnam rem iure provident doloribus, aliquid iusto
              temporibus placeat nostrum adipisci. Totam, numquam fugit?
            </p>
            <p className="text-xs text-gray-700">
              <span className="bg-green-600 px-1 py-[2px] rounded-sm mr-2 text-white">
                4.5★
              </span>
              8 Ratings & 1 Reviews
            </p>
            <p className="text-xs mt-3">
              <span className="text-[1.30rem] mr-2 font-bold">₹1,500</span>
              <strike className="mr-2 text-gray-700">₹2300</strike>
              <span className="text-green-600 font-semibold">24% off</span>
            </p>
          </div>

          {/*  Offers */}
          <ProductOffers />

          {/* Products Highlights */}
          <ProductHighlight />

          {/* Product Specifications*/}
          <ProductSpecification />

          {/* Customer Reviews */}
          <CustomerReview />
        </div>
      </div>

      <ProductsCarousel title="Suggested for you" />
    </>
  );
};

export default ProductDetail;
