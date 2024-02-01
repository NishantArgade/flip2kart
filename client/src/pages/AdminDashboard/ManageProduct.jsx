/* eslint-disable react/prop-types */
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ManageProductStepper from "../../components/ManageProductStepper";

const ManageProduct = ({ isEditProduct = false }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container mx-auto m-2 w-full min-h-screen bg-white p-2 shadow-md">
        {/** Heading */}
        <div className="flex items-center mb-6">
          <button
            className="flex items-center gap-2 text-sm  text-gray-400 font-semibold"
            onClick={() => navigate("/admin-dashboard/products")}
          >
            <IoArrowBack />
            <p>Back</p>
          </button>
          <p className="pl-5 font-semibold text-gray-500 text-base">
            {isEditProduct ? "Edit Product" : "Add Product"}
          </p>
        </div>
        {/** Edit Product Stepper */}
        <ManageProductStepper isEditProduct={isEditProduct} />
      </div>
    </>
  );
};

export default ManageProduct;
