import { PDFDownloadLink } from "@react-pdf/renderer"
import { IoMdArrowRoundBack } from "react-icons/io"
import { IoDocumentText } from "react-icons/io5"
import { Link, useLocation, useNavigate } from "react-router-dom"
import InvoicePDF from "./InvoicePdf"
import OrderStatusStepper from "./OrderStatusStepper"
import Skeleton from "react-loading-skeleton"
import { useMutation, useQuery } from "@tanstack/react-query"
import {
  changeStatusOfDelivery,
  getOrderByOrderIDAndProductID,
} from "../../api/orderApi"
import moment from "moment"
import { useMemo } from "react"
import { IoIosCloseCircle } from "react-icons/io"
import { TbArrowBackUp } from "react-icons/tb"
import { IoMdStar } from "react-icons/io"
import ModalComponent from "./components/Modal"
import { useDisclosure } from "@mantine/hooks"
import { queryClient } from "../../main"
import { HiQuestionMarkCircle } from "react-icons/hi2"
import {
  CANCELLED,
  DELIVERED,
  ORDER_CONFIRMED,
  OUT_FOR_DELIVERY,
  RETURNED,
  SHIPPED,
} from "../../utils/constants"

const OrderedProductDetail = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const [opened, { open, close }] = useDisclosure(false)

  const { data, isLoading } = useQuery({
    queryKey: ["getOrderByOrderIDAndProductID", location.search],
    queryFn: async () => await getOrderByOrderIDAndProductID(location.search),
  })

  let steps = [
    {
      topLabel: ORDER_CONFIRMED,
      content: `Your order has been received and is being processed.`,
    },
    {
      topLabel: SHIPPED,
      content: `Your payment has been confirmed. Thank you for your purchase.`,
    },
    {
      topLabel: OUT_FOR_DELIVERY,
      content: "Your order is in transit. It's on its way to you.",
    },
    {
      topLabel: DELIVERED,
      content: "Your order has been delivered. Enjoy your purchase!",
    },
    { topLabel: CANCELLED, content: "Your order has been cancelled." },
    { topLabel: RETURNED, content: "Your order has been returned." },
  ]

  const statusToStepIndex = {
    [ORDER_CONFIRMED]: 0,
    [SHIPPED]: 1,
    [OUT_FOR_DELIVERY]: 2,
    [DELIVERED]: 3,
    [CANCELLED]: 4,
    [RETURNED]: 5,
  }

  let lastStatusIndex =
    statusToStepIndex[data?.product?.latest_order_status?.status] || 0

  const p = data?.product?.order_status_history || []
  p.forEach((o) => {
    const stepIndex = statusToStepIndex[o.status]
    if (stepIndex !== undefined) {
      steps[stepIndex].bottomLabel = moment(o.date).format("ddd, Do MMM")
      // lastStatusIndex = Math.max(lastStatusIndex, stepIndex)
    }
  })

  if (
    [ORDER_CONFIRMED, SHIPPED, OUT_FOR_DELIVERY, DELIVERED].includes(
      data?.product?.latest_order_status?.status
    )
  ) {
    steps = steps.slice(0, 4)
  } else {
    steps = [steps[0], steps[lastStatusIndex]]
  }

  const shouldReturnItem = useMemo(() => {
    return moment(data?.order?.created_at).add(7, "days").toDate() >= new Date()
  }, [data?.order?.created_at])

  const getDeliveryStatus = useMemo(() => {
    let hasCrossedPriviousExpectedDate = false
    let formattedDate

    const deliveryDate = moment(data?.order?.created_at).add(
      data?.product?.delivery_estimate_days,
      "days"
    )

    if (
      deliveryDate.startOf("day").toDate() < moment().startOf("day").toDate()
    ) {
      hasCrossedPriviousExpectedDate = true
    }

    if (deliveryDate.isSame(moment(), "day")) {
      formattedDate = "today"
    } else if (deliveryDate.isSame(moment().add(1, "day"), "day")) {
      formattedDate = "tomorrow"
    } else {
      formattedDate = deliveryDate.format("ddd, MMM DD")
    }

    return { formattedDate, hasCrossedPriviousExpectedDate }
  }, [data])

  const { mutate: mutateCancelOrder, isPending: isPendingCancelOrder } =
    useMutation({
      mutationKey: "changeStatusOfDelivery",
      mutationFn: changeStatusOfDelivery,
      onSuccess: () => {
        queryClient.invalidateQueries("getOrderByOrderIDAndProductID")
        close()
      },
    })
  return (
    <>
      <div className="container mx-auto min-h-screen">
        {/** Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-x-1 py-2 text-gray-500"
        >
          <IoMdArrowRoundBack />
          <p className="text-xs">Back</p>
        </button>

        {/** Product Order Detail */}
        <div className="grid grid-cols-1 bg-white text-xs  shadow-md md:grid-cols-12 ">
          {!isLoading ? (
            <div className="col-span-1 flex flex-col items-start justify-start gap-y-2 p-4   md:col-span-7">
              <p className="text-sm">Delivery Address</p>
              <p className="font-semibold">{data?.order?.shipping_to_user}</p>
              <p className="font-light">{data?.order?.shipping_address}</p>
              <span className="flex items-center justify-start gap-2">
                {data?.order?.shipping_user_phone && (
                  <p className="font-semibold">Phone Number</p>
                )}
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
            [
              ORDER_CONFIRMED,
              SHIPPED,
              OUT_FOR_DELIVERY,
              DELIVERED,
              RETURNED,
            ].includes(data?.product?.latest_order_status?.status) && (
              <div className="col-span-1 flex flex-col gap-y-2 border-l-[1px]  p-4 md:col-span-5">
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
                      <button
                        disabled={loading}
                        className={`${loading ? "opacity-50" : ""} rounded-sm border-[1.5px] px-6 py-1 text-[0.66rem] font-medium text-blue-500`}
                      >
                        {error ? "Try Again" : "Download"}
                      </button>
                    )}
                  </PDFDownloadLink>
                </div>
              </div>
            )
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
                    data?.product.images.length > 0 &&
                    data?.product.images[0].url
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
                <div className="flex items-center gap-2">
                  <p className="mb-6 mt-2 text-sm font-semibold text-gray-800 md:mb-0">
                    ₹{data?.product?.price - data?.product?.discount}
                  </p>
                  <p className="mb-6 mt-2 text-xs  text-gray-500 md:mb-0">
                    quantity: {data?.product?.quantity}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <OrderStatusStepper
                steps={steps}
                activeStep={lastStatusIndex + 1}
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-y-1">
              {[ORDER_CONFIRMED, SHIPPED, OUT_FOR_DELIVERY].includes(
                data?.product?.latest_order_status?.status
              ) && (
                <>
                  <p
                    className={` ${getDeliveryStatus?.hasCrossedPriviousExpectedDate ? "line-through" : " mb-3 "} text-xs text-gray-500`}
                  >
                    Delivery expected by {getDeliveryStatus?.formattedDate}
                  </p>
                  {getDeliveryStatus?.hasCrossedPriviousExpectedDate && (
                    <p className={`mb-3 text-xs text-gray-500`}>
                      Delivery expected by{" "}
                      {moment().add(2, "days").format("ddd, MMM DD")}
                    </p>
                  )}
                </>
              )}

              {shouldReturnItem &&
                data?.product?.latest_order_status?.status === DELIVERED && (
                  <ModalComponent
                    title={"Return Order"}
                    body={"Are you sure you want to return this order? "}
                    mutate={mutateCancelOrder}
                    isPending={isPendingCancelOrder}
                    item={{
                      orderId: params.get("order"),
                      productId: params.get("product"),
                      status: RETURNED,
                    }}
                    opened={opened}
                    close={close}
                    open={open}
                  >
                    <div className="flex gap-x-1 text-blue-500">
                      <TbArrowBackUp size={19} />
                      <p className="text-xs">Return Order</p>
                    </div>
                  </ModalComponent>
                )}

              {[ORDER_CONFIRMED, SHIPPED, OUT_FOR_DELIVERY].includes(
                data?.product?.latest_order_status?.status
              ) && (
                <ModalComponent
                  title={"Cancel Order"}
                  body={"Are you sure you want to cancel this order? "}
                  mutate={mutateCancelOrder}
                  isPending={isPendingCancelOrder}
                  item={{
                    orderId: params.get("order"),
                    productId: params.get("product"),
                    status: CANCELLED,
                  }}
                  opened={opened}
                  close={close}
                  open={open}
                >
                  <div className="flex gap-x-1 text-blue-500">
                    <IoIosCloseCircle size={18} />
                    <p className="text-xs">Cancel Order</p>
                  </div>
                </ModalComponent>
              )}

              {[DELIVERED, RETURNED].includes(
                data?.product?.latest_order_status?.status
              ) && (
                <Link
                  to={`/rate-product/${data?.product?.product_id}`}
                  className="flex gap-x-1 text-blue-500"
                >
                  <IoMdStar size={19} />
                  <p className="text-xs">Rate & Review Product</p>
                </Link>
              )}

              <a
                href="https://mediafiles.botpress.cloud/6700e9bb-e1ed-41b3-a6ce-38e6bbaedc8d/webchat/bot.html"
                className="flex  gap-x-1 text-blue-500"
                target="_blank"
                rel="noreferrer"
              >
                <HiQuestionMarkCircle size={18} />
                <p className="text-xs">Need Help?</p>
              </a>
            </div>
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
    </>
  )
}

export default OrderedProductDetail
