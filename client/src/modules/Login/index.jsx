import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import RequestOTP from "./RequestOTP"
import VerifyOTP from "./VerifyOTP"
import { login, verifyOTP } from "../../api/userApi"
import { isValidEmail } from "../../utils/helper"
import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { toast } from "../../utils/toast"
import { queryClient } from "../../main"

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [showReqOtpField, setShowReqOtpField] = useState(true)
  const [email, setEmail] = useState(location.state?.email || "")
  const [OTP, setOTP] = useState("")
  const [emailError, setEmailError] = useState("")

  const dispatch = useDispatch()

  const { isPending: sendOTPIsPending, mutate: sendOTPMutate } = useMutation({
    mutationKey: ["sendOTP"],
    mutationFn: async () => await login(email),
    onSuccess: () => {
      setShowReqOtpField(false)
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

        navigate(-1)

        setEmail("")
        setOTP("")
      },
      onError: (error) => {
        toast.error(error.response.data.message)
      },
    })

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!isValidEmail(email))
      return setEmailError("Please enter a valid Email ID")

    sendOTPMutate()
  }

  const handleVerifyOTP = async () => {
    if (OTP.length !== 6) {
      return toast.error("OTP should be 6 digits long.")
    }

    verifyOTPMutate()
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
              emailError={emailError}
              setEmailError={setEmailError}
              sendOTPIsPending={sendOTPIsPending}
            />
          ) : (
            <VerifyOTP
              handleVerifyOTP={handleVerifyOTP}
              setShowReqOtpField={setShowReqOtpField}
              setOTP={setOTP}
              OTP={OTP}
              email={email}
              sendOTPMutate={sendOTPMutate}
              verifyOTPIsPending={verifyOTPIsPending}
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
