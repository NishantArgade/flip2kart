import { IoMdNotifications } from "react-icons/io"
import { MdStar } from "react-icons/md"
import { TbTruckDelivery } from "react-icons/tb"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { queryClient } from "../../../main"
import { resetUserData } from "../../../slices/userSlice"
import { persistor } from "../../../store"
import { toast } from "../../../utils/toast"
import { logout } from "../../../api/userApi"

const LoginInfoStep = ({ nextStep, user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await logout()

      queryClient.invalidateQueries("checkAuth")
      dispatch(resetUserData())
      persistor.purge()
      navigate("/")

      toast.success(response.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  function handleContinue() {
    nextStep()
  }
  return (
    <div className="flex flex-col items-center justify-center gap-y-10 border-t-[1px]  py-2 pt-6">
      <div>
        <div className="bg-r flex flex-col items-start justify-center gap-x-4 gap-y-6 md:flex-row lg:gap-x-20">
          <div className="flex flex-col items-start justify-start gap-y-2">
            {true && (
              <div className="flex items-center justify-start gap-x-3">
                <p className="text-gray-500">Name</p>
                <p>
                  {user?.first_name} {user?.last_name}
                </p>
              </div>
            )}
            <div className="flex items-center justify-start gap-x-3">
              <p className="text-gray-500">Email</p>
              <p>{user?.email}</p>
            </div>
            <button onClick={handleLogout} className="text-blue-500">
              Logout & Sign in to another account
            </button>
            <button
              onClick={handleContinue}
              className="mt-2 cursor-pointer rounded-sm bg-[#FB641B]  px-4 py-3 text-white shadow-md   lg:w-64 lg:px-10"
            >
              Continue Checkout
            </button>
          </div>
          <div className="flex flex-col items-start justify-start gap-y-2">
            <p className="text-xs text-gray-500">
              Advantages of our secure login
            </p>
            <div className="flex items-center gap-x-3">
              <TbTruckDelivery className="text-lg  text-blue-500" />
              <p>Easily Track Orders, Hassle free Returns</p>
            </div>
            <div className="flex items-center gap-x-3">
              <IoMdNotifications className="text-lg text-blue-500" />
              <p>Get Relevant Alerts and Recommendation</p>
            </div>
            <div className="flex items-center gap-x-3">
              <MdStar className="text-lg text-blue-500" />
              <p>Wishlist, Reviews, Ratings and more.</p>
            </div>
          </div>
        </div>
        <p className="mt-7 text-gray-500">
          Please note that upon clicking "Logout" you will lose all items in
          cart and will be redirected to Flipkart home page.
        </p>
      </div>
    </div>
  )
}

export default LoginInfoStep
