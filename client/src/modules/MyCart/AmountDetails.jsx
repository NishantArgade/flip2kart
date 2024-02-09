import { AiFillSafetyCertificate } from "react-icons/ai"
import { Link } from "react-router-dom"

const AmountDetails = () => {
  return (
    <div className="">
      <div className="flex  flex-col  bg-white  pb-2 shadow-md">
        <div>
          <p className="border-b-2  px-4 py-3 text-gray-500 ">PRICE DETAILS</p>

          <div className="flex flex-col items-start justify-start gap-y-4 p-4  ">
            <div className="flex w-full items-center justify-between">
              <p>Price (4 items)</p>
              <p>₹35,000</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p>Price (4 items)</p>
              <p>₹35,000</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p>Price (4 items)</p>
              <p>₹35,000</p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start border-y-2 border-dashed px-4 py-5 ">
            <div className="flex w-full items-center justify-between font-semibold">
              <p>Total Amount</p>
              <p>₹70,000</p>
            </div>
          </div>
          <p className="p-4 text-xs font-semibold tracking-wide text-green-600 ">
            You will save ₹18,256 on this order
          </p>
        </div>

        <Link
          to="/checkout"
          className="mx-4 mt-2 w-fit cursor-pointer self-end bg-[#FB641B] px-10 py-3 text-white shadow-md md:px-6   md:text-sm  lg:px-12 lg:text-base"
        >
          <button className="text-xs font-semibold uppercase">
            PLACE ORDER
          </button>
        </Link>
      </div>

      <div className="mt-4 flex items-center justify-start gap-x-2 px-2 text-xs text-gray-500">
        <AiFillSafetyCertificate className="text-2xl" />
        <p className="font-semibold ">
          Safe and Secure Payments.Easy returns.100% Authentic products.
        </p>
      </div>
    </div>
  )
}

export default AmountDetails
