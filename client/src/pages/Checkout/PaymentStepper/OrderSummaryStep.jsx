import AddToCartProductCard from "../../../components/AddToCartProductCard"

const cartData = [
  {
    id: "3232fsdsfs343fssdf4234dsf",
    name: "Cannon Camera",
    image: "/camera.png",
    price: 1500,
    quantity: 1,
    deliveryCharges: 0,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    sellerName: "Tech Mall",
    discount: 30,
    oldPice: 2300,
    deliveryDay: "Fri",
  },
  {
    id: "3232fsdsfs343fssdf4234dsf",
    name: "Cannon Camera",
    image: "/camera.png",
    price: 1500,
    quantity: 1,
    deliveryCharges: 0,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    sellerName: "Tech Mall",
    discount: 30,
    oldPice: 2300,
    deliveryDay: "Fri",
  },
]

const OrderSummaryStep = ({ nextStep }) => {
  return (
    <div>
      {" "}
      <div className="border-t-[1px]">
        {cartData.map((product) => (
          <AddToCartProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-end">
        <button
          className="mt-2 w-fit cursor-pointer self-end bg-[#FB641B] px-10   py-3  text-white shadow-md"
          size="xs"
          onClick={nextStep}
        >
          CONTINUE
        </button>
      </div>
    </div>
  )
}

export default OrderSummaryStep
