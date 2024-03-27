import Skeleton from "react-loading-skeleton"
import AmountInfo from "./AmountInfo"
import PaymentStepper from "./PaymentStepper"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getCartProducts, getSingleProductBillData } from "../../api/cartApi"
import { useLocation } from "react-router-dom"
import SingleProductAmountInfo from "./SingleProductAmountInfo"

const Checkout = () => {
  const [active, setActive] = useState(1)
  const location = useLocation()
  const hasSearchParam = !!location.search

  const { data: cartData, isLoading } = useQuery({
    queryKey: ["cartProducts"],
    queryFn: getCartProducts,
    enabled: !hasSearchParam,
    staleTime: 0,
    refetchOnMount: true,
  })

  const { data: singleProductCartData, isLoading: isProductIsLoading } =
    useQuery({
      queryKey: ["singleProductCartProducts"],
      queryFn: async () =>
        await getSingleProductBillData(window.location.search),
      enabled: hasSearchParam,
      staleTime: 0,
      refetchOnMount: true,
    })

  if (isLoading || isProductIsLoading) {
    return (
      <div className="container m-2 mx-auto mb-14 grid min-h-screen grid-cols-12 gap-x-3 ">
        {/* Payment Step */}
        <section className="col-span-12 h-[80vh] bg-white p-4 shadow-md md:col-span-8">
          <Skeleton className="mx-auto mb-5" height={30} />
          {Array.from({ length: 5 }).map((item, i) => (
            <div className="w-full px-3 py-4" key={i}>
              <Skeleton className="my-1" height={16} width={400} />
              <Skeleton className="my-1" height={16} />
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
    )
  }

  return (
    <div className="container mx-auto  mb-5 grid min-h-screen grid-cols-12 gap-x-3 px-2 py-1 ">
      {/* Payment Step */}
      <section
        className={`${active === 4 ? "md:col-span-12" : "md:col-span-8"} col-span-12 bg-white p-4  shadow-md `}
      >
        <PaymentStepper
          cartData={hasSearchParam ? singleProductCartData : cartData}
          active={active}
          setActive={setActive}
          hasSearchParam={hasSearchParam}
        />
      </section>

      {/* Amount info */}
      {active !== 4 && (
        <section className="sticky  right-0 top-[4.4rem] col-span-12 h-fit text-sm md:col-span-4">
          <AmountInfo
            cartData={hasSearchParam ? singleProductCartData : cartData}
          />
        </section>
      )}
    </div>
  )
}

export default Checkout
