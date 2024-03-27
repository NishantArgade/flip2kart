import { Accordion, Avatar, Group, Text } from "@mantine/core"
import Spinner from "../../../components/Spinner"
import {
  createOrder,
  getPaymentData,
  saveOrder,
  validateOrder,
} from "../../../api/orderApi"
import { toast } from "../../../utils/toast"
import { useState } from "react"
import { useSelector } from "react-redux"
import moment from "moment"

export default function PaymentStep({
  nextStep,
  cartData,
  paymentData,
  setPaymentData,
}) {
  const [loading, setLoading] = useState(false)
  const user = useSelector((state) => state.user.data)

  async function handleCreateOrder(e) {
    const amount = cartData?.finalTotalAmount * 10
    const currency = "INR"
    const receipt = "TXN" + Date.now()

    setLoading(true)
    const order = await createOrder({
      amount,
      currency,
      receipt,
    })
    const options = {
      key: import.meta.env.VITE_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: currency,
      name: user?.first_name + " " + user?.last_name,
      description: "Test Transaction",
      image: "/avatar-placeholder.png",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        try {
          await validateOrder({ ...response, cartData })
          const res = await getPaymentData(response.razorpay_payment_id)

          const payload = {
            payment: {
              transaction_id: res.data.id,
              status: res.data.status,
              method: res.data.method,
              date: moment.unix(res.data.created_at).toDate(),
            },
            shipping_charges: cartData?.isDeliveryFree
              ? 0
              : cartData?.totalDeliveryCharges,
            packing_charges: cartData?.packagingFee,
            total_price: cartData?.finalTotalAmount,
          }

          setPaymentData((prev) => ({
            ...prev,
            ...payload,
          }))

          await saveOrder({ ...paymentData, ...payload })

          nextStep()
        } catch (error) {
          toast.error("error")
        } finally {
          setLoading(false)
        }
      },
      prefill: {
        name: user?.first_name + " " + user?.last_name,
        email: user?.email,
        contact: user?.mobile,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    }
    const rzp1 = new window.Razorpay(options)
    rzp1.on("payment.failed", async function (response) {
      const paymentId = response.error.metadata.payment_id
      const res = await getPaymentData(paymentId)

      const payload = {
        payment: {
          transaction_id: res.data.id,
          status: res.data.status,
          method: res.data.method,
          date: moment.unix(res.data.created_at).toDate(),
        },
        shipping_charges: cartData?.isDeliveryFree
          ? 0
          : cartData?.totalDeliveryCharges,
        packing_charges: cartData?.packagingFee,
        total_price: cartData?.finalTotalAmount,
      }

      setPaymentData((prev) => ({
        ...prev,
        ...payload,
      }))

      await saveOrder({ ...paymentData, ...payload })

      nextStep()
      setLoading(false)
    })

    rzp1.open()
    setTimeout(() => {
      setLoading(false)
    }, 5000)
    e.preventDefault()
  }

  return (
    <>
      {!loading ? (
        <div className="h-screen w-full ">
          <div className="flex h-1/2 items-center justify-center">
            <button
              className="rounded-sm  bg-blue-500 px-8 py-2 text-base uppercase text-white shadow-md hover:bg-blue-600"
              onClick={handleCreateOrder}
            >
              Pay Now
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-[25rem] items-center justify-center">
          <Spinner />
        </div>
      )}
    </>
  )
}
