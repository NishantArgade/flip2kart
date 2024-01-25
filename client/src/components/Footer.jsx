import React from "react";

const Footer = () => {
  return (
    <div className="h-[16rem] w-full bg-[#212121]">
      <div className="flex justify-between px-12 items-start text-white py-8">
        <div>
          <p className="text-xs text-gray-400 mb-2">ABOUT</p>
          <div className="flex flex-col items-start justify-start">
            <p className="text-[0.68rem] font-bold text-gray-300">Cotact Us</p>
            <p className="text-[0.68rem] font-bold text-gray-300">About Us</p>
            <p className="text-[0.68rem] font-bold text-gray-300">Careers</p>
            <p className="text-[0.68rem] font-bold text-gray-300">
              Flipkart Stories
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-2">HELP</p>
          <div className="flex flex-col items-start justify-start">
            <p className="text-[0.68rem] font-bold text-gray-300">Payment</p>
            <p className="text-[0.68rem] font-bold text-gray-300">Shipping</p>
            <p className="text-[0.68rem] font-bold text-gray-300">
              Cancellation & Returns
            </p>
            <p className="text-[0.68rem] font-bold text-gray-300">FAQ</p>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-2">CONSUMER POLICY</p>
          <div className="flex flex-col items-start justify-start">
            <p className="text-[0.68rem] font-bold text-gray-300">
              {" "}
              Cancellation & Returns
            </p>
            <p className="text-[0.68rem] font-bold text-gray-300">
              Terms of Use
            </p>
            <p className="text-[0.68rem] font-bold text-gray-300">Security</p>
            <p className="text-[0.68rem] font-bold text-gray-300">Privacy</p>
            <p className="text-[0.68rem] font-bold text-gray-300">Sitemap</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-2">SOCIAL</p>
          <div className="flex flex-col items-start justify-start">
            <p className="text-[0.68rem] font-bold text-gray-300">Facebook</p>
            <p className="text-[0.68rem] font-bold text-gray-300">Twitter</p>
            <p className="text-[0.68rem] font-bold text-gray-300">You Tube</p>
            <p className="text-[0.68rem] font-bold text-gray-300">Instagram</p>
          </div>
        </div>

        {/* right section */}
        <div className="flex items-start justify-between border-l-2 border-gray-700 pl-6 gap-x-4">
          <div>
            <p className="text-xs text-gray-400 mb-2 ">Mail Us:</p>
            <div className="flex flex-col items-start justify-start">
              <div className="text-[0.68rem] text-gray-50 w-52">
                Flipkart Internet Private Limited, Buildings Alyssa, Begonia &
                Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahali
                Village, Bangaluru, 560103, Karnataka, India.
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-2">
              Registered Office Address:
            </p>
            <div className="flex flex-col items-start justify-start">
              <div className="text-[0.68rem]  w-52 text-gray-50">
                Flipkart Internet Private Limited, Buildings Alyssa, Begonia &
                Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahali
                Village, Bengaluru, 560103, Karnataka, India CIN:
                U51109KA2012PTC066107 Telephone: 044-45614700.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-2 px-12 border-gray-700 flex py-2 items-center justify-between gap-x-4">
        <span className="text-gray-400 text-xs">2007-2024 Flip2kart.com</span>
        <div className="flex justify-start items-center gap-x-2">
          <img src="paymentGateway/visa.png" className="w-9" alt="" />
          <img src="paymentGateway/mastercard.png" className="w-9" alt="" />
          <span className="bg-white h-5 flex justify-center items-center">
            <img src="paymentGateway/rupay.png" className="w-9" alt="" />
          </span>
          <span className="bg-white h-5 flex justify-center items-center">
            <img src="paymentGateway/paypal.png" className="w-9 " alt="" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
