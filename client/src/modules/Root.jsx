import { Outlet, useLocation } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useEffect } from "react"

const Root = ({ authData }) => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }, [pathname])

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
