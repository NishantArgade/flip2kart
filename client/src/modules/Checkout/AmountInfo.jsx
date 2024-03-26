import React from "react"
import { AiFillSafetyCertificate } from "react-icons/ai"

const AmountInfo = ({ cartData }) => {
  return (
    <>
      <div className=" flex  flex-col  bg-white pb-2  shadow-md">
        <div>
          <p className="border-b-2  px-4 py-3 text-gray-500 ">PRICE DETAILS</p>

          <div className="flex flex-col items-start justify-start gap-y-4 p-4  ">
            <div className="flex w-full items-center justify-between">
              <p>Price ({cartData?.cart.length} items)</p>
              <p>
                ₹
                {(
                  cartData?.totalPrice - cartData?.totalDiscount
                ).toLocaleString("en-IN")}
              </p>
            </div>

            <div className="flex w-full items-center justify-between">
              <p>Delivery Charges</p>
              <div>
                <span
                  className={`${cartData?.isDeliveryFree ? "line-through" : ""} text-gray-500`}
                >
                  ₹{cartData?.totalDeliveryCharges.toLocaleString("en-IN")}{" "}
                </span>
                {cartData?.isDeliveryFree && (
                  <span className="ml-1 text-green-600">Free</span>
                )}
              </div>
            </div>
            {cartData?.packagingFee !== 0 && (
              <div className="flex w-full items-center justify-between">
                <p>Packaging Charge</p>
                <p>₹{cartData?.packagingFee.toLocaleString("en-IN")}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col items-start justify-start border-y-2 border-dashed px-4 py-5 ">
            <div className="flex w-full items-center justify-between text-[0.95rem] font-medium">
              <p>Total Payable</p>
              <p>₹{cartData?.finalTotalAmount.toLocaleString("en-IN")}</p>
            </div>
          </div>
          <p className="p-4 text-xs font-semibold tracking-wide text-green-600 ">
            Your Total Saving on this order ₹
            {cartData?.totalDiscount.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-start gap-x-2 px-2 text-xs text-gray-500">
        <AiFillSafetyCertificate className="text-2xl" />
        <p className="font-semibold ">
          Safe and Secure Payments. Easy returns.100% Authentic products.
        </p>
      </div>
    </>
  )
}

export default AmountInfo
