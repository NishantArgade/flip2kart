import { Stepper } from "stepper-react"

const OrderStatusStepper = ({ steps, activeStep }) => {
  return <Stepper steps={steps} activeStep={activeStep} />
}

export default OrderStatusStepper
