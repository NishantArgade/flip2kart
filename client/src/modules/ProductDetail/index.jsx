import { useParams } from "react-router-dom"
import HorizontalProductCarousel from "../../components/HorizontalProductCarousel/index.jsx"
import ProductAllDetailSection from "./ProductAllDetailSection/index.jsx"
import ProductImgCarousel from "./ProductImgCarousel"
import Spinner from "../../components/Spinner.jsx"

const ProductDetail = () => {
  const { productId } = useParams()
  // console.log(params)
  const isLoading = true

  return (
    <>
      <>
        {isLoading ? (
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
        ) : (
          <div className="container mx-auto flex h-screen items-center justify-center bg-white shadow-md">
            <Spinner />
          </div>
        )}
      </>

      {/** Recommonded Products / Similar Product Carousel Section */}
      <section>
        <HorizontalProductCarousel title="Suggested for you" />
      </section>
    </>
  )
}

export default ProductDetail
