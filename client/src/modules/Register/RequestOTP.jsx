import React from "react"
import { Link } from "react-router-dom"

const RequestOTP = ({ handleRegister, email, setEmail }) => {
  return (
    <div className="flex w-full flex-col items-center  justify-between gap-y-6">
      <input
        className="w-full border-b-[1.5px] border-gray-300 py-1 text-sm outline-none focus:border-blue-500  md:text-sm"
        type="text"
        placeholder={"Enter Email Address"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="flex w-full flex-col gap-3">
        <div className="mt-5 w-full md:mt-0">
          <p className="mb-3 text-[0.60rem] text-gray-400">
            By continuing, you agree to Flipkart's{" "}
            <span className="text-blue-500"> Terms of Use </span> and
            <span className="text-blue-500"> Privacy Policy. </span>
          </p>

          <button
            onClick={handleRegister}
            className="w-full rounded-sm bg-[#FB641B] p-3 text-xs font-bold text-white shadow-md"
          >
            Request OTP
          </button>
        </div>
        <Link
          to="/login"
          className="w-full self-center p-3 text-center text-xs font-bold text-blue-500  shadow-md "
        >
          Existing User? Log in
        </Link>
      </div>
    </div>
  )
}

export default RequestOTP
