import { IoMdNotifications } from "react-icons/io"
import { MdStar } from "react-icons/md"
import { TbTruckDelivery } from "react-icons/tb"
import { Link } from "react-router-dom"

const LoginInfoStep = ({ nextStep }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-10 border-t-[1px]  py-2 pt-6">
      <div>
        <div className="bg-r flex flex-col items-start justify-center gap-x-4 gap-y-6 md:flex-row lg:gap-x-20">
          <div className="flex flex-col items-start justify-start gap-y-2">
            {true && (
              <div className="flex items-center justify-start gap-x-3">
                <p className="text-gray-500">Name</p>
                <p>Nishant Argade</p>
              </div>
            )}
            <div className="flex items-center justify-start gap-x-3">
              <p className="text-gray-500">Email</p>
              <p>nishantargade4579@gmail.com</p>
            </div>
            <Link to="/login" className="text-blue-500">
              Logout & Sign in to another account
            </Link>
            <button
              onClick={nextStep}
              className="mt-2 cursor-pointer rounded-sm bg-[#FB641B]  px-4 py-3 text-white shadow-md   lg:w-64 lg:px-10"
            >
              Continue Checkout
            </button>
          </div>
          <div className="flex flex-col items-start justify-start gap-y-2">
            <p className="text-xs text-gray-500">
              Lorem ipsum dolor sit amet consectetur.
            </p>
            <div className="flex items-center gap-x-3">
              <TbTruckDelivery className="text-lg  text-blue-500" />
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <div className="flex items-center gap-x-3">
              <IoMdNotifications className="text-lg text-blue-500" />
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <div className="flex items-center gap-x-3">
              <MdStar className="text-lg text-blue-500" />
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
          </div>
        </div>
        <p className="mt-7 text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium,
          error?
        </p>
      </div>
    </div>
  )
}

export default LoginInfoStep
