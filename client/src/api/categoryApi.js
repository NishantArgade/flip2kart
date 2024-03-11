import { axiosCall } from "./helper"

export const addCategory = async (payload) => {
  return await axiosCall("post", `/api/add-category`, payload)
}

export const updateCategory = async ({ categoryID, payload }) => {
  return await axiosCall("patch", `/api/edit-category/${categoryID}`, payload)
}

export const deleteCategory = async (category) => {
  return await axiosCall("delete", `/api/delete-category/${category?._id}`, {
    image: category?.image,
  })
}

export const getAllCategoriesAndBrands = async () => {
  return await axiosCall("get", `/api/all-categories`)
}

export const getBrandsByCategory = async (category, name) => {
  return await axiosCall("post", `/api/brands-by-category`, { category, name })
}
