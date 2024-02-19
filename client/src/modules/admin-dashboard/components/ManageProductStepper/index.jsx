import { Stepper } from "@mantine/core"
import { useState } from "react"
import BasicInfoStep from "./BasicInfoStep.jsx"
import CompleteStep from "./CompleteStep.jsx"
import OfferStep from "./OfferStep.jsx"
import SpecificationStep from "./SpecificationStep.jsx"
import SpotlightStep from "./SpotlightStep.jsx"
import axios from "axios"

const ManageProductStepper = ({ isEditProduct }) => {
  const [active, setActive] = useState(0)
  const [brand, setBrand] = useState(null)
  const [selectedImages, setSelectedImages] = useState([])
  const [previewImages, setPreviewImages] = useState([])

  const [basicInfoStepInitialData, setBasicInfoStepInitialData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    stock: "",
    seller: "",
    seller_address: "",
    delivery_estimate_days: "",
  })
  const [spotlightStepData, setSpotlightStepData] = useState([])
  const [offerData, setOfferData] = useState([])
  const [specificationStepData, setSpecificationStepData] = useState([])

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
      borderWidth: 3,
      padding: "0.6rem",
      fontSize: "16px",
    },

    separator: {
      marginLeft: 10,
      marginRight: 2,
      height: 3,
    },
  }

  const handleImageChange = (e) => {
    setSelectedImages([...e.target.files])

    // Create object URLs for preview
    const fileArray = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    )

    // Store all selected file object urls to the previewImages state variable
    setPreviewImages((prevImages) => prevImages.concat(fileArray))
  }

  const handleUpload = async () => {
    const formData = new FormData()
    selectedImages.forEach((image, i) => {
      formData.append("images", image)
    })

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload-product-imgs",
        formData
      )
      console.log(response.data.uploadedImages) // Array of image URLs
      return response.data.uploadedImages
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async function handleFormSubmit() {
    const uploadedImages = await handleUpload()
    const final = {
      ...basicInfoStepInitialData,
      brand: brand,
      images: uploadedImages,
      spotlight: spotlightStepData,
      offers: offerData,
      specifications: specificationStepData,
    }
    console.log(final)
    nextStep()
  }

  const removeImage = (event, index) => {
    event.preventDefault()
    setPreviewImages((prevImages) => prevImages.filter((img, i) => i !== index))
    setSelectedImages((prevImages) =>
      prevImages.filter((img, i) => i !== index)
    )

    // Reset the file input
    document.getElementById("formFileMultiple").value = null
  }

  return (
    <div className=" bg-white md:px-10 lg:px-40 ">
      <Stepper
        active={active}
        size={"16px"}
        className="text-x"
        styles={stepperStyleOption}
      >
        <Stepper.Step label="BASIC INFO">
          <BasicInfoStep
            nextStep={nextStep}
            basicInfoStepInitialData={basicInfoStepInitialData}
            setBasicInfoStepInitialData={setBasicInfoStepInitialData}
            brand={brand}
            setBrand={setBrand}
            handleImageChange={handleImageChange}
            handleUpload={handleUpload}
            previewImages={previewImages}
            removeImage={removeImage}
          />
        </Stepper.Step>
        <Stepper.Step label="SPOTLIGHT">
          <SpotlightStep
            nextStep={nextStep}
            prevStep={prevStep}
            spotlightStepData={spotlightStepData}
            setSpotlightStepData={setSpotlightStepData}
          />
        </Stepper.Step>
        <Stepper.Step label="OFFERS">
          <OfferStep
            nextStep={nextStep}
            prevStep={prevStep}
            offerData={offerData}
            setOfferData={setOfferData}
          />
        </Stepper.Step>
        <Stepper.Step label="SPECIFICATION">
          <SpecificationStep
            nextStep={nextStep}
            prevStep={prevStep}
            specificationStepData={specificationStepData}
            setSpecificationStepData={setSpecificationStepData}
            handleFormSubmit={handleFormSubmit}
          />
        </Stepper.Step>
        <Stepper.Completed>
          <CompleteStep isEditProduct={isEditProduct} />
        </Stepper.Completed>
      </Stepper>
    </div>
  )
}

export default ManageProductStepper
