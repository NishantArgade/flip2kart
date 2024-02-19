import { Input, Rating, Textarea } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { getSuccessToast } from "../../utils/getSuccessToast.jsx"
import Spinner from "../../components/Spinner"

const RateProduct = () => {
  const [rateValue, setRateValue] = useState(0)

  const rateValueOptimize = useMemo(() => {
    if (rateValue === 1) {
      return "Very Bad"
    } else if (rateValue === 2) {
      return "Bad"
    } else if (rateValue === 3) {
      return "Good"
    } else if (rateValue === 4) {
      return "Very  Good"
    } else if (rateValue === 5) {
      return "Excellent"
    }
  }, [rateValue])

  const form = useForm({
    initialValues: { description: "", rateTitle: "" },

    validate: {
      description: (value) => {
        if (!value.trim()) return "field should not be empty"
      },
      rateTitle: (value) => {
        if (!value.trim()) return "field should not be empty"
      },
    },
  })

  const isBoughtProduct = true

  return (
    <div className="min-h-screen">
      {/** Rating and Review Section */}
      <div className="container mx-auto w-full bg-white p-2 shadow-md ">
        <div className="flex flex-wrap items-center justify-between gap-x-2 px-2">
          <p className="font-semibold text-gray-800">Ratings & Reviews</p>

          <Link
            to="/product-detail/2"
            className="bg-red-20 flex w-full items-center  justify-end gap-x-3 text-xs md:w-fit"
          >
            <div className="flex flex-col items-end  gap-y-1">
              <p className="w-44 truncate text-gray-800">
                Iphone Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto, esse!
              </p>
              <div className="text-xs text-gray-700">
                <span className="mr-2 rounded-sm bg-green-600 px-1 py-[2px] text-white">
                  4.5★
                </span>
                <span className="font-medium text-gray-500">(460)</span>
              </div>
            </div>
            <div className="flex h-12 w-10 flex-col items-center justify-center rounded-sm border-[1.5px] p-1">
              <img src="/camera.png" alt="" />
            </div>
          </Link>
        </div>
      </div>

      <div className="container mx-auto  grid min-h-[30rem] grid-cols-1 gap-x-2 gap-y-2 py-2 md:grid-cols-12">
        {/* Left sidebar Section */}
        <div className="h-fit  grid-cols-1 bg-white shadow-md md:col-span-5  lg:col-span-3">
          <div>
            <p className="border-b-2 p-4 text-sm ">What makes a good review</p>
            <div className="flex flex-col gap-y-1 px-4">
              <div className="border-b-2 py-4">
                <p className="text-sm">Have you used this product?</p>
                <p className="mt-2 text-xs">
                  Your review should be about your experience with the product.
                </p>
              </div>

              <div className="border-b-2 py-4">
                <p className="text-sm">Have you used this product?</p>
                <p className="mt-2 text-xs">
                  Your review should be about your experience with the product.
                </p>
              </div>

              <div className="border-b-2 py-4">
                <p className="text-sm">How to review a product?</p>
                <p className="mt-2 text-xs">
                  Your review should include facts. An honest opinion is always
                  appreciated. If you have an issue with the product or service
                  please contact us from the help centre.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="row-end-2 grid-cols-1 bg-white shadow-md md:col-span-7   md:row-auto  lg:col-span-9">
          {isBoughtProduct ? (
            true ? (
              <div className="flex flex-col gap-y-1">
                <div className="border-b-2 p-4">
                  <p className="text-sm font-semibold">Rate this product</p>
                  <div className="mt-2 flex items-center gap-x-4">
                    <Rating
                      value={rateValue}
                      className="gap-x-2"
                      onChange={setRateValue}
                      color="#FFE11B"
                    />
                    <span
                      className={
                        rateValueOptimize === "Very Bad"
                          ? "text-xs font-semibold text-red-500"
                          : rateValueOptimize === "Bad"
                            ? "text-xs font-semibold text-orange-500"
                            : "text-xs font-semibold text-green-500"
                      }
                    >
                      {rateValueOptimize}
                    </span>
                  </div>
                </div>
                <form onSubmit={form.onSubmit(console.log)}>
                  <div className="px-4 pt-3">
                    <p className="pb-3 text-sm font-semibold">
                      Review this product
                    </p>
                    <div className="flex flex-col gap-y-4">
                      <Textarea
                        radius="xs"
                        description="Description"
                        placeholder="Write description here..."
                        {...form.getInputProps("description")}
                        rows={8}
                      />
                      <Input.Wrapper description="Title (optional)">
                        <Input
                          radius="xs"
                          maxLength={80}
                          placeholder="Review title..."
                          {...form.getInputProps("rateTitle")}
                        />
                      </Input.Wrapper>
                    </div>
                  </div>

                  <div className="px-4 pt-5">
                    <div className="flex h-12 w-12 cursor-pointer items-center justify-center bg-gray-200 p-2">
                      <img src="/addImgCamara.svg" color="red" alt="" />
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      getSuccessToast("Review Submitted Successfully")
                    }
                    type="submit"
                    className="float-end p-4 "
                  >
                    <p className="cursor-pointer bg-[#FB641B]  px-10  py-3 text-xs font-semibold uppercase text-white shadow-md">
                      SUBMIT
                    </p>
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <Spinner />
              </div>
            )
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-y-4">
                <img src="/cycleMan.png" alt="notPurchased" />
                <p className="mt-2 text-xl font-medium text-gray-800">
                  Haven't purchased this product?
                </p>
                <p className="text-gray-500">
                  Sorry! You are not allowed to review this product since you
                  haven't bought it on Flip2kart.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RateProduct
