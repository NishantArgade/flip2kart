import { PinInput } from "@mantine/core"
import { useState } from "react"
import { Link } from "react-router-dom"
import RequestOTP from "./RequestOTP"
import VerifyOTP from "./VerifyOTP"

const Login = () => {
  const [showReqOtpField, setShowReqOtpField] = useState(true)
  const [email, setEmail] = useState("")
  const [OTP, setOTP] = useState("")

  const handleLogin = () => {
    // after successful login verification redirect user to home page (back page where he was using naviagte(-1))
    // after successful send otp then set:
    setShowReqOtpField(false)
  }

  const handleOTP = () => {
    // 1. check if otp is correct then redirect user to home page (back page where he was using naviagte(-1))
    // 2. else show error message
    console.log(email)
    console.log(OTP)
  }
  return (
    <div className="container mx-auto  grid place-items-center  py-4">
      <div className="flex min-h-[25rem] w-full flex-col  bg-white shadow-md md:w-[40rem] md:flex-row ">
        {/* info */}
        <div className="flex w-full flex-col items-center justify-between bg-[#2874F0] px-4 py-4 md:w-[47rem] md:items-start md:p-6">
          <div className="text-center md:text-start">
            <h1 className="text-2xl font-bold text-white">Login</h1>
            <p className="mt-3 text-sm text-gray-300">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>
          <div className="mt-10 flex w-full items-center justify-center md:mt-1">
            <img
              src="loginSecure.png"
              className="w-30 md:w-78 pb-5"
              alt="loginImg"
            />
          </div>
        </div>
        {/* login */}
        <div className="flex flex-col items-start justify-between px-4 py-4 md:w-[64rem] md:p-6 ">
          {showReqOtpField ? (
            <RequestOTP
              handleLogin={handleLogin}
              email={email}
              setEmail={setEmail}
            />
          ) : (
            <VerifyOTP
              handleOTP={handleOTP}
              setShowReqOtpField={setShowReqOtpField}
              OTP={OTP}
              setOTP={setOTP}
              email={email}
            />
          )}

          <Link
            to="/register"
            className="mt-8 self-center text-xs font-bold text-blue-500 md:mt-4"
          >
            New to Flipkart? Create an account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
