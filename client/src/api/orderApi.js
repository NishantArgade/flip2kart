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

export const getOrderByOrderIDAndProductID = async (search) => {
  return await axiosCall("get", `/api/order-detail${search}`)
}

export const changeStatusOfDelivery = async (payload) => {
  return await axiosCall("post", `/api/change-delivery-status`, payload)
}

export const getAllOrders = async () => {
  return await axiosCall("get", `/api/all-orders`)
}

export const getFilteredOrders = async (search) => {
  return await axiosCall("post", `/api/filter-orders${search}`)
}

export const deleteOrder = async (item) => {
  return await axiosCall("delete", `/api/delete-order/${item._id}`)
}

export const getPaymentData = async (paymentId) => {
  return await axiosCall("get", `/api/payment-data/${paymentId}`)
}
