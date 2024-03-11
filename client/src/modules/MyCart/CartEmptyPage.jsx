import React from "react"
import { Link } from "react-router-dom"

const CartEmptyPage = () => {
  return (
    <div className="container mx-auto flex h-screen w-full flex-col items-center justify-center">
      <div className="mx-4 mb-28 flex flex-col items-center justify-center gap-y-8 rounded-md bg-white px-4 py-8 shadow-md md:px-28">
        <img
          src="/emptyCart.svg"
          className="red- contrast-10 w-80 text-blue-200 grayscale filter"
          color="red"
          alt=""
        />
        <p className="flex w-full flex-col items-center justify-center">
          <p className="text-2xl font-semibold text-gray-500">
            Your cart is empty.
          </p>
          <Link to="/products" className="ml-1 text-blue-500">
            Continue shopping
          </Link>
        </p>
      </div>
    </div>
  )
}

export default CartEmptyPage
