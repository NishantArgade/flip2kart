import { useParams } from "react-router-dom"
import HorizontalProductCarousel from "../../components/HorizontalProductCarousel/index.jsx"
import ProductAllDetailSection from "./ProductAllDetailSection/index.jsx"
import ProductImgCarousel from "./ProductImgCarousel"
import Spinner from "../../components/Spinner.jsx"
import { useQuery } from "@tanstack/react-query"
import { getProductDetailByID } from "../../api/productApi.js"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const ProductDetail = () => {
  const { productId } = useParams()
  const [isFav, setIsFav] = useState(false)
  const [selectedImgIndex, setSelectedImgIndex] = useState(0)

  const { data, isLoading } = useQuery({
    queryKey: ["productDetail" + productId],
    queryFn: async () => await getProductDetailByID(productId),
  })

  const user = useSelector((state) => state.user.data)

  useEffect(() => {
    if (user?.wishlist?.includes(productId)) setIsFav(true)
    else setIsFav(false)
  }, [user, productId])

  useEffect(() => {
    setSelectedImgIndex(0)
  }, [productId])

  return (
    <>
      <>
        {!isLoading ? (
          <div className="bg-red-20 container m-2 mx-auto grid  w-full grid-cols-12 gap-x-3 bg-white object-center ">
            {/** Image Carousel Section */}
            <section className="col-span-12 h-fit shadow-md md:sticky md:left-0  md:top-[4rem] md:col-span-5 lg:col-span-4">
              <ProductImgCarousel
                product={data?.product}
                images={data?.product?.images || []}
                isFav={isFav}
                selectedImgIndex={selectedImgIndex}
                setSelectedImgIndex={setSelectedImgIndex}
                isInStock={data?.product?.stock > 0}
              />
            </section>

            {/** Product Details Section */}
            <section className="col-span-12 flex flex-col  items-start justify-start gap-y-4 p-2 shadow-md md:col-span-7 lg:col-span-8 ">
              <ProductAllDetailSection data={data?.product || {}} />
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
        <HorizontalProductCarousel
          title="Similar products"
          products={data?.similarProducts}
        />
      </section>
    </>
  )
}

export default ProductDetail
