import { useState } from "react"
import RequestOTP from "./RequestOTP"
import { Link } from "react-router-dom"
import VerifyOTP from "./VerifyOTP"

const Register = () => {
  const [showReqOtpField, setShowReqOtpField] = useState(true)
  const [OTP, setOTP] = useState("")
  const [email, setEmail] = useState("")

  const handleRegister = () => {
    // 1. check if mobile number already exists if so then navigate to login page
    // 2. else send otp to user mobile then verify otp after succesfull verification of otp then navigate to registeration page  set setShowRegistrationForm(true)
    // 3. after successful registeration redirect user to home page (back page where he was using naviagte(-1))
    setShowReqOtpField(false)
  }

  return (
    <div className="container mx-auto  grid place-items-center  py-4">
      <div className="flex min-h-[25rem] w-full flex-col  bg-white shadow-md md:w-[40rem] md:flex-row ">
        {/* info */}
        <div className="flex w-full flex-col items-center justify-between bg-[#2874F0] px-4 py-4 md:w-[47rem] md:items-start md:p-6">
          <div className="text-center md:text-start">
            <h1 className="text-2xl font-bold text-white">
              Looks like you're new here!
            </h1>
            <p className="mt-3 text-sm text-gray-300">
              Sign up with your mobile number to get started
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
              handleRegister={handleRegister}
              email={email}
              setEmail={setEmail}
            />
          ) : (
            <VerifyOTP
              OTP={OTP}
              setOTP={setOTP}
              handleRegister={handleRegister}
              setShowReqOtpField={setShowReqOtpField}
              email={email}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Register
