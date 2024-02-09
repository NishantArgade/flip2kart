import { Stepper } from "@mantine/core"
import { useState } from "react"
import CompleteStep from "./CompleteStep.jsx"
import DeliveryAddressStep from "./DeliveryAddressStep.jsx"
import LoginInfoStep from "./LoginInfoStep.jsx"
import OrderSummaryStep from "./OrderSummaryStep.jsx"
import PaymentStep from "./PaymentStep.jsx"

const PaymentStepper = () => {
  const [active, setActive] = useState(1)

  const nextStep = () =>
    setActive((current) => (current < 4 ? current + 1 : current))
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))

  const stepperStyleOption = {
    stepLabel: {
      fontSize: "0.7rem",
    },

    step: {
      padding: 0,
    },

    stepIcon: {
      borderWidth: 4,
      padding: "0.6rem",
    },

    separator: {
      marginLeft: 10,
      marginRight: 2,
      height: 3,
    },
  }

  return (
    <Stepper
      active={active}
      onStepClick={setActive}
      size={"16px"}
      className="text-xs"
      styles={stepperStyleOption}
    >
      <Stepper.Step label="LOGIN INFO">
        <LoginInfoStep nextStep={nextStep} />
      </Stepper.Step>
      <Stepper.Step label="DELIVERY ADDRESS">
        <DeliveryAddressStep prevStep={prevStep} nextStep={nextStep} />
      </Stepper.Step>
      <Stepper.Step label="ORDER SUMMARY">
        <OrderSummaryStep nextStep={nextStep} />
      </Stepper.Step>
      <Stepper.Step label="PAYMENT OPTIONS">
        <PaymentStep nextStep={nextStep} />
      </Stepper.Step>
      <Stepper.Completed>
        <CompleteStep />
      </Stepper.Completed>
    </Stepper>
  )
}

export default PaymentStepper
