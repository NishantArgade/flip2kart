import { useParams } from "react-router-dom";
import MultiProductHCarousel from "../../components/MultiProductHCarousel/index.jsx";
import BasicInfo from "./BasicInfo.jsx";
import CustomerReview from "./CustomerReview.jsx";
import Highlight from "./Highlight.jsx";
import OffersList from "./OffersList.jsx";
import ProductImageContainer from "./ProductImageContainer.jsx";
import Specification from "./Specification.jsx";

const ProductDetail = () => {
  const { productId } = useParams();
  // console.log(params)

  return (
    <div>
      <div className="container mx-auto bg-red-20 w-full  grid grid-cols-12 object-center gap-x-2 m-2 ">
        {/** Image Carousel Section */}
        <div className="col-span-12 md:col-span-4 bg-white md:h-fit pb-4 relative md:sticky md:top-[4.6rem] md:left-0 shadow-md">
          <ProductImageContainer />
        </div>

        {/** Product Details Section */}
        <div className="col-span-12 md:col-span-8 bg-white shadow-md p-2 flex flex-col justify-start items-start gap-y-4 ">
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
