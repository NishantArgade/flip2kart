import { useParams } from "react-router-dom"
import MultiProductHCarousel from "../../components/MultiProductHCarousel/index.jsx"
import ProductAllDetailSection from "./ProductAllDetailSection/index.jsx"
import ProductImgCarousel from "./ProductImgCarousel"

const ProductDetail = () => {
  const { productId } = useParams()
  // console.log(params)

  return (
    <>
      <div className="bg-red-20 container m-2 mx-auto grid  w-full grid-cols-12 gap-x-3 bg-white object-center ">
        {/** Image Carousel Section */}
        <section className="col-span-12 h-fit shadow-md md:sticky md:left-0  md:top-[4rem] md:col-span-5 lg:col-span-4">
          <ProductImgCarousel />
        </section>

        {/** Product Details Section */}
        <section className="col-span-12 flex flex-col  items-start justify-start gap-y-4 p-2 shadow-md md:col-span-7 lg:col-span-8 ">
          <ProductAllDetailSection />
        </section>
      </div>

      {/** Recommonded Products / Similar Product Carousel Section */}
      <section>
        <MultiProductHCarousel title="Suggested for you" />
      </section>
    </>
  )
}

export default ProductDetail
