import { useParams } from "react-router-dom";
import MultiProductHCarousel from "../../components/MultiProductHCarousel/index.jsx";
import BasicInfo from "./BasicInfo.jsx";
import CustomerReview from "./CustomerReview.jsx";
import Highlight from "./Highlight.jsx";
import ImageCarousel from "./ImageCarousel/index.jsx";
import OffersList from "./OffersList.jsx";
import Specification from "./Specification.jsx";

const ProductDetail = () => {
  const { productId } = useParams();
  // console.log(params)

  return (
    <div>
      <div className="container mx-auto bg-red-20 w-full bg-white  grid grid-cols-12 object-center gap-x-3 m-2 ">
        {/** Image Carousel Section */}
        <div className="col-span-12 md:col-span-5 lg:col-span-4 h-fit shadow-md  md:sticky md:top-[4rem] md:left-0">
          <ImageCarousel />
        </div>

        {/** Product Details Section */}
        <div className="col-span-12 md:col-span-7 lg:col-span-8  shadow-md p-2 flex flex-col justify-start items-start gap-y-4 ">
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
  );
};

export default ProductDetail;
