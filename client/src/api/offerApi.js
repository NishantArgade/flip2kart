import { axiosCall } from "./helper"

export const getAllOffers = async () => {
  return await axiosCall("get", "/api/all-offers")
}
export const addOffer = async (payload) => {
  return await axiosCall("post", "/api/add-offer", payload)
}
export const editOffer = async ({ id, payload }) => {
  return await axiosCall("patch", `/api/edit-offer/${id}`, payload)
}
export const deleteOffer = async (product) => {
  return await axiosCall("delete", `/api/delete-offer/${product._id}`)
}

export const getDashboardData = async () => {
  return await axiosCall("get", `/api/dashboard-data`)
}
