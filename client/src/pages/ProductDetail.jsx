import { Link, useParams } from "react-router-dom";
import ProductDetailCarousel from "../components/ProductDetailCarousel";
import RecommandedProducts from "../components/RecommandedProducts";

const ProductDetail = () => {
  const { productId } = useParams();
  // console.log(params)

  return (
    <>
      <div className="container mx-auto bg-red-20 h-auto w-full  grid grid-cols-12 object-center gap-x-2 m-2">
        <div className="col-span-4 bg-white h-[35rem] ">
          <ProductDetailCarousel />
          <div className="flex justify-center items-center gap-x-4 mt-3">
            <button>Add to Cart</button>
            <button>Add to Cart</button>
          </div>
        </div>

        <div className="col-span-8 bg-white h-full p-2 flex flex-col justify-start items-start gap-y-4">
          {/* Basic Info */}
          <div className="flex flex-col justify-start items-start gap-y-2">
            <p className="text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
            <p className="text-xs text-gray-700">
              Description Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Debitis exercitationem iure excepturi sed. Obcaecati sit
              repellat magnam rem iure provident doloribus, aliquid iusto
              temporibus placeat nostrum adipisci. Totam, numquam fugit?
            </p>
            <p className="text-xs text-gray-700">
              <span className="bg-green-600 px-2 py-[2px] rounded-sm mr-2 text-white">
                4.5★
              </span>
              8 Ratings & 1 Reviews
            </p>
            <p className="text-xs mt-3 text-gray-700">
              <span className="text-[1.30rem] mr-2 font-bold">$1,500</span>
              $2300 24% off
            </p>
          </div>
          {/*  Offers */}
          <div className="flex flex-col justify-start gap-y-1 mb-2">
            <p className="text-xs text-gray-950 ">Available Offers</p>
            <div className="text-xs text-gray-700">
              <span className="mr-2">icon</span>
              <span>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Consequatur quod ab doloribus obcaecati, nesciunt eaque et ullam
                enim.
              </span>
            </div>
            <div className="text-xs text-gray-700">
              <span className="mr-2">icon</span>
              <span>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Consequatur quod ab doloribus obcaecati, nesciunt eaque et ullam
                enim.
              </span>
            </div>
            <div className="text-xs text-gray-700">
              <span className="mr-2">icon</span>
              <span>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Consequatur quod ab doloribus obcaecati, nesciunt eaque et ullam
                enim.
              </span>
            </div>
          </div>

          {/* Products Highlights */}
          <div className="text-xs flex flex-col justify-start items-start gap-y-4">
            <div className="flex gap-x-2 items-start ">
              <p className="w-16 text-gray-500">Highlights</p>
              <div>
                <p>Lorem, ipsum dolor.</p>
                <p>Lorem, ipsum dolor.</p>
                <p>Lorem, ipsum dolor.</p>
                <p>Lorem, ipsum dolor.</p>
              </div>
            </div>
            <div className="flex gap-x-2 items-start ">
              <p className="w-16 text-gray-500">Seller</p>
              <div>
                <p>FlipMore</p>
                <p>Lorem, ipsum dolor.</p>
              </div>
            </div>
            <div className="flex gap-x-2 items-start ">
              <p className="w-16 text-gray-500">Service</p>
              <p>Cash on Delivery available</p>
            </div>
            <div className="flex gap-x-2 items-start ">
              <p className="w-16 text-gray-500">Wrantty</p>
              <p>1 year wrantty</p>
            </div>
          </div>

          {/* Product Details */}
          <div className="text-xs flex flex-col justify-start items-start gap-y-4 mt-2">
            <p>Product Details:</p>
            <div className="flex gap-x-2 items-start ">
              <p className="w-16 text-gray-700">Highlights</p>
              <p>
                Lorem, ipsum dolor. Lorem ipsum dolor sit amet, consectetur
                adipisicing.
              </p>
            </div>
            <div className="flex gap-x-2 items-start ">
              <p className="w-16 text-gray-700">Seller</p>
              <p>
                FlipMore Lorem ipsum, dolor sit amet consectetur adipisicing
                adipisicing.
              </p>
            </div>
            <div className="flex gap-x-2 items-start ">
              <p className="w-16 text-gray-700">Service</p>
              <p>
                Cash on Delivery available Lorem ipsum dolor sit amet
                consectetur.{" "}
              </p>
            </div>
            <div className="flex gap-x-2 items-start ">
              <p className="w-16 text-gray-700">Wrantty</p>
              <p>1 year wrantty Lorem, ipsum.</p>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="flex flex-col justify-start items-start gap-y-3">
            <p className="text-xs ">Customer Reviews:</p>
            <div className="flex flex-col justify-start items-start gap-y-3 ">
              <div className="flex justify-start items-center gap-3 w-40 bg-black h-16 p-2">
                <img className="w-10" src="/camera.png" alt="" />
                <img className="w-10" src="/book.png" alt="" />
                <img className="w-10" src="/shirt.png" alt="" />
              </div>
              <div>
                <p className="text-xs">Nishant Argade</p>
                <p className="text-xs text-orange-600">★★★★★</p>
                <p className="text-xs text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat cupiditate commodi excepturi adipisci cum similique
                  fuga consequatur possimus repudiandae ipsum.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-y-3  ">
              <div className="flex justify-start items-center gap-3 w-40 bg-black h-16 p-2">
                <img className="w-10" src="/camera.png" alt="" />
                <img className="w-10" src="/book.png" alt="" />
                <img className="w-10" src="/shirt.png" alt="" />
              </div>
              <div>
                <p className="text-xs">Aniket Argade</p>
                <p className="text-xs text-orange-600">★★★★★</p>
                <p className="text-xs text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat cupiditate commodi excepturi adipisci cum similique
                  fuga consequatur possimus repudiandae ipsum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RecommandedProducts />
      <RecommandedProducts />
    </>
  );
};

export default ProductDetail;
