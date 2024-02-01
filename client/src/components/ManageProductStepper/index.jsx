import { Stepper } from "@mantine/core";
import { useState } from "react";
import BasicInfoStep from "./BasicInfoStep.jsx";
import CompleteStep from "./CompleteStep.jsx";
import OfferStep from "./OfferStep.jsx";
import SpecificationStep from "./SpecificationStep.jsx";
import SpotlightStep from "./SpotlightStep.jsx";

const ManageProductStepper = ({ isEditProduct }) => {
  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  // if isEditProduct is true then fill state of all inputs for all steps and pass them from here
  // like

  // BasicInfoStepInitialValue = {
  //   name: "Nishant",
  //   price: 200,
  //   category: "tv",
  //   stock: 100,
  //   description: "lorem",
  // }

  const stepperStyleOption = {
    stepLabel: {
      fontSize: "0.7rem",
    },

    step: {
      padding: 0,
    },

    stepIcon: {
      borderWidth: 3,
      padding: "0.6rem",
      fontSize: "16px",
    },

    separator: {
      marginLeft: 10,
      marginRight: 2,
      height: 3,
    },
  };

  return (
    <div className=" bg-white md:px-10 lg:px-40 ">
      <Stepper
        active={active}
        size={"16px"}
        className="text-x"
        styles={stepperStyleOption}
      >
        <Stepper.Step label="BASIC INFO">
          <BasicInfoStep nextStep={nextStep} />
        </Stepper.Step>
        <Stepper.Step label="SPOTLIGHT">
          <SpotlightStep nextStep={nextStep} prevStep={prevStep} />
        </Stepper.Step>
        <Stepper.Step label="OFFERS">
          <OfferStep nextStep={nextStep} prevStep={prevStep} />
        </Stepper.Step>
        <Stepper.Step label="SPECIFICATION">
          <SpecificationStep nextStep={nextStep} prevStep={prevStep} />
        </Stepper.Step>
        <Stepper.Completed>
          <CompleteStep isEditProduct={isEditProduct} />
        </Stepper.Completed>
      </Stepper>
    </div>
  );
};

export default ManageProductStepper;
