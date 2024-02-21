import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL
axios.defaults.withCredentials = true

export const axiosCall = async (
  method = "get",
  url = "/",
  data = null,
  config = {}
) => {
  const response = await axios({
    method: method,
    url: `${API_BASE_URL}${url}`,
    data: data,
    ...config,
  })
  return response.data
}
