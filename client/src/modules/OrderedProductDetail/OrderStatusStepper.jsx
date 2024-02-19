import { Stepper } from "stepper-react"

const steps = [
  {
    topLabel: "Order Confirmed",
    bottomLabel: "Mon, 1st Nov",
    content: `Your order has been received and is being processed.`,
  },
  {
    topLabel: "Shipped",
    bottomLabel: "Mon, 1st Nov",
    content: `Your payment has been confirmed. Thank you for your purchase.`,
  },
  {
    topLabel: "Out for delivery",
    bottomLabel: "Tue, 2nd Nov",
    content: "Your order is in transit. It's on its way to you.",
  },
  {
    topLabel: "Delivered",
    bottomLabel: "Thu, 4th Nov",
    content: "Your order has been delivered. Enjoy your purchase!",
  },
]

const OrderStatusStepper = () => {
  return <Stepper steps={steps} activeStep={2} />
}

export default OrderStatusStepper
