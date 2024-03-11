/* eslint-disable react/prop-types */
import { Stepper } from "@mantine/core"
import { useState } from "react"
import BasicInfoStep from "./BasicInfoStep.jsx"
import CompleteStep from "./CompleteStep.jsx"
import OfferStep from "./OfferStep.jsx"
import SpecificationStep from "./SpecificationStep.jsx"
import SpotlightStep from "./SpotlightStep.jsx"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import {
  addProduct,
  updateProduct,
  uploadProductImgs,
} from "../../../../api/productApi.js"
import Spinner from "../../../../components/Spinner.jsx"
import { IoArrowBack } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { queryClient } from "../../../../main.jsx"

const ManageProductStepper = ({ isEditProduct, product }) => {
  const navigate = useNavigate()
  const [active, setActive] = useState(0)
  const [loading, setLoading] = useState(false)
  const [brand, setBrand] = useState(product?.brand || "")
  const [selectedImages, setSelectedImages] = useState(
    product?.images?.map((item) => item?.url) || []
  )

  const [previewImages, setPreviewImages] = useState(product?.images || [])

  const [basicInfoStepInitialData, setBasicInfoStepInitialData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    discount: product?.discount || "",
    category: product?.category || "",
    stock: product?.stock || "",
    seller: product?.seller || "",
    seller_address: product?.seller_address || "",
    delivery_estimate_days: product?.delivery_estimate_days || "",
  })
  const [spotlightStepData, setSpotlightStepData] = useState(
    product?.spotlight || []
  )
  const [offerData, setOfferData] = useState(product?.offers || [])
  const [specificationStepData, setSpecificationStepData] = useState(
    product?.specifications || []
  )

  const { mutate: updateProductMutate, isPending: updateProductIsPending } =
    useMutation({
      mutationKey: ["updateProduct"],
      mutationFn: updateProduct,
      onSuccess: () => {
        queryClient.invalidateQueries("allProducts")
        nextStep()
      },
      onSettled: () => {
        setLoading(false)
      },
    })

  const { mutate: addProductMutate, isPending: addProductIsPending } =
    useMutation({
      mutationKey: "addProduct",
      mutationFn: addProduct,
      onSuccess: () => {
        queryClient.invalidateQueries("allProducts")
        nextStep()
      },
      onSettled: () => {
        setLoading(false)
      },
    })

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

  const removeImage = (event, index) => {
    event.preventDefault()
    setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index))
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index))
    document.getElementById("formFileMultiple").value = null
  }

  const handleImageChange = (e) => {
    setSelectedImages((prev) => [...prev, ...e.target.files])

    // Create object URLs for preview
    const fileArray = Array.from(e.target.files).map((file) => ({
      url: URL.createObjectURL(file),
    }))

    // Store all selected file object urls to the previewImages state variable
    setPreviewImages((prevImages) => prevImages.concat(fileArray))
  }

  const handleUpload = async () => {
    const formData = new FormData()
    selectedImages.forEach((image, i) => {
      if (image instanceof File) formData.append("images", image)
    })

    try {
      const remaining = previewImages.filter(
        (item) => !item.url.includes("blob")
      )
      if (formData.entries().next().value) {
        const response = await uploadProductImgs(formData)
        return [...remaining, ...response.uploadedImages]
      } else {
        return remaining
      }
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async function handleFormSubmit() {
    setLoading(true)

    const uploadedImages = await handleUpload()

    const final = {
      ...basicInfoStepInitialData,
      brand: brand,
      images: uploadedImages,
      spotlight: spotlightStepData,
      offers: offerData,
      specifications: specificationStepData,
    }
    if (isEditProduct)
      updateProductMutate({ productID: product?._id, payload: final })
    else addProductMutate(final)
  }

  return (
    <>
      {/** Heading */}
      <div className="mb-6 flex items-center">
        <button
          className="flex items-center gap-2 text-sm  font-semibold text-gray-400"
          disabled={loading}
          onClick={() => navigate("/admin-dashboard/products")}
        >
          <IoArrowBack />
          <p>Back</p>
        </button>
        <p className="pl-5 text-base font-semibold text-gray-500">
          {isEditProduct ? "Edit Product" : "Add Product"}
        </p>
      </div>
      <div className="bg-white md:px-10 lg:px-40 ">
        {loading ? (
          <div className="flex h-96 w-full flex-col items-center justify-center">
            <p>{isEditProduct ? "Updating Product" : "Adding Product"}</p>
            <p className="mb-6">please wait</p>
            <Spinner />
          </div>
        ) : (
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
                isEditProduct={isEditProduct}
                updateProductIsPending={updateProductIsPending}
                addProductIsPending={addProductIsPending}
              />
            </Stepper.Step>
            <Stepper.Completed>
              <CompleteStep isEditProduct={isEditProduct} />
            </Stepper.Completed>
          </Stepper>
        )}
      </div>
    </>
  )
}

export default ManageProductStepper
