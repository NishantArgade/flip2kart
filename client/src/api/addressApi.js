import { axiosCall } from "./helper"

export const addAddress = async (payload) => {
  return await axiosCall("post", `/api/add-address`, payload)
}

export const updateAddress = async ({ addressID, payload }) => {
  return await axiosCall("patch", `/api/edit-address/${addressID}`, payload)
}

export const getAllMyAddresses = async () => {
  return await axiosCall("get", `/api/my-addresses`)
}

export const deleteAddress = async (addressID) => {
  return await axiosCall("delete", `/api/delete-address/${addressID}`)
}

export const updateActiveAddress = async (addressID) => {
  return await axiosCall("patch", `/api/edit-active-address/${addressID}`)
}
