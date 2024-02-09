import AmountInfo from "./AmountInfo"
import PaymentStepper from "./PaymentStepper"

const Checkout = () => {
  return (
    <div className="container m-2 mx-auto mb-14 grid min-h-screen grid-cols-12 gap-x-3 ">
      {/* Payment Step */}
      <section className="col-span-12 bg-white p-4  shadow-md md:col-span-8">
        <PaymentStepper />
      </section>

      {/* Amount info */}
      <section className="sticky  right-0 top-[4.4rem] col-span-12 h-fit text-sm md:col-span-4">
        <AmountInfo />
      </section>
    </div>
  )
}
//

export default Checkout
