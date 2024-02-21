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
