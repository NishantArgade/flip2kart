import { FaRegCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const CompleteStep = ({ isEditProduct }) => {
  return (
    <div className="mt-20 bg-red-00 text-center flex flex-col justify-center items-center gap-2">
      <FaRegCheckCircle size={70} className="text-green-500" />
      <p className="font-semibold text-xl text-gray-700">Completed</p>
      <p className="text-gray-400">
        Product has been {isEditProduct ? "edited" : "added"} successfully
      </p>
      <Link
        to="/admin-dashboard/products"
        className="my-8 text-blue-600 text-sm hover:underline "
      >
        View {isEditProduct ? "Edited" : "Added"} Product
      </Link>
    </div>
  );
};

export default CompleteStep;
