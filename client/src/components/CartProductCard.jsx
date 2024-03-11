import { Link } from "react-router-dom"
import DeleteConfirmModal from "./DeleteConfirmModal"

const CartProductCard = ({ product }) => {
  return (
    <div className="flex flex-col items-start justify-start gap-y-2 border-b-[1.5px] bg-white py-4">
      <div className="flex w-full flex-col items-start justify-between px-2 md:flex-row">
        {/* Product Image And Info Block */}
        <div className="flex items-center justify-center gap-x-3">
          <Link
            to={"/product-detail/1"}
            className="h-32 w-32 cursor-pointer p-1 "
          >
            <img
              src={product?.image}
              alt=""
              className="h-full w-full object-contain"
            />
          </Link>
          <div className="text-sm">
            <Link
              to={"/product-detail/1"}
              className="cursor-pointer hover:text-blue-500"
            >
              {product?.name}
            </Link>
            <p className="text-xs text-gray-500">{product?.description}</p>
            <p className="my-3 flex flex-col items-start justify-start gap-x-2  text-xs text-gray-500 md:flex-row md:items-center">
              <p>
                <span>Seller: </span>
                {product?.sellerName}
              </p>
              <img src="/assured.png" className="mt-1 w-12 md:mt-0" alt="" />
            </p>

            <p className="mt-1 text-xs">
              <span className="mr-2 text-[1rem] font-bold">
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
        <div className="ml-4 self-center pl-9 pt-2 text-xs md:ml-0 md:self-start md:p-0 ">
          <p>Dilivery by tomorrow, {product?.deliveryDay}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-start gap-x-6 px-4 text-sm ">
        {/** Qty Inc & Dec Block */}
        <div className="flex items-center justify-start gap-x-2 ">
          <button className="w-6 rounded-full border-2 px-2  shadow-sm">
            -
          </button>
          <input type="text" className="w-10 border-2 px-1 outline-none" />
          <button className="w-6 rounded-full border-2 px-1  shadow-sm">
            +
          </button>
        </div>
        {/** Remove Button */}
        <DeleteConfirmModal>
          <button className="font-medium  hover:text-blue-500">REMOVE</button>
        </DeleteConfirmModal>
      </div>
    </div>
  )
}

export default CartProductCard
