import React from "react"
import { AiFillSafetyCertificate } from "react-icons/ai"

const AmountInfo = () => {
  return (
    <>
      <div className=" flex  flex-col  bg-white pb-2  shadow-md">
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
      </div>

      <div className="mt-6 flex items-center justify-start gap-x-2 px-2 text-xs text-gray-500">
        <AiFillSafetyCertificate className="text-2xl" />
        <p className="font-semibold ">
          Safe and Secure Payments.Easy returns.100% Authentic products.
        </p>
      </div>
    </>
  )
}

export default AmountInfo
