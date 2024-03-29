import { axiosCall } from "./helper"

export const addProduct = async (payload) => {
  return await axiosCall("post", `/api/add-product`, payload)
}

export const updateProduct = async ({ productID, payload }) => {
  return await axiosCall("patch", `/api/edit-product/${productID}`, payload)
}

export const getAllProducts = async () => {
  return await axiosCall("get", `/api/all-products`)
}

export const getTopOfferProducts = async () => {
  return await axiosCall("get", `/api/top-offer-products`)
}

export const getFilteredProducts = async (query) => {
  return await axiosCall("get", `/api/filter-products${query}`)
}

export const getProductDetailByID = async (productID) => {
  return await axiosCall("get", `/api/product-detail/${productID}`)
}

export const getProductsByCategory = async () => {
  return await axiosCall("get", `/api/category-products`)
}

export const deleteProduct = async (product) => {
  return await axiosCall("delete", `/api/delete-product/${product?._id}`)
}

export const deleteProductImgs = async (images) => {
  return await axiosCall("post", `/api/delete-product-imgs`, { images })
}

export const getMyWishlistProducts = async () => {
  return await axiosCall("get", `/api/my-wishlist`)
}

export const toggleProductFromWishlist = async (product) => {
  return await axiosCall("post", `/api/toggle-product-in-whislist`, {
    productID: product?._id,
  })
}

export const uploadProductImgs = async (formData) => {
  return await axiosCall("post", `/api/upload-product-imgs`, formData)
}

export const deleteUploadedImg = async (filename) => {
  return await axiosCall("post", `/api/delete-uploaded-img`, {
    filename: filename,
  })
}
