import { PinInput } from "@mantine/core"
import React from "react"

const VerifyOTP = ({ handleOTP, setShowReqOtpField }) => {
  return (
    <div className="my-auto flex w-full flex-col items-center justify-start gap-y-7">
      <div className="text-center text-sm md:text-base">
        Please enter the OTP sent to <br /> 8007896396{" "}
        <button
          className="text-sm font-semibold text-blue-500"
          onClick={() => setShowReqOtpField(true)}
        >
          Change
        </button>
      </div>
      <PinInput size="xs" length={6} placeholder="-" />

      <div className="w-full">
        <button
          onClick={handleOTP}
          className="w-full rounded-sm bg-[#2874F0] p-3 text-xs font-bold text-white shadow-md"
        >
          Verify
        </button>
        <p className="mt-3 text-center text-xs text-gray-400">
          Not received your code?{" "}
          <span className="cursor-pointer text-blue-500">Resend code</span>
        </p>
      </div>
    </div>
  )
}

export default VerifyOTP
