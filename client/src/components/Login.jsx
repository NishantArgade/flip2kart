import { PinInput } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showOtpField, setShowOtpField] = useState(false);

  const handleLogin = () => {
    // after successful login verification redirect user to home page (back page where he was using naviagte(-1))
    // after successful send otp then set:
    setShowOtpField(true);
  };

  const handleOTP = () => {
    // 1. check if otp is correct then redirect user to home page (back page where he was using naviagte(-1))
    // 2. else show error message
  };
  return (
    <div className="container mx-auto  grid py-4  place-items-center">
      <div className="w-full md:w-[37rem] min-h-[33rem] bg-white  shadow-md flex flex-col md:flex-row ">
        {/* info */}
        <div className="flex flex-col justify-between items-center md:items-start w-full md:w-[36rem] md:p-6 px-4 py-4 bg-[#2874F0]">
          <div className="text-center md:text-start">
            <h1 className="text-white font-bold text-2xl">Login</h1>
            <p className="text-gray-300 text-sm mt-3">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>
          <img src="loginSecure.png" className="w-32 md:w-80" alt="loginImg" />
        </div>
        {/* login */}
        <div className="flex flex-col justify-between items-start md:p-6 px-4 py-4 md:w-[64rem] ">
          {!showOtpField ? (
            <div className="flex flex-col justify-start items-center  md:gap-y-7 w-full mt-5 md:my-auto px-2 pt-2">
              <input
                className="w-full text-sm md:text-base outline-none border-b-[1.5px] border-gray-300 mx-2  focus:border-blue-500"
                type="text"
                placeholder={"Enter Email/Mobile number"}
              />

              <div className="w-full mt-5 md:mt-0">
                <p className="text-[0.60rem] text-gray-400 mb-3">
                  By continuing, you agree to Flipkart's Terms of Use and
                  Privacy Policy.
                </p>

                <button
                  onClick={handleLogin}
                  className="bg-[#FB641B] w-full p-3 shadow-md text-xs font-bold text-white rounded-sm"
                >
                  Request OTP
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-start items-center my-auto gap-y-7 w-full">
              <div className="text-center text-sm md:text-base">
                Please enter the OTP sent to <br /> 8007896396{" "}
                <button
                  className="text-blue-500 font-semibold text-sm"
                  onClick={() => setShowOtpField(false)}
                >
                  Change
                </button>
              </div>
              <PinInput size="xs" length={6} placeholder="-" />

              <div className="w-full">
                <button
                  onClick={handleOTP}
                  className="bg-[#2874F0] w-full p-3 shadow-md text-xs font-bold text-white rounded-sm"
                >
                  Verify
                </button>
                <p className="text-xs text-gray-400 mt-3 text-center">
                  Not received your code?{" "}
                  <span className="text-blue-500 cursor-pointer">
                    Resend code
                  </span>
                </p>
              </div>
            </div>
          )}

          <Link
            to="/register"
            className="self-center text-xs text-blue-500 font-bold mt-8 md:mt-4"
          >
            New to Flipkart? Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
