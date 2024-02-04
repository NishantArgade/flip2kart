import { BsQuestionSquareFill } from "react-icons/bs"
import { IoMdArrowRoundBack } from "react-icons/io"
import { Link, useParams } from "react-router-dom"

const OrderedProductDetail = () => {
  const { orderId } = useParams()

  return (
    <div className="container mx-auto min-h-screen">
      {/** Go Back Button */}
      <Link
        to="/my-orders"
        className="flex items-center gap-x-2 px-1 py-2 text-gray-500"
      >
        <IoMdArrowRoundBack />
        <p className="text-xs">Back</p>
      </Link>

      {/** Product Order Detail */}
      <div className="flex flex-col items-start justify-start gap-y-2 bg-white p-4 text-xs shadow-md">
        <p className="text-sm">Delivery Address</p>
        <p className="font-semibold">Nishant Argade</p>
        <p className="font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
          quidem. sdfdsf sdfsdf asdfds fds asdf
        </p>
        <span className="flex items-center justify-start gap-2">
          <p className="font-semibold">Phone Number</p>
          <p>8007896396</p>
        </span>
      </div>

      {/** Product Card */}
      <div className="my-4 flex flex-col items-start justify-between gap-x-16 bg-white px-4 py-5 shadow-md  md:flex-row">
        {/** Product Detail */}
        <div className="flex items-start justify-start gap-x-3 ">
          <Link
            to={"/product-detail/1"}
            className="w-20 cursor-pointer px-3 pt-1"
          >
            <img src="/shirt.png" alt="" />
          </Link>

          <div className="w-full text-sm md:w-[32rem] ">
            <Link
              to={"/product-detail/1"}
              className="cursor-pointer text-gray-800 hover:text-blue-500"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Link>
            <p className=" mt-1 text-xs text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
            </p>
            <p className=" mt-2 text-xs text-gray-500">
              <span>Seller: </span>
              <span> Amenora mall</span>
            </p>
            <p className="mb-6 mt-2 text-sm font-semibold text-gray-800 md:mb-0">
              ₹2,000
            </p>
          </div>
        </div>

        {/** Need Help Button  */}
        <Link
          to="/chatboat-support"
          className="flex items-center  justify-center gap-x-2 text-blue-500"
        >
          <BsQuestionSquareFill size={19} />
          <p className="text-sm"> Need Help?</p>
        </Link>
      </div>
    </div>
  )
}

export default OrderedProductDetail
