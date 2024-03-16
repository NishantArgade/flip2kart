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
export const getAllMyOrders = async () => {
  return await axiosCall("get", `/api/my-orders`)
}
export const getOrderByOrderIDAndProductID = async (search) => {
  return await axiosCall("get", `/api/order-detail${search}`)
}
