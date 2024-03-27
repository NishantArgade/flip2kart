import { Input, Rating, Textarea } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Spinner from "../../components/Spinner"
import { IoMdTrash } from "react-icons/io"
import { useMutation, useQuery } from "@tanstack/react-query"
import {
  addReview,
  getMyReviewAndRating,
  uploadReviewImgs,
} from "../../api/ratingAndReviewApi"
import { queryClient } from "../../main"
import { toast } from "../../utils/toast"

const RateProduct = () => {
  const { productID } = useParams()
  const [rateValue, setRateValue] = useState(0)
  const [previewImages, setPreviewImages] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [loading, setLoading] = useState(false)

  const rateValueOptimize = useMemo(() => {
    if (rateValue === 1) {
      return "Very Bad"
    } else if (rateValue === 2) {
      return "Bad"
    } else if (rateValue === 3) {
      return "Good"
    } else if (rateValue === 4) {
      return "Very  Good"
    } else if (rateValue === 5) {
      return "Excellent"
    }
  }, [rateValue])

  const form = useForm({
    initialValues: { review_description: "", review_title: "" },
  })

  const { data, isLoading } = useQuery({
    queryKey: ["myReviewAndRating", productID],
    queryFn: async () => await getMyReviewAndRating(productID),
  })

  const isBoughtProduct = true

  const { mutate: addRatingAndReviewMutate } = useMutation({
    mutationKey: "addReview",
    mutationFn: addReview,
    onSuccess: () => {
      queryClient.invalidateQueries("productRatingAndReviewDetails" + productID)
      toast.success("Thank you so much. Your review has been saved.")
    },
    onSettled: () => setLoading(false),
  })

  const handleImageChange = (e) => {
    setSelectedImages((prev) => [...prev, ...e.target.files])

    const fileArray = Array.from(e.target.files).map((file) => ({
      url: URL.createObjectURL(file),
    }))

    setPreviewImages((prevImages) => prevImages.concat(fileArray))
  }

  const removeImage = (event, index) => {
    event.preventDefault()
    setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index))
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index))
    document.getElementById("formFileMultipleReviewAndRating").value = null
  }

  const handleUpload = async () => {
    const formData = new FormData()
    selectedImages.forEach((image, i) => {
      if (image instanceof File) formData.append("images", image)
    })

    try {
      const remaining = previewImages.filter(
        (item) => !item.url.includes("blob")
      )
      if (formData.entries().next().value) {
        const response = await uploadReviewImgs(formData)
        return [...remaining, ...response.uploadedImages]
      } else {
        return remaining
      }
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async function handleReviewSubmit(values) {
    setLoading(true)
    const uploadedImages = await handleUpload()

    addRatingAndReviewMutate({
      productID,
      payload: {
        product_id: productID,
        rating: rateValue,
        images: uploadedImages,
        ...values,
      },
    })
  }

  function handleRatingChange(rate) {
    setRateValue(rate)
    let review_title = ""
    switch (rate) {
      case 1:
        review_title = "Utterly Disappointed"
        break
      case 2:
        review_title = "Slightly disappointed"
        break
      case 3:
        review_title = "Decent product"
        break
      case 4:
        review_title = "Wonderful"
        break
      case 5:
        review_title = "Worth every penny"
        break
    }
    form.setValues({ review_title })
  }

  useEffect(() => {
    form.setValues({
      review_description: data?.myReviewData?.review_description || "",
      review_title: data?.myReviewData?.review_title || "",
    })
    setRateValue(data?.myReviewData?.rating || 0)

    setSelectedImages(data?.myReviewData?.images?.map((item) => item.url) || [])
    setPreviewImages(data?.myReviewData?.images || [])
  }, [data])

  return (
    <div className="min-h-screen">
      {/** Rating and Review Section */}
      <div className="container mx-auto w-full bg-white p-2 shadow-md ">
        <div className="flex flex-wrap items-center justify-between gap-x-2 px-2">
          <p className="font-semibold text-gray-800">Ratings & Reviews</p>

          {!isLoading && (
            <Link
              to={`/product-detail/${productID}`}
              className="bg-red-20 flex w-full items-center  justify-end gap-x-3 text-xs md:w-fit"
            >
              <div className="flex flex-col items-end  gap-y-1">
                <div className="flex w-56 justify-end">
                  <p className="truncate text-gray-800">
                    {data?.productData?.name}
                  </p>
                </div>
                {data?.productData?.overall_rating > 0 ? (
                  <div className="flex items-center gap-x-2 text-xs text-gray-700">
                    <p
                      className={`${data?.productData?.overall_rating == 1 ? "bg-red-400" : data?.productData?.overall_rating == 2 ? "bg-orange-400" : "bg-green-600"}  rounded-sm px-[6px]  text-[0.65rem] text-white`}
                    >
                      {data?.productData?.overall_rating}★
                    </p>
                    <p className="mr-4 font-medium text-gray-500">
                      ({data?.productData?.rating_count})
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">No ratings yet</p>
                )}
              </div>
              <div className="flex h-12 w-12 flex-col items-center justify-center rounded-sm border-[1.5px] p-1">
                <img
                  src={
                    data?.productData?.images.length > 0
                      ? data?.productData?.images[0].url
                      : "/photoPlaceholder.png"
                  }
                  className="h-full w-full object-contain"
                  alt=""
                />
              </div>
            </Link>
          )}
        </div>
      </div>

      <div className="container mx-auto  grid min-h-[30rem] grid-cols-1 gap-x-2 gap-y-2 py-2 md:grid-cols-12">
        {/* Left sidebar Section */}
        <div className="h-fit  grid-cols-1 bg-white shadow-md md:col-span-5  lg:col-span-3">
          <div>
            <p className="border-b-2 p-4 text-sm ">What makes a good review</p>
            <div className="flex flex-col gap-y-1 px-4">
              <div className="border-b-2 py-4">
                <p className="text-sm">Have you used this product?</p>
                <p className="mt-2 text-xs">
                  Your review should be about your experience with the product.
                </p>
              </div>

              <div className="border-b-2 py-4">
                <p className="text-sm">Have you used this product?</p>
                <p className="mt-2 text-xs">
                  Your review should be about your experience with the product.
                </p>
              </div>

              <div className="border-b-2 py-4">
                <p className="text-sm">How to review a product?</p>
                <p className="mt-2 text-xs">
                  Your review should include facts. An honest opinion is always
                  appreciated. If you have an issue with the product or service
                  please contact us from the help centre.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="row-end-2 grid-cols-1 bg-white shadow-md md:col-span-7   md:row-auto  lg:col-span-9">
          {isBoughtProduct ? (
            !isLoading && !loading ? (
              <div className="flex flex-col gap-y-1">
                <div className="border-b-2 p-4">
                  <p className="text-sm font-semibold">Rate this product</p>
                  <div className="mt-2 flex items-center gap-x-4">
                    <Rating
                      value={rateValue}
                      className="gap-x-2"
                      onChange={(rate) => handleRatingChange(rate)}
                      color="#FFE11B"
                    />
                    <span
                      className={
                        rateValueOptimize === "Very Bad"
                          ? "text-xs font-semibold text-red-500"
                          : rateValueOptimize === "Bad"
                            ? "text-xs font-semibold text-orange-500"
                            : "text-xs font-semibold text-green-500"
                      }
                    >
                      {rateValueOptimize}
                    </span>
                  </div>
                </div>
                <form onSubmit={form.onSubmit(handleReviewSubmit)}>
                  <div className="px-4 pt-3">
                    <p className="pb-3 text-sm font-semibold">
                      Review this product
                    </p>
                    <div className="flex flex-col gap-y-4">
                      <Textarea
                        radius="xs"
                        description="Description"
                        placeholder="Write description here..."
                        {...form.getInputProps("review_description")}
                        rows={8}
                      />
                      <Input.Wrapper description="Title (optional)">
                        <Input
                          radius="xs"
                          maxLength={80}
                          placeholder="Review title..."
                          {...form.getInputProps("review_title")}
                        />
                      </Input.Wrapper>
                    </div>
                  </div>

                  <div className="px-4 pt-5">
                    <button
                      type="button"
                      onClick={() =>
                        document
                          .getElementById("formFileMultipleReviewAndRating")
                          .click()
                      }
                      className="flex h-12 w-12 cursor-pointer items-center justify-center bg-gray-200 p-2"
                    >
                      <img src="/addImgCamara.svg" color="red" alt="" />
                      <input
                        className="hidden"
                        id="formFileMultipleReviewAndRating"
                        type="file"
                        multiple
                        onChange={handleImageChange}
                      />
                    </button>

                    {previewImages.length > 0 && (
                      <div className="relative mt-4 flex h-16 w-fit items-center justify-center gap-x-2 ">
                        {previewImages.map((item, index) => (
                          <div
                            key={index}
                            className="group relative h-14  w-14 overflow-hidden  rounded-sm border border-gray-300 object-cover p-1 shadow-sm hover:opacity-50"
                          >
                            <img
                              className="h-full w-full object-contain"
                              src={item?.url}
                              alt="preview"
                            />
                            <button
                              className="absolute left-1/2 top-1/2 inline-block -translate-x-1/2 -translate-y-1/2 text-red-800 opacity-0 group-hover:bg-white group-hover:opacity-100"
                              onClick={(e) => removeImage(e, index)}
                            >
                              <IoMdTrash />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="float-end p-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className=" bg-[#FB641B]  px-10  py-3 text-xs font-semibold uppercase text-white shadow-md"
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <Spinner />
              </div>
            )
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-y-4">
                <img src="/cycleMan.png" alt="notPurchased" />
                <p className="mt-2 text-xl font-medium text-gray-800">
                  Haven't purchased this product?
                </p>
                <p className="text-gray-500">
                  Sorry! You are not allowed to review this product since you
                  haven't bought it on Flip2kart.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RateProduct
