import { PDFDownloadLink } from "@react-pdf/renderer"
import { BsQuestionSquareFill } from "react-icons/bs"
import { IoMdArrowRoundBack } from "react-icons/io"
import { IoDocumentText } from "react-icons/io5"
import { Link, useParams } from "react-router-dom"
import InvoicePDF from "./InvoicePdf"
import OrderStatusStepper from "./OrderStatusStepper"
import Skeleton from "react-loading-skeleton"

const OrderedProductDetail = () => {
  const { orderId } = useParams()

  const isLoading = true

  return (
    <div className="container mx-auto min-h-screen">
      {/** Go Back Button */}
      <Link
        to="/my-orders"
        className="flex items-center gap-x-2 px-1 py-2 text-gray-500"
      >
        <IoMdArrowRoundBack />
        <p className="text-xs">Back</p>
      </Link>

      {/** Product Order Detail */}
      <div className="grid grid-cols-1 bg-white text-xs  shadow-md md:grid-cols-12 ">
        {isLoading ? (
          <div className="col-span-1 flex flex-col items-start justify-start gap-y-2 border-r-[1px] p-4   md:col-span-7">
            <p className="text-sm">Delivery Address</p>
            <p className="font-semibold">Nishant Argade</p>
            <p className="font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestias, quidem. sdfdsf sdfsdf asdfds fds asdf
            </p>
            <span className="flex items-center justify-start gap-2">
              <p className="font-semibold">Phone Number</p>
              <p>8007896396</p>
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
        {isLoading ? (
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
                document={<InvoicePDF />}
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
      {isLoading ? (
        <div className="gap- my-4 flex flex-col items-start justify-between bg-white px-4 py-5 shadow-md  lg:flex-row">
          {/** Product Detail */}
          <div className="flex items-start justify-start gap-x-2 ">
            <Link
              to={"/product-detail/1"}
              className="w-20 cursor-pointer px-3 pt-1"
            >
              <img src="/shirt.png" alt="" />
            </Link>

            <div className="w-full text-sm md:w-[16rem] ">
              <Link
                to={"/product-detail/1"}
                className="cursor-pointer text-gray-800 hover:text-blue-500"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Link>
              <p className=" mt-1 text-xs text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
              </p>
              <p className=" mt-2 text-xs text-gray-500">
                <span>Seller: </span>
                <span> Amenora mall</span>
              </p>
              <p className="mb-6 mt-2 text-sm font-semibold text-gray-800 md:mb-0">
                ₹2,000
              </p>
            </div>
          </div>
          <div>
            <OrderStatusStepper />
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
