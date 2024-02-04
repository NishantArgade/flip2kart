import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const Root = () => {
  console.log("welcome in root")
  // add authentication here
  // check user is auth or not using token in server side only

  return (
    <div className="">
      <Navbar />
      <div className="flex max-h-fit min-h-screen flex-col justify-between bg-[#F1F2F4] pt-2">
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default Root
