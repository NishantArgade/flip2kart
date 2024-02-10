import { axiosCall } from "./helper"

export const fetchData = async () => {
  try {
    const response = await axiosCall("get", "/api/data")
    return response
  } catch (error) {
    console.error(error)
  }
}
