import React from "react"
import { useNavigate } from "react-router-dom"

const EmptyContactPage = () => {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto  pb-8 md:px-20">
      <div className="mt-2 flex h-[30rem] flex-col items-center justify-center gap-2 rounded-sm bg-white shadow-md">
        <img src="missing-cart.png" className="w-52 " alt="" />
        <p className="mt-4 text-sm">
          Login to get help with your recent orders and issues
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-3 rounded-sm bg-orange-500 px-10 py-2 text-sm text-white shadow-sm"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default EmptyContactPage
