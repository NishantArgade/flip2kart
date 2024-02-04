import React from "react"
import BasicInfo from "./BasicInfo"
import CustomerReview from "./CustomerReview"
import Highlight from "./Highlight"
import OffersList from "./OffersList"
import Specification from "./Specification"

const ProductAllDetailSection = () => {
  return (
    <>
      <BasicInfo />
      <OffersList />
      <Highlight />
      <Specification />
      <CustomerReview />
    </>
  )
}

export default ProductAllDetailSection
