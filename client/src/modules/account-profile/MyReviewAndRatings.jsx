import { Link } from "react-router-dom"
import Spinner from "../../components/Spinner"
import { useMutation, useQuery } from "@tanstack/react-query"
import {
  deleteReview,
  myAllReviewAndRatings,
} from "../../api/ratingAndReviewApi"
import moment from "moment"
import DeleteReviewPopover from "./components/DeleteReviewPopover"
import { queryClient } from "../../main"

const MyReviewAndRatings = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["myAllReviewAndRatings"],
    queryFn: myAllReviewAndRatings,
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteReview"],
    mutationFn: deleteReview,
    onSuccess: () => queryClient.invalidateQueries("myAllReviewAndRatings"),
  })

  if (isLoading)
    return (
      <div className="flex h-3/4 items-center justify-center ">
        <Spinner />
      </div>
    )

  return (
    <>
      {data?.myAllRviewsAndRatings.length > 0 ? (
        <div>
          <p className="border-b-[1.5px] px-4 py-4">
            My Review{" "}
            <span className="text-gray-500">
              ({data?.myAllRviewsAndRatings.length})
            </span>
          </p>
          <div>
            {data?.myAllRviewsAndRatings?.map((review, i) => (
              <div
                key={i}
                className="flex w-full items-start justify-between border-b-[1.5px]  px-4 py-5"
              >
                <div className="flex items-start justify-start gap-x-3">
                  <div className="h-20 w-20 p-1">
                    <img
                      src={review?.product_id?.images[0].url}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="text-sm">
                    <p className="line-clamp-1 text-xs text-gray-500">
                      {review?.product_id?.name}
                    </p>
                    <div className="mt-2 text-xs text-gray-700">
                      <span className="mr-2 rounded-sm bg-green-600 px-1 py-[2px] text-white">
                        {review?.rating}★
                      </span>
                      <span className="font-semibold text-gray-800">
                        {review?.review_title}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-gray-800">
                      {review?.review_description}
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      {review?.user_id?.first_name} {review?.user_id?.last_name}{" "}
                      <span>
                        {moment(review?.created_at).format("DD MMM, YYYY")}
                      </span>
                    </p>

                    <div className="mt-2 flex items-center ">
                      <Link
                        to={`/rate-product/${review?.product_id?._id}`}
                        className="mr-6 text-xs font-semibold text-blue-500"
                      >
                        Edit
                      </Link>
                      <DeleteReviewPopover
                        deleteItemName="Review"
                        item={review}
                        mutate={mutate}
                        isPending={isPending}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <img src="/notFound.png" alt="" />
            <p className="mt-5 text-lg font-normal">No Reviews & Ratings</p>
            <p className="text-xs font-normal">
              You have not rated or reviewed any product yet!
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default MyReviewAndRatings
