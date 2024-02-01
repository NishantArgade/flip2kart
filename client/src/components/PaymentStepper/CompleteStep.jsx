import { FaRegCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const CompleteStep = () => {
  return (
    <div className="mt-10 bg-red-00 text-center flex flex-col justify-center items-center gap-2">
      <FaRegCheckCircle size={70} className="text-green-500" />
      <p className="font-semibold text-xl text-gray-700">Completed</p>
      <p className="text-gray-400">Payment successfully</p>
      <Link
        to="/my-orders"
        className="my-8 text-blue-600 text-sm hover:underline "
      >
        View Payment Details
      </Link>
    </div>
  );
};

export default CompleteStep;
