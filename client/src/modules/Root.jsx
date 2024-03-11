import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

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
