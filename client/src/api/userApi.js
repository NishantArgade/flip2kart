import { axiosCall } from "./helper"

export const login = async (email) => {
  return await axiosCall("post", "/api/login", { email })
}

export const register = async (email) => {
  return await axiosCall("post", "/api/register", { email })
}

export const logout = async () => {
  return await axiosCall("get", "/api/logout")
}

export const verifyOTP = async (email, otp) => {
  return await axiosCall("post", "/api/verify-otp", { email, otp })
}

export const checkAuth = async () => {
  return await axiosCall("get", "/api/auth/check")
}

export const updateProfile = async ({ userID, payload }) => {
  return await axiosCall("patch", `/api/edit-user/${userID}`, payload)
}

export const getUserData = async (userID) => {
  return await axiosCall("get", `/api/user/${userID}`)
}

export const getAllUsers = async () => {
  return await axiosCall("get", `/api/all-users`)
}

export const editUser = async ({ userID, payload }) => {
  return await axiosCall("patch", `/api/edit-user/${userID}`, payload)
}

export const deleteUser = async (user) => {
  return await axiosCall("delete", `/api/delete-user/${user?._id}`)
}
