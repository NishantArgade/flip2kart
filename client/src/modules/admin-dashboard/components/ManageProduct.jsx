/* eslint-disable react/prop-types */
import { IoArrowBack } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import ManageProductStepper from "./ManageProductStepper"

const ManageProduct = ({ isEditProduct = false }) => {
  const navigate = useNavigate()

  return (
    <>
      <div className="container m-2 mx-auto min-h-screen w-full bg-white p-2 shadow-md">
        {/** Heading */}
        <div className="mb-6 flex items-center">
          <button
            className="flex items-center gap-2 text-sm  font-semibold text-gray-400"
            onClick={() => navigate("/admin-dashboard/products")}
          >
            <IoArrowBack />
            <p>Back</p>
          </button>
          <p className="pl-5 text-base font-semibold text-gray-500">
            {isEditProduct ? "Edit Product" : "Add Product"}
          </p>
        </div>
        {/** Edit Product Stepper */}
        <ManageProductStepper isEditProduct={isEditProduct} />
      </div>
    </>
  )
}

export default ManageProduct
