import { useParams } from "react-router-dom"
import MultiProductHCarousel from "../../components/MultiProductHCarousel/index.jsx"
import BasicInfo from "./BasicInfo.jsx"
import CustomerReview from "./CustomerReview.jsx"
import Highlight from "./Highlight.jsx"
import ImageCarousel from "./ImageCarousel/index.jsx"
import OffersList from "./OffersList.jsx"
import Specification from "./Specification.jsx"

const ProductDetail = () => {
  const { productId } = useParams()
  // console.log(params)

  return (
    <div className="z-0">
      <div className="bg-red-20 container m-2 mx-auto grid  w-full grid-cols-12 gap-x-3 bg-white object-center ">
        {/** Image Carousel Section */}
        <div className="col-span-12 h-fit shadow-md md:sticky md:left-0  md:top-[4rem] md:col-span-5 lg:col-span-4">
          <ImageCarousel />
        </div>

        {/** Product Details Section */}
        <div className="col-span-12 flex flex-col  items-start justify-start gap-y-4 p-2 shadow-md md:col-span-7 lg:col-span-8 ">
          <BasicInfo />
          <OffersList />
          <Highlight />
          <Specification />
          <CustomerReview />
        </div>
      </div>

      {/** Recommonded Products / Similar Product Carousel Section */}
      <MultiProductHCarousel title="Suggested for you" />
    </div>
  )
}

export default ProductDetail
