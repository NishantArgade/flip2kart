import moment from "moment"
import React, { useState } from "react"
import { TiTick } from "react-icons/ti"
import "./stepper.css"

const StatusStepper = () => {
  const steps = [
    { status: "Order Confirmed", date: new Date("2023/12/08") },
    { status: "Shipped", date: new Date("2023/12/10") },
    { status: "Out For Delivery", date: new Date("2023/12/12") },
    { status: "Delivered", date: new Date("2023/12/18") },
  ]
  const [currentStep, setCurrentStep] = useState(1)
  const [complete, setComplete] = useState(false)

  return (
    <>
      <div className="flex flex-col justify-between  text-[0.65rem] md:my-4 md:flex-row">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            }  ${steps.length === currentStep && "last"} `}
          >
            <p className="pl-2 text-gray-500 md:pb-2">{step.status}</p>
            <div className="step"></div>
            <p className="pr-2 text-gray-500 md:pt-2">
              {moment(step.date).format("ddd, Do MMM")}
            </p>
          </div>
        ))}
      </div>

      {/** Remove This button later... */}
      {!complete && (
        <button
          className="btn"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1)
          }}
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      )}
    </>
  )
}

export default StatusStepper
