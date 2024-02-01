import { Link } from "react-router-dom";
import DeleteConfirmModal from "./modals/DeleteConfirmModal";

const AddToCartProductCard = ({ product }) => {
  return (
    <div className="bg-white flex flex-col justify-start items-start gap-y-2 py-4 border-b-[1.5px]">
      <div className="flex md:flex-row flex-col justify-between items-start px-2 w-full">
        {/* Product Image And Info Block */}
        <div className="flex justify-start items-start gap-x-2">
          <Link to={"/product-detail/1"} className="p-2 w-32 cursor-pointer ">
            <img src={product?.image} alt="" />
          </Link>
          <div className="text-sm">
            <Link
              to={"/product-detail/1"}
              className="cursor-pointer hover:text-blue-500"
            >
              {product?.name}
            </Link>
            <p className="text-xs text-gray-500">{product?.description}</p>
            <p className="text-xs text-gray-500 my-3 flex flex-col md:flex-row  items-start md:items-center justify-start gap-x-2">
              <p>
                <span>Seller: </span>
                {product?.sellerName}
              </p>
              <img src="/assured.png" className="w-12 mt-1 md:mt-0" alt="" />
            </p>

            <p className="text-xs mt-1">
              <span className="text-[1rem] mr-2 font-bold">
                ₹{product?.price}
              </span>
              <strike className="mr-2 text-gray-700">
                ₹{product?.oldPice}
              </strike>
              <span className="text-green-600 ">{product?.discount}% off</span>
            </p>
          </div>
        </div>

        {/* Delivery By Text Block*/}
        <div className="text-xs self-center md:self-start pl-9 pt-2 ml-4 md:ml-0 md:p-0 ">
          <p>Dilivery by tomorrow, {product?.deliveryDay}</p>
        </div>
      </div>

      <div className="px-4 flex items-center justify-start gap-x-6 text-sm mt-4 ">
        {/** Qty Inc & Dec Block */}
        <div className="flex items-center justify-start gap-x-2 ">
          <button className="border-2 w-6 px-2 rounded-full  shadow-sm">
            -
          </button>
          <input type="text" className="w-10 border-2 outline-none px-1" />
          <button className="border-2 w-6 px-1 rounded-full  shadow-sm">
            +
          </button>
        </div>
        {/** Remove Button */}
        <DeleteConfirmModal>
          <button className="font-medium  hover:text-blue-500">REMOVE</button>
        </DeleteConfirmModal>
      </div>
    </div>
  );
};

export default AddToCartProductCard;
