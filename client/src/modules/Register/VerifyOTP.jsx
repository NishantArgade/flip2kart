import { PinInput } from "@mantine/core"
import React, { useEffect, useState } from "react"

const VerifyOTP = ({
  OTP,
  setOTP,
  email,
  setShowReqOtpField,
  sendOTPMutate,
  handleVerifyOTP,
  verifyOTPIsPending,
}) => {
  const [count, setCount] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval = null
    if (isActive && count > 0) {
      interval = setInterval(() => {
        setCount((count) => count - 1)
      }, 1000)
    } else if (!isActive && count !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, count])

  function handleResendOTP() {
    sendOTPMutate()
    setOTP("")
    setIsActive(true)
    setCount(15)
  }

  function handleOptChange() {
    setOTP("")
    setShowReqOtpField(true)
  }

  return (
    <div className="flex w-full flex-col items-center justify-start gap-y-7">
      <div className="text-center text-sm md:text-base">
        Please enter the OTP sent to <br /> {email}{" "}
        <button
          className="text-sm font-semibold text-blue-500"
          onClick={handleOptChange}
        >
          Change
        </button>
      </div>
      <PinInput
        size="xs"
        length={6}
        placeholder="-"
        inputMode="numeric"
        value={OTP}
        onChange={(value) => setOTP(value)}
        onComplete={(value) => setOTP(value)}
      />

      <div className="w-full">
        <button
          onClick={handleVerifyOTP}
          disabled={verifyOTPIsPending}
          className="w-full rounded-sm bg-[#2874F0] p-3 text-xs font-bold text-white shadow-md"
        >
          Verify
        </button>
        <p className="mt-3 text-center text-xs text-gray-400">
          Not received your code?{" "}
          {isActive && count > 0 ? (
            <span>00:{String(count).padStart(2, "0")}</span>
          ) : (
            <button
              onClick={handleResendOTP}
              className="cursor-pointer text-blue-500"
            >
              Resend code
            </button>
          )}
        </p>
      </div>
    </div>
  )
}

export default VerifyOTP
