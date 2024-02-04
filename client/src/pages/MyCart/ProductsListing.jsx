import AddToCartProductCard from "../../components/AddToCartProductCard"
import ChangeAddressModal from "../../components/modals/ChangeAddressModal"

const ProductsListing = ({ cartData }) => {
  return (
    <>
      {/* Address */}
      <div className="mb-2 flex items-center justify-between  bg-white px-2 py-3 text-xs shadow-md">
        <div className="flex flex-col items-start justify-center gap-y-1">
          <div className="flex items-center justify-start">
            <p>Deliver to: </p>
            <p className="ml-1 font-semibold"> Nishnt Vilas Argade</p>
          </div>
          <p className="text-gray-500">
            Office No: 520, Amonora chamber, handapasar mall 411021
          </p>
        </div>
        <ChangeAddressModal>
          <button className="rounded-sm border-2 bg-white  px-4 py-2 font-semibold text-blue-500 shadow-sm  hover:shadow-md">
            Change
          </button>
        </ChangeAddressModal>
      </div>

      {/* All Add to Cart Products list */}
      <div className="shadow-md">
        {cartData.map((product) => (
          <AddToCartProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}

export default ProductsListing
