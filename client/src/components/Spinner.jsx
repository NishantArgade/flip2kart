import React from "react"
import { Loader } from "@mantine/core"

const Spinner = ({ size = 35, color = "blue" }) => {
  return <Loader size={size} color={color} />
}

export default Spinner
