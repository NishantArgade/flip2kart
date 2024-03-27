import { Stepper } from "@mantine/core"
import { useEffect, useState } from "react"
import CompleteStep from "./CompleteStep.jsx"
import DeliveryAddressStep from "./DeliveryAddressStep.jsx"
import LoginInfoStep from "./LoginInfoStep.jsx"
import OrderSummaryStep from "./OrderSummaryStep.jsx"
import PaymentStep from "./PaymentStep.jsx"
import { useSelector } from "react-redux"

const PaymentStepper = ({ cartData, active, setActive, hasSearchParam }) => {
  const [paymentData, setPaymentData] = useState({})
  const user = useSelector((state) => state.user.data)

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

  useEffect(() => {
    window.onbeforeunload = () => {
      return ""
    }

    return () => {
      window.onbeforeunload = null
    }
  }, [])

  useEffect(() => {
    setPaymentData((prev) => ({
      ...prev,
      billing_user: user?.first_name + " " + user?.last_name,
      billing_user_id: user?._id,
    }))
  }, [user])

  return (
    <Stepper
      active={active}
      onStepClick={setActive}
      size={"16px"}
      className="text-xs"
      styles={stepperStyleOption}
    >
      <Stepper.Step label="LOGIN INFO">
        <LoginInfoStep nextStep={nextStep} user={user} />
      </Stepper.Step>
      <Stepper.Step label="DELIVERY ADDRESS">
        <DeliveryAddressStep
          prevStep={prevStep}
          nextStep={nextStep}
          setPaymentData={setPaymentData}
        />
      </Stepper.Step>
      <Stepper.Step label="ORDER SUMMARY">
        <OrderSummaryStep
          nextStep={nextStep}
          cart={cartData?.cart}
          setPaymentData={setPaymentData}
          hasSearchParam={hasSearchParam}
        />
      </Stepper.Step>
      <Stepper.Step label="PAYMENT">
        <PaymentStep
          nextStep={nextStep}
          cartData={cartData}
          paymentData={paymentData}
          setPaymentData={setPaymentData}
        />
      </Stepper.Step>
      <Stepper.Completed>
        <CompleteStep paymentData={paymentData} />
      </Stepper.Completed>
    </Stepper>
  )
}

export default PaymentStepper
