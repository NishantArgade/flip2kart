import { AiFillSafetyCertificate } from "react-icons/ai";
import PaymentStepper from "../components/PaymentStepper";

const Checkout = () => {
  return (
    <>
      <div className="container mx-auto grid grid-cols-12 gap-x-3 m-2 mb-14 ">
        {/* Payment Step */}
        <div className="col-span-8 bg-white  shadow-md p-4">
          <PaymentStepper />
        </div>

        {/* Amount info */}
        <div className="col-span-4 h-fit text-sm sticky top-[4.7rem] right-0">
          <div className=" bg-white  flex  flex-col pb-2  shadow-md">
            <div>
              <p className="text-gray-500  px-4 py-3 border-b-2 ">
                PRICE DETAILS
              </p>

              <div className="flex flex-col justify-start items-start gap-y-4 p-4  ">
                <div className="flex items-center justify-between w-full">
                  <p>Price (4 items)</p>
                  <p>₹35,000</p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p>Price (4 items)</p>
                  <p>₹35,000</p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p>Price (4 items)</p>
                  <p>₹35,000</p>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start px-4 py-5 border-dashed border-y-2 ">
                <div className="flex items-center justify-between w-full font-semibold">
                  <p>Total Amount</p>
                  <p>₹70,000</p>
                </div>
              </div>
              <p className="p-4 text-green-600 text-xs font-semibold tracking-wide ">
                You will save ₹18,256 on this order
              </p>
            </div>
          </div>

          <div className="flex items-center justify-start gap-x-2 mt-6 text-xs text-gray-500">
            <AiFillSafetyCertificate className="text-2xl" />
            <p className="font-semibold ">
              Safe and Secure Payments.Easy returns.100% Authentic products.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
//

export default Checkout;
