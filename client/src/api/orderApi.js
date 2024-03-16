import { axiosCall } from "./helper"

export const createOrder = async (payload) => {
  return await axiosCall("post", `/api/create-order`, payload)
}
export const validateOrder = async (payload) => {
  return await axiosCall("post", `/api/validate-order`, payload)
}

export const saveOrder = async (payload) => {
  return await axiosCall("post", `/api/save-order`, payload)
}
