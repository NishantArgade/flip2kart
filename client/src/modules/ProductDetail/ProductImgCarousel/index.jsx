import { IoMdHeart } from "react-icons/io"
import ButtonSection from "./ButtonSection"
import LargeDeviceIMGCarousel from "./LargeDeviceIMGCarousel"
import SmallDeviceIMGCarousel from "./SmallDeviceIMGCarousel"
import { useMutation } from "@tanstack/react-query"
import { toggleProductFromWishlist } from "../../../api/productApi"
import { queryClient } from "../../../main"

const ProductImgCarousel = ({
  product,
  images,
  isFav,
  selectedImgIndex,
  setSelectedImgIndex,
  isInStock,
}) => {
  const { mutate, isPending } = useMutation({
    mutationKey: "toggleProductFromWishlist",
    mutationFn: toggleProductFromWishlist,
    onSuccess: () => queryClient.invalidateQueries("checkAuth"),
  })

  function handleAddToWishlist() {
    mutate(product)
  }

  return (
    <div className="relative z-0">
      <LargeDeviceIMGCarousel
        images={images}
        selectedImgIndex={selectedImgIndex}
        setSelectedImgIndex={setSelectedImgIndex}
      />
      <SmallDeviceIMGCarousel images={images} />
      <ButtonSection
        isInStock={isInStock}
        productID={product?._id}
        product={product}
      />
      <button disabled={isPending} onClick={handleAddToWishlist}>
        <IoMdHeart
          className={`${isFav ? "text-red-500" : "text-gray-300"} absolute right-2 top-2 z-10  cursor-pointer rounded-full border-e-2 border-gray-200 bg-gray-100 p-1 `}
          size={35}
        />
      </button>
    </div>
  )
}

export default ProductImgCarousel
