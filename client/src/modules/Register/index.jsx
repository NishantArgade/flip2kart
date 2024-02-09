import { useState } from "react"

import { Link } from "react-router-dom"
import MobileVerification from "./MobileVerification"
import Registration from "./Registration"

const Register = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)

  const handleRegister = () => {
    // 1. check if mobile number already exists if so then navigate to login page
    // 2. else send otp to user mobile then verify otp after succesfull verification of otp then navigate to registeration page  set setShowRegistrationForm(true)
    // 3. after successful registeration redirect user to home page (back page where he was using naviagte(-1))
    setShowRegistrationForm(true)
  }

  return (
    <div className="container mx-auto  grid place-items-center  py-4">
      <div className="flex min-h-[33rem] w-full flex-col  bg-white shadow-md md:w-[37rem] md:flex-row ">
        {/* info */}
        <div className="flex w-full flex-col items-center justify-between bg-[#2874F0] p-6 md:w-[36rem] md:items-start">
          <div className="text-center md:text-start">
            <h1 className="text-2xl font-bold text-white">
              Looks like you're new here!
            </h1>
            <p className="mt-3 text-sm text-gray-300">
              Sign up with your mobile number to get started
            </p>
          </div>
          <img src="loginSecure.png" className="w-32 md:w-80" alt="loginImg" />
        </div>

        {/* login */}
        <div className="flex flex-col items-start justify-between p-6 md:w-[64rem] ">
          {showRegistrationForm ? (
            <Registration />
          ) : (
            <MobileVerification handleRegister={handleRegister} />
          )}

          <Link
            to="/login"
            className="mt-8 self-center text-xs font-bold text-blue-500 md:mt-4"
          >
            Existing User? Log in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
