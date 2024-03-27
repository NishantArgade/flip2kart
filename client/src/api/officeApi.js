import { axiosCall } from "./helper"

export const getAllOffices = async () => {
  return await axiosCall("get", "/api/all-offices")
}
export const addOffice = async (payload) => {
  return await axiosCall("post", "/api/add-office", payload)
}
export const editOffice = async ({ id, payload }) => {
  return await axiosCall("patch", `/api/edit-office/${id}`, payload)
}
export const deleteOffice = async (product) => {
  return await axiosCall("delete", `/api/delete-office/${product._id}`)
}

export const sendContactMail = async (payload) => {
  return await axiosCall("post", `/api/send-contact-mail`, payload)
}
