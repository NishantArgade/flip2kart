import { PinInput, TextInput } from "@mantine/core";
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
    <div className=" grid py-4  place-items-center">
      <div className="w-[44rem] h-[30rem] bg-white flex ">
        {/* info */}
        <div className="flex flex-col justify-between items-start w-[36rem] bg-[#2874F0] py-8 px-6">
          <div>
            <h1 className="text-white font-bold text-2xl">Login</h1>
            <p className="text-gray-300 text-sm mt-3">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>
          <img src="loginSecure.png" alt="loginImg" />
        </div>
        {/* login */}
        <div className="flex flex-col justify-between items-start py-8 px-6 w-[64rem] ">
          {!showOtpField ? (
            <div className="flex flex-col justify-start items-start gap-y-7 w-full">
              <TextInput
                variant="unstyled"
                className="w-full outline-none border-b-[1.8px] border-gray-300 px-2 focus:border-blue-500"
                type="text"
                placeholder={"Enter Email/Mobile number"}
              />

              <div className="w-full">
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
            <div className="flex flex-col justify-start items-center gap-y-7 w-full">
              <div className="text-center">
                Please enter the OTP sent to <br /> 8007896396{" "}
                <button
                  className="text-blue-500 font-semibold text-sm"
                  onClick={() => setShowOtpField(false)}
                >
                  Change
                </button>
              </div>
              <PinInput size="sm" length={6} placeholder="-" />

              <div className="w-full">
                <button
                  onClick={handleOTP}
                  className="bg-[#2874F0] w-full p-3 shadow-md text-xs font-bold text-white rounded-sm"
                >
                  Verify
                </button>
                <p className="text-xs text-gray-400 mt-3 text-center">
                  Not received your code?{" "}
                  <span className="text-[#2874F0] cursor-pointer">
                    Resend code
                  </span>
                </p>
              </div>
            </div>
          )}

          <Link
            to="/register"
            className="self-center text-xs text-[#2874F0] font-bold"
          >
            New to Flipkart? Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
