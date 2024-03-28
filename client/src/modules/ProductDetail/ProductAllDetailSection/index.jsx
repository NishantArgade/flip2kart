import BasicInfo from "./BasicInfo"
import CustomerReview from "./CustomerReview"
import Highlight from "./Highlight"
import OffersList from "./OffersList"
import Specification from "./Specification"

const ProductAllDetailSection = ({ data }) => {
  return (
    <>
      <BasicInfo data={data} />
      <OffersList offers={data?.offers} />
      <Highlight spotlight={data?.spotlight} product={data} />
      <Specification specifications={data?.specifications} />
      <CustomerReview product={data} />
    </>
  )
}

export default ProductAllDetailSection
