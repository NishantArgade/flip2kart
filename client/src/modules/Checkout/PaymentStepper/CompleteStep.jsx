import { FaRegCheckCircle } from "react-icons/fa"
import { Link } from "react-router-dom"

const CompleteStep = ({ paymentData }) => {
  console.log(paymentData)
  return (
    <div className="bg-red-00 mt-10 flex flex-col items-center justify-center gap-2 text-center">
      <FaRegCheckCircle size={70} className="text-green-500" />
      <p className="text-xl font-semibold text-gray-700">Completed</p>
      <p className="text-gray-400">Payment successfully</p>
      <Link
        to="/my-orders"
        className="my-8 text-sm text-blue-600 hover:underline "
      >
        View Payment Details
      </Link>
    </div>
  )
}

export default CompleteStep
