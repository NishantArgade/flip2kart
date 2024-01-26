import { Stepper } from "@mantine/core";
import React, { useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { MdStar } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import AddressAccordion from "./AddressAccordion.jsx";
import CartProduct from "./CartProduct.jsx";
import PaymentAccordion from "./PaymentAccordion.jsx";

const PaymentStepper = () => {
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Stepper
      active={active}
      onStepClick={setActive}
      size={"16px"}
      className="text-xs"
      styles={{
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
      }}
    >
      <Stepper.Step label="LOGIN">
        <div className="flex flex-col items-center justify-center pt-6 gap-y-10  py-2 border-t-[1px]">
          <div>
            <div className="flex items-start justify-center gap-x-20 ">
              <div className="flex flex-col justify-start items-start gap-y-2">
                <div className="flex items-center justify-start gap-x-3">
                  <p className="text-gray-500">Name</p>
                  <p>Nishant Argade</p>
                </div>
                <div className="flex items-center justify-start gap-x-3">
                  <p className="text-gray-500">Name</p>
                  <p>Nishant Argade</p>
                </div>
                <p className="text-blue-500">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
                <button
                  onClick={nextStep}
                  className="bg-[#FB641B] py-3 px-10 mt-2 w-64 text-white rounded-sm   cursor-pointer shadow-md"
                >
                  Continue Checkout
                </button>
              </div>
              <div className="flex flex-col justify-start items-start gap-y-2">
                <p className="text-xs text-gray-500">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
                <div className="flex items-center gap-x-3">
                  <TbTruckDelivery className="text-sm text-blue-500" />
                  <p>Lorem ipsum dolor sit amet consectetur.</p>
                </div>
                <div className="flex items-center gap-x-3">
                  <IoMdNotifications className="text-sm text-blue-500" />
                  <p>Lorem ipsum dolor sit amet consectetur.</p>
                </div>
                <div className="flex items-center gap-x-3">
                  <MdStar className="text-sm text-blue-500" />
                  <p>Lorem ipsum dolor sit amet consectetur.</p>
                </div>
              </div>
            </div>
            <p className="mt-7 text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Laudantium, error?
            </p>
          </div>
        </div>
      </Stepper.Step>
      <Stepper.Step label="DELIVERY ADDRESS">
        <AddressAccordion prevStep={prevStep} nextStep={nextStep} />
      </Stepper.Step>
      <Stepper.Step label="ORDER SUMMARY">
        <div className="border-t-[1px]">
          <CartProduct />
          <CartProduct />
          <CartProduct />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-[#FB641B] py-3 self-end px-10 mt-2 text-white   w-fit  cursor-pointer shadow-md"
            size="xs"
            onClick={nextStep}
          >
            CONTINUE
          </button>
        </div>
      </Stepper.Step>
      <Stepper.Step label="PAYMENT OPTIONS">
        <PaymentAccordion />
      </Stepper.Step>
    </Stepper>
  );
};

export default PaymentStepper;
