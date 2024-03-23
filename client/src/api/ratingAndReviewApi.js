import { axiosCall } from "./helper"

export const addReview = async ({ productID, payload }) => {
  return await axiosCall("post", `/api/add-review/${productID}`, payload)
}

export const uploadReviewImages = async (payload) => {
  return await axiosCall("post", `/api/upload-review-imgs`, payload)
}

export const getProductReviewDetails = async (productID) => {
  return await axiosCall("get", `/api/rating-review/${productID}`)
}

export const getMyReviewAndRating = async (productID) => {
  return await axiosCall("get", `/api/my-review-rating/${productID}`)
}

export const myAllReviewAndRatings = async () => {
  return await axiosCall("get", `/api/my-all-reviews-ratings`)
}
export const allReviewAndRatings = async () => {
  return await axiosCall("get", `/api/all-reviews-ratings`)
}

export const uploadReviewImgs = async (formData) => {
  return await axiosCall("post", `/api/upload-review-imgs`, formData)
}
export const deleteReview = async (review) => {
  return await axiosCall("delete", `/api/delete-review/${review?._id}`)
}
