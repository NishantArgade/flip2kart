/* eslint-disable react/prop-types */
import { Modal, Progress } from "@mantine/core"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDisclosure } from "@mantine/hooks"
import moment from "moment"
import { Carousel } from "@mantine/carousel"

const CustomerReview = ({ reviews, product, data }) => {
  const navigate = useNavigate()
  const [opened, { open, close }] = useDisclosure(false)
  const [selectedImgIndex, setSelectedImgIndex] = useState(0)
  const [selectedReview, setSelectedReview] = useState({})
  const [showMoreReviewsBtn, setShowMoreReviewsBtn] = useState(false)

  function handleOpenModal(i, review) {
    setSelectedImgIndex(i)
    setSelectedReview(review)
    open()
  }

  useEffect(() => {
    if (data?.product?.reviews?.length > 3) setShowMoreReviewsBtn(true)
  }, [data?.product?.reviews?.length])

  return (
    <>
      <Modal size={850} opened={opened} onClose={close} centered>
        <div className="grid grid-cols-12">
          <div className="col-span-7 flex items-center justify-center bg-black">
            <Carousel
              height={380}
              slideGap="md"
              initialSlide={selectedImgIndex}
              withIndicators
              styles={{
                indicator: {
                  color: "white",
                  background: "white",
                  display: `${selectedReview?.images?.length === 1 ? "none" : "block"}`,
                },
                control: {
                  color: "white",
                  fontWeight: "bold",
                  display: `${selectedReview?.images?.length === 1 ? "none" : "block"}`,
                },
              }}
            >
              {selectedReview?.images?.map((img, i) => (
                <Carousel.Slide key={i}>
                  <div className=" h-full w-full items-center justify-center ">
                    <img
                      src={img?.url}
                      className="h-full w-full object-contain"
                      alt=""
                    />
                  </div>
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
          <div className="bg-white-200 thin-scrollbar col-span-5 h-[25rem] overflow-y-auto  p-2 ">
            <div className="flex items-center gap-2">
              <div
                className={`${selectedReview?.rating == 1 ? "bg-red-400" : selectedReview?.rating == 2 ? "bg-orange-400" : "bg-green-600"} rounded-sm px-[6px] text-[0.65rem] text-white`}
              >
                {selectedReview?.rating}★
              </div>
              <p className="text-sm">{selectedReview?.review_title}</p>
            </div>
            <p className="py-1 text-xs">{selectedReview?.review_description}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              {(selectedReview?.user_id?.first_name ||
                selectedReview?.user_id?.last_name) && (
                <p>
                  {selectedReview?.user_id?.first_name}{" "}
                  {selectedReview?.user_id?.last_name}
                </p>
              )}
              <p>{moment(selectedReview?.created_at).format("MMM, YYYY")}</p>
            </div>
          </div>
        </div>
      </Modal>

      <div className="flex w-full flex-col items-start justify-start gap-y-3 border-[1.5px]">
        <div className="flex w-full items-center justify-between p-2">
          <p className="text-xl font-semibold tracking-tight  text-gray-800">
            Ratings & Reviews
          </p>
          <button
            className="border-[1.5px] px-2 py-2 text-sm shadow-md md:px-5 md:py-3"
            onClick={() => navigate(`/rate-product/${product?._id}`)}
          >
            Rate Product
          </button>
        </div>

        {/* Review Info */}
        {data?.overallRating > 0 ? (
          <div>
            <div className="grid w-full grid-cols-1 gap-2 border-b-[1.5px] px-2 pb-4 lg:grid-cols-12">
              <div className="flex grid-cols-1 flex-col items-start justify-center lg:col-span-2 lg:items-center">
                <p className="text-center text-xl">{data?.overallRating}★</p>
                <p className="text-center text-xs text-gray-500">
                  {data?.totalRatingsCount} Ratings & {data?.reviews.length}{" "}
                  Reviews
                </p>
              </div>
              <div className="flex grid-cols-1 flex-col gap-y-1 text-xs lg:col-span-10">
                {Array.from({ length: 5 })
                  .map((_, index) => index)
                  .reverse()
                  .map((rate) => (
                    <div
                      key={rate}
                      className="flex items-center justify-start gap-x-2"
                    >
                      <span className="text-[13px] font-medium">
                        {rate + 1} ★
                      </span>
                      <Progress
                        value={
                          (data?.ratingsWithCount[rate + 1] /
                            data?.totalRatingsCount) *
                          100
                        }
                        className="w-44"
                        size={4}
                        color={
                          rate + 1 == 1
                            ? "#F87171"
                            : rate + 1 == 2
                              ? "#FB923C"
                              : "#16A34A"
                        }
                      />
                      <span className="text-[13px] text-gray-500">
                        {data?.ratingsWithCount[rate + 1] || 0}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div
              className={`${showMoreReviewsBtn ? "h-[35rem]" : "h-full"} relative flex w-full flex-col overflow-hidden`}
            >
              {/* customer review */}
              {data?.reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="flex w-full flex-col items-start justify-start gap-y-3 border-b-[1.5px] p-2"
                >
                  <div>
                    <div className=" flex items-center  gap-x-2 text-xs text-gray-700">
                      <p
                        className={`${review?.rating == 1 ? "bg-red-400" : review?.rating == 2 ? "bg-orange-400" : "bg-green-600"}  rounded-sm px-[6px]  text-[0.65rem] text-white`}
                      >
                        {review?.rating}★
                      </p>
                      <p className="font-semibold">{review?.review_title}</p>
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs text-gray-800">
                      {review?.review_description}
                    </p>
                  </div>
                  {review?.images.length > 0 && (
                    <div className="thin-scrollbar flex h-16 w-full items-center justify-start gap-1 overflow-x-auto overflow-y-hidden">
                      {review?.images.map((img, i) => (
                        <div key={i} className="h-14 w-14">
                          <img
                            className="h-full w-full cursor-pointer object-contain"
                            src={img.url}
                            alt=""
                            onClick={() => handleOpenModal(i, review)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <dir className="flex gap-x-2 text-[13px] text-gray-500">
                    {(review?.user_id?.first_name ||
                      review?.user_id?.last_name) && (
                      <span>
                        {review?.user_id?.first_name}{" "}
                        {review?.user_id?.last_name}
                      </span>
                    )}
                    <span>
                      {moment(review?.created_at).format("MMM, YYYY")}
                    </span>
                  </dir>
                </div>
              ))}

              {showMoreReviewsBtn && (
                <div className="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-white to-transparent"></div>
              )}
            </div>
            {showMoreReviewsBtn && (
              <div
                className="w-full border-t-[1.5px] bg-white p-2 py-4 text-sm font-normal text-blue-500"
                onClick={() => setShowMoreReviewsBtn(false)}
              >
                <p className="inline-block cursor-pointer">Show more</p>
              </div>
            )}
          </div>
        ) : (
          <p className="p-2 text-sm text-gray-500">
            Be the first to review this product
          </p>
        )}
      </div>
    </>
  )
}

export default CustomerReview
