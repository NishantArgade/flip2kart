import { BsFillLightningFill } from "react-icons/bs"
import { IoCart } from "react-icons/io5"
import { addProductToCart } from "../../../api/cartApi"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

const ButtonSection = ({ isInStock, productID, product }) => {
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationKey: "addProductToCart",
    mutationFn: addProductToCart,
    onSuccess: () => navigate("/cart"),
  })

  const handleAddToCart = (id) => {
    mutate(id)
  }

  return (
    <div className="mt-4 flex flex-col gap-3 p-2 md:flex-col  lg:flex-row">
      <button
        disabled={!isInStock || isPending}
        className={`${isInStock ? "bg-[#FF9F00] text-white" : "cursor-not-allowed border-[1.5px] bg-gray-50 text-gray-500 "} px-auto flex w-full items-center justify-center gap-x-1  py-3   shadow-md`}
        onClick={() => handleAddToCart(productID)}
      >
        <IoCart className="text-[1.1rem]" />
        <p className="text-xs font-semibold uppercase">Add to Cart</p>
      </button>
      <button
        disabled={!isInStock}
        className={`${isInStock ? "bg-[#FB641B] text-white" : "cursor-not-allowed bg-[#878787] text-white"} px-auto flex w-full items-center justify-center gap-x-1  py-3 
         shadow-md`}
        onClick={() =>
          navigate(`/checkout?product=${productID}&qty=1`, {
            state: { product },
          })
        }
      >
        <BsFillLightningFill className="text-[0.9rem]" />
        <p className="text-xs font-semibold uppercase">Buy Now</p>
      </button>
    </div>
  )
}

export default ButtonSection
