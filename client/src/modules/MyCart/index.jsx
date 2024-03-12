import Skeleton from "react-loading-skeleton"
import AmountDetails from "./AmountDetails"
import CartEmptyPage from "./CartEmptyPage"
import ProductList from "./ProductList"
import { useQuery } from "@tanstack/react-query"
import { getCartProducts } from "../../api/cartApi"

const MyCart = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["cartProducts"],
    queryFn: getCartProducts,
  })

  if (!isLoading && data?.cart.length === 0) {
    return <CartEmptyPage />
  }

  return (
    <div className="min-h-screen">
      {!isLoading ? (
        <div className="container mx-auto mb-5 grid grid-cols-12 gap-x-3  px-2 py-1  md:relative">
          {/* Add to cart Product Listing */}
          <section className="col-span-12 md:col-span-8">
            <ProductList cartData={data?.cart} />
          </section>

          {/*Product Amount info */}
          <section className="col-span-12 h-fit  text-sm md:sticky md:right-0 md:top-[4.4rem] md:col-span-4">
            <AmountDetails cartData={data} />
          </section>
        </div>
      ) : (
        <div className="container mx-auto mb-14 grid min-h-screen grid-cols-12 gap-x-3 px-2 py-1 ">
          {/* Payment Step */}
          <section className="col-span-12 h-[80vh] bg-white p-4 pt-8 shadow-md md:col-span-8">
            {Array.from({ length: 4 }).map((item, i) => (
              <div key={i} className="flex items-center pb-4">
                <Skeleton className="my-1" height={100} width={100} />
                <div className="w-full px-3 py-3">
                  <Skeleton className="my-1" height={16} />
                  <Skeleton className="my-1" height={16} width={600} />
                  <Skeleton className="my-1" height={16} width={100} />
                </div>
              </div>
            ))}
          </section>

          {/* Amount info */}
          <section className="sticky  right-0 top-[4.4rem] col-span-12 h-[20rem] bg-white  text-sm md:col-span-4">
            <div className="pt-8">
              {Array.from({ length: 5 }).map((item, i) => (
                <div className="px-3 py-2" key={i}>
                  <Skeleton className="my-1" height={16} />
                </div>
              ))}
            </div>
            <div className="mt-5 px-3">
              <Skeleton className="float-end my-1 " height={16} width={140} />
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
//

export default MyCart
