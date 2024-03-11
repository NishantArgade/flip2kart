import Skeleton from "react-loading-skeleton"
import AmountInfo from "./AmountInfo"
import PaymentStepper from "./PaymentStepper"

const Checkout = () => {
  const isLoading = true
  return (
    <>
      {isLoading ? (
        <div className="container mx-auto  mb-5 grid min-h-screen grid-cols-12 gap-x-3 px-2 py-1 ">
          {/* Payment Step */}
          <section className="col-span-12 bg-white p-4  shadow-md md:col-span-8">
            <PaymentStepper />
          </section>

          {/* Amount info */}
          <section className="sticky  right-0 top-[4.4rem] col-span-12 h-fit text-sm md:col-span-4">
            <AmountInfo />
          </section>
        </div>
      ) : (
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
      )}
    </>
  )
}
//

export default Checkout
