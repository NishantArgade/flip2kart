import { useLocation, useNavigate } from "react-router-dom"
import ManageProductStepper from "./ManageProductStepper"

const ManageProduct = ({ isEditProduct = false }) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      <div className="container m-2 mx-auto min-h-screen w-full bg-white p-2 shadow-md">
        {/** Edit Product Stepper */}
        <ManageProductStepper
          isEditProduct={isEditProduct}
          product={location?.state?.product || {}}
        />
      </div>
    </>
  )
}

export default ManageProduct
