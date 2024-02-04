import React from "react"

const MobileVerification = ({ handleRegister }) => {
  return (
    <div className="mt-5 flex w-full flex-col  items-center justify-start md:my-auto md:gap-y-7">
      <input
        className="w-full border-b-[1.5px] border-gray-300 px-2 text-sm outline-none focus:border-blue-500 md:text-base"
        type="number"
        placeholder={"Enter Mobile number"}
      />
      <div className="mt-5 w-full md:mt-0">
        <p className="mb-3 text-[0.60rem] text-gray-400">
          By continuing, you agree to Flipkart's Terms of Use and Privacy
          Policy.
        </p>

        <button
          onClick={handleRegister}
          className="w-full rounded-sm bg-[#FB641B] p-3 text-xs font-bold text-white shadow-md"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default MobileVerification
