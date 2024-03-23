import { PDFDownloadLink } from "@react-pdf/renderer"
import { BsQuestionSquareFill } from "react-icons/bs"
import { IoMdArrowRoundBack } from "react-icons/io"
import { IoDocumentText } from "react-icons/io5"
import { Link, useLocation, useNavigate } from "react-router-dom"
import InvoicePDF from "./InvoicePdf"
import OrderStatusStepper from "./OrderStatusStepper"
import Skeleton from "react-loading-skeleton"
import { useQuery } from "@tanstack/react-query"
import { getOrderByOrderIDAndProductID } from "../../api/orderApi"
import moment from "moment"
import { useEffect } from "react"

const OrderedProductDetail = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ["getOrderByOrderIDAndProductID", location.search],
    queryFn: async () => await getOrderByOrderIDAndProductID(location.search),
  })

  console.log(data?.order)
  console.log(data?.product?.order_status_history)

  const steps = [
    {
      topLabel: "Order Confirmed",
      bottomLabel: "",
      content: `Your order has been received and is being processed.`,
    },
    {
      topLabel: "Shipped",
      bottomLabel: "",
      content: `Your payment has been confirmed. Thank you for your purchase.`,
    },
    {
      topLabel: "Out for delivery",
      bottomLabel: "",
      content: "Your order is in transit. It's on its way to you.",
    },
    {
      topLabel: "Delivered",
      bottomLabel: "",
      content: "Your order has been delivered. Enjoy your purchase!",
    },
  ]

  const statusToStepIndex = {
    "Order Confirmed": 0,
    Shipped: 1,
    "Out for delivery": 2,
    Delivered: 3,
  }

  let lastStatusIndex = 0

  data?.product?.order_status_history.forEach((o) => {
    const stepIndex = statusToStepIndex[o.status]

    if (stepIndex > lastStatusIndex) lastStatusIndex = stepIndex

    if (stepIndex !== undefined) {
      steps[stepIndex].bottomLabel = moment(o.date).format("ddd, Do MMM")
    }
  })

  return (
    <div className="container mx-auto min-h-screen">
      {/** Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-x-2 px-1 py-2 text-gray-500"
      >
        <IoMdArrowRoundBack />
        <p className="text-xs">Back</p>
      </button>

      {/** Product Order Detail */}
      <div className="grid grid-cols-1 bg-white text-xs  shadow-md md:grid-cols-12 ">
        {!isLoading ? (
          <div className="col-span-1 flex flex-col items-start justify-start gap-y-2 border-r-[1px] p-4   md:col-span-7">
            <p className="text-sm">Delivery Address</p>
            <p className="font-semibold">{data?.order?.shipping_to_user}</p>
            <p className="font-light">{data?.order?.shipping_address}</p>
            <span className="flex items-center justify-start gap-2">
              <p className="font-semibold">Phone Number</p>
              <p>{data?.order?.shipping_user_phone}</p>
            </span>
          </div>
        ) : (
          <div className="col-span-1 flex flex-col items-start justify-start gap-y-2 border-r-[1px] p-4   md:col-span-7">
            <Skeleton width={140} />
            <Skeleton width={140} />
            <Skeleton width={800} />

            <Skeleton width={400} />
          </div>
        )}
        {!isLoading ? (
          <div className="col-span-1 flex flex-col gap-y-2 p-4  md:col-span-5">
            <p className="text-sm">More Action</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-sm bg-[#FFB000] p-1 text-white ">
                  <IoDocumentText />
                </div>
                <p className="text-gray-500">Download Invoice</p>
              </div>
              <PDFDownloadLink
                document={<InvoicePDF data={data} />}
                fileName="Order Invoice.pdf"
              >
                {({ loading, error }) => (
                  <button className="rounded-sm border-[1.5px] px-6 py-1 text-[0.66rem] font-medium text-blue-500">
                    {error ? "Try Again" : loading ? "Loading..." : "Download"}
                  </button>
                )}
              </PDFDownloadLink>
            </div>
          </div>
        ) : (
          <div className="col-span-1 flex flex-col gap-y-2 p-4  md:col-span-5">
            <Skeleton width={150} className="mt-2" />
            <div className="mt-1 flex justify-between">
              <Skeleton width={200} />
              <Skeleton width={150} />
            </div>
          </div>
        )}
      </div>

      {/** Product Card */}
      {!isLoading ? (
        <div className="gap- my-4 flex flex-col items-start justify-between bg-white px-4 py-5 shadow-md  lg:flex-row">
          {/** Product Detail */}
          <div className="flex items-start justify-start gap-x-2 ">
            <Link
              to={`/product-detail/${data?.product?.product_id}`}
              className="h-20 w-20 cursor-pointer rounded-sm border border-gray-200 p-1"
            >
              <img
                src={
                  data?.product.images.length > 0 && data?.product.images[0].url
                }
                alt=""
                className="h-full w-full object-contain"
              />
            </Link>

            <div className="w-full text-sm md:w-[16rem] ">
              <Link
                to={`/product-detail/${data?.product?.product_id}`}
                className="line-clamp-1 cursor-pointer text-gray-800 hover:text-blue-500"
              >
                {data?.product?.name}
              </Link>
              <p className=" mt-1 line-clamp-2 text-xs text-gray-500">
                {data?.product?.description}
              </p>
              <p className=" mt-2 text-xs text-gray-500">
                <span>Seller: </span>
                <span> {data?.product?.seller}</span>
              </p>
              <p className="mb-6 mt-2 text-sm font-semibold text-gray-800 md:mb-0">
                ₹{data?.product?.price - data?.product?.discount}
              </p>
            </div>
          </div>
          <div>
            <OrderStatusStepper
              steps={steps}
              activeStep={lastStatusIndex + 1}
            />
          </div>
          {/** Need Help Button  */}
          <Link
            to="/chatboat-support"
            className="flex  items-center justify-center gap-x-2 text-blue-500"
          >
            <BsQuestionSquareFill size={19} />
            <p className="text-sm"> Need Help?</p>
          </Link>
        </div>
      ) : (
        <div className="gap- my-4 flex flex-col items-start justify-between bg-white px-4 py-5 shadow-md  lg:flex-row">
          <div className="flex gap-4">
            <Skeleton width={80} height={80} />
            <div>
              <Skeleton width={200} height={16} />
              <Skeleton width={350} height={16} />
              <Skeleton width={200} height={16} />
              <Skeleton width={100} height={16} />
            </div>
          </div>
          <div>
            <Skeleton width={600} height={16} />
            <Skeleton width={600} height={16} />
          </div>
          <Skeleton width={150} height={16} />
        </div>
      )}
    </div>
  )
}

export default OrderedProductDetail
