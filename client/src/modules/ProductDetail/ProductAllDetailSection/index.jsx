import React from "react"
import BasicInfo from "./BasicInfo"
import CustomerReview from "./CustomerReview"
import Highlight from "./Highlight"
import OffersList from "./OffersList"
import Specification from "./Specification"
import { getProductReviewDetails } from "../../../api/ratingAndReviewApi"
import { useQuery } from "@tanstack/react-query"

const ProductAllDetailSection = ({ data }) => {
  const { data: response } = useQuery({
    queryKey: ["productRatingAndReviewDetails" + data?._id],
    queryFn: async () => await getProductReviewDetails(data?._id),
  })

  return (
    <>
      <BasicInfo data={data} reviewData={response?.data} />
      <OffersList offers={data?.offers} />
      <Highlight spotlight={data?.spotlight} product={data} />
      <Specification specifications={data?.specifications} />
      <CustomerReview
        reviews={data?.reviews}
        product={data}
        data={response?.data}
      />
    </>
  )
}

export default ProductAllDetailSection
