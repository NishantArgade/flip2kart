import React from "react"
import { useNavigate } from "react-router-dom"

const MissingCartPage = () => {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto  px-2 md:px-20">
      <div className="mt-2 flex h-[30rem] flex-col items-center justify-center gap-2 rounded-sm bg-white shadow-md">
        <img src="missing-cart.png" className="w-52 " alt="" />
        <p className="mt-4 text-sm">Missing Cart items?</p>
        <p className="text-xs text-gray-700">
          Login to see the items you added previously
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

export default MissingCartPage
