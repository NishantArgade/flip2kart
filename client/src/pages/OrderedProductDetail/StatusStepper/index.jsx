import { Stepper } from "stepper-react"

const steps = [
  {
    topLabel: "Order Placed",
    bottomLabel: "Mon, 1st Nov",
    content: `Your order has been received and is being processed.`,
  },
  {
    topLabel: "Payment Confirmed",
    bottomLabel: "Mon, 1st Nov",
    content: `Your payment has been confirmed. Thank you for your purchase.`,
  },
  {
    topLabel: "In Transit",
    bottomLabel: "Tue, 2nd Nov",
    content: "Your order is in transit. It's on its way to you.",
  },
  {
    topLabel: "Delivered",
    bottomLabel: "Thu, 4th Nov",
    content: "Your order has been delivered. Enjoy your purchase!",
  },
]

const StatusStepper = () => {
  return (
    <>
      <Stepper steps={steps} activeStep={2} />
    </>
  )
}

export default StatusStepper
