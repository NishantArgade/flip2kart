import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import { checkAuth } from "../api/userApi"
import { useQuery } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { setUserData } from "../slices/userSlice"

const Root = ({ authData }) => {
  return (
    <div>
      <Navbar authData={authData} />
      <div className="flex max-h-fit min-h-screen flex-col justify-between bg-[#F1F2F4] pt-2">
        <Outlet />
        <Footer isLoggedIn={authData?.isLoggedIn} />
      </div>
    </div>
  )
}

export default Root
