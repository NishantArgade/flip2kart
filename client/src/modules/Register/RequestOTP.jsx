import React from "react"
import { Link } from "react-router-dom"

const RequestOTP = ({
  email,
  setEmail,
  emailError,
  handleRegister,
  setEmailError,
  registerIsPending,
}) => {
  return (
    <form
      onSubmit={handleRegister}
      className="flex w-full flex-col items-center  justify-between gap-y-6"
    >
      <div className="w-full">
        <input
          className={`${emailError ? "border-red-500 focus:border-red-500" : "focus:border-blue-500 "} w-full  border-b-[1.5px] border-gray-300 py-1 text-sm outline-none  md:text-sm`}
          type="text"
          placeholder={"Enter Email Address"}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setEmailError("")
          }}
        />
        {!!emailError && (
          <p className="pt-1 text-[0.65rem] text-red-500">{emailError}</p>
        )}
      </div>

      <div className="flex w-full flex-col gap-3">
        <div className="mt-5 w-full md:mt-0">
          <p className="mb-3 text-[0.60rem] text-gray-400">
            By continuing, you agree to Flip2kart's{" "}
            <span className="text-blue-500"> Terms of Use </span> and
            <span className="text-blue-500"> Privacy Policy. </span>
          </p>

          <button
            type="submit"
            disabled={registerIsPending}
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
    </form>
  )
}

export default RequestOTP
