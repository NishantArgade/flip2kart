import { FaRegCheckCircle } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import { IoIosCloseCircle } from "react-icons/io"

const CompleteStep = ({ paymentData }) => {
  if (paymentData?.payment?.status === "captured")
    return (
      <div className="bg-red-00 mt-10 flex flex-col items-center justify-center gap-2 text-center">
        <FaRegCheckCircle size={70} className="text-green-500" />
        <p className="text-xl font-semibold text-gray-700">Completed</p>
        <p className="text-gray-400">Payment successfully</p>
        <Link
          to="/my-orders"
          className="my-8 text-sm text-blue-600 hover:underline "
        >
          view payment details
        </Link>
      </div>
    )

  return (
    <div className="bg-red-00 mt-10 flex flex-col items-center justify-center gap-2 text-center">
      <IoIosCloseCircle size={70} className="text-red-500" />
      <p className="text-xl font-semibold text-gray-700">Failed</p>
      <p className="text-gray-400">Payment failed</p>
      <button
        className="my-8 text-sm text-blue-600 hover:underline"
        onClick={() => window.location.reload(true)}
      >
        retry payment again
      </button>
    </div>
  )
}

export default CompleteStep
