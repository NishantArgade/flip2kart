import { axiosCall } from "./helper"

export const addProductToCart = async (productID) => {
  return await axiosCall("get", `/api/add-product-to-cart/${productID}`)
}

export const removeProductFromCart = async (productID) => {
  return await axiosCall("delete", `/api/remove-product-from-cart/${productID}`)
}

export const getCartProducts = async () => {
  return await axiosCall("get", `/api/cart-products`)
}
export const updateAddToCartProduct = async (payload) => {
  return await axiosCall("post", `/api/update-cart-product`, payload)
}
