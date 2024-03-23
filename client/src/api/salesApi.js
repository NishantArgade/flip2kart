import { axiosCall } from "./helper"

export const getMonthlySalesData = async () => {
  return await axiosCall("get", "/api/monthly-sales-data")
}
export const getDailySalesData = async () => {
  return await axiosCall("get", "/api/daily-sales-data")
}
export const getSalesBreakdownData = async () => {
  return await axiosCall("get", "/api/sales-breakdown-data")
}
