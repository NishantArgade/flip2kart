import { useState } from "react"
import RequestOTP from "./RequestOTP"
import { useLocation, useNavigate } from "react-router-dom"
import VerifyOTP from "./VerifyOTP"
import { isValidEmail } from "../../utils/helper"
import { toast } from "../../utils/toast"
import { login, register, verifyOTP } from "../../api/userApi"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../../main"

const Register = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [showReqOtpField, setShowReqOtpField] = useState(true)
  const [OTP, setOTP] = useState("")
  const [email, setEmail] = useState(location.state?.email || "")
  const [emailError, setEmailError] = useState("")

  const { isPending: registerIsPending, mutate: registerMutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: async () => await register(email),
    onSuccess: () => {
      setShowReqOtpField(false)
      toast.success(`Verification code sent to ${email}`)
    },
    onError: (error) => {
      if (error.response.status === 400) {
        navigate("/login", { state: { email } })
        toast.info(error.response.data.message)
      } else {
        toast.error(error.response.data.message)
      }
    },
  })

  const { mutate: sendOTPMutate } = useMutation({
    mutationKey: ["sendOTP"],
    mutationFn: async () => await login(email),
    onSuccess: () => {
      toast.success(`Verification code sent to ${email}`)
    },
    onError: (error) => {
      if (error.response.status === 404) {
        navigate("/register", { state: { email } })
        toast.info(error.response.data.message)
      } else {
        toast.error(error.response.data.message)
      }
    },
  })

  const { mutate: verifyOTPMutate, isPending: verifyOTPIsPending } =
    useMutation({
      mutationKey: ["verifyOTP"],
      mutationFn: async () => await verifyOTP(email, OTP),
      onSuccess: () => {
        queryClient.invalidateQueries("checkAuth")

        navigate("/")

        setEmail("")
        setOTP("")
      },
      onError: (error) => {
        toast.error(error.response.data.message)
      },
    })

  const handleVerifyOTP = async () => {
    if (OTP.length !== 6) {
      return toast.error("OTP should be 6 digits long.")
    }

    verifyOTPMutate()
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!isValidEmail(email))
      return setEmailError("Please enter a valid Email ID")

    registerMutate()
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
              email={email}
              setEmail={setEmail}
              emailError={emailError}
              handleRegister={handleRegister}
              setEmailError={setEmailError}
              registerIsPending={registerIsPending}
            />
          ) : (
            <VerifyOTP
              OTP={OTP}
              setOTP={setOTP}
              email={email}
              setShowReqOtpField={setShowReqOtpField}
              sendOTPMutate={sendOTPMutate}
              handleVerifyOTP={handleVerifyOTP}
              verifyOTPIsPending={verifyOTPIsPending}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Register
