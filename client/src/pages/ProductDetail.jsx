import { BsFillLightningFill } from "react-icons/bs";
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
        <div className="col-span-4 bg-white h-[35rem] sticky top-16 left-0 ">
          <ProductIMGCarousel />
          <div className="flex justify-end items-center gap-x-2 mt-3">
            <div className="bg-[#FF9F00] py-4 px-7 text-white flex items-center justify-center gap-x-1 w-40 cursor-pointer shadow-md">
              <IoCart className="text-[1.1rem]" />
              <button className="text-xs font-semibold uppercase">
                Add to Cart
              </button>
            </div>
            <div className="bg-[#FB641B] py-4 px-7 text-white flex items-center justify-center gap-x-1 w-40 cursor-pointer shadow-md">
              <BsFillLightningFill className="text-[0.9rem]" />
              <button className="text-xs font-semibold uppercase">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-8 bg-white  p-2 flex flex-col justify-start items-start gap-y-4 ">
          {/* Basic Info */}
          <div className="flex flex-col justify-start items-start gap-y-2">
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

      <ProductsCarousel title="Suggested for you"  />
    </>
  );
};

export default ProductDetail;
