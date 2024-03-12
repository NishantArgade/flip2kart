import { NumberInput, Select, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useQuery } from "@tanstack/react-query"
import _ from "lodash"
import { useMemo } from "react"
import { IoMdTrash } from "react-icons/io"
import { LuUpload } from "react-icons/lu"
import { getAllCategoriesAndBrands } from "../../../../api/categoryApi"

const BasicInfoStep = ({
  nextStep,
  basicInfoStepInitialData,
  setBasicInfoStepInitialData,
  brand,
  setBrand,
  handleImageChange,
  handleUpload,
  previewImages,
  removeImage,
}) => {
  const form = useForm({
    initialValues: basicInfoStepInitialData,
    validate: {},
  })

  const { data } = useQuery({
    initialData: [],
    queryKey: ["allCategoriesAndBrands"],
    queryFn: getAllCategoriesAndBrands,
  })

  const categories = _.map(data?.categories, "name")

  const brandList = useMemo(() => {
    return (
      _.filter(data?.categories, (cat) => {
        return cat.name === form.values.category
      })[0]?.brands ?? []
    )
  }, [data?.categories, form.values.category])

  function handleSubmit(values) {
    setBasicInfoStepInitialData(values)
    nextStep()
  }

  return (
    <form className="mt-3">
      <div className="grid grid-cols-2 gap-6">
        <TextInput
          withAsterisk
          label="Product Name"
          placeholder="john"
          {...form.getInputProps("name")}
        />
        <NumberInput
          hideControls
          withAsterisk
          label="Price"
          placeholder="dio"
          {...form.getInputProps("price")}
        />

        <Select
          searchable
          label="Category"
          placeholder="Pick value"
          data={categories}
          onSelect={() => setBrand(null)}
          {...form.getInputProps("category")}
        />
        <Select
          searchable
          label="Brand"
          placeholder="Type brand name"
          data={brandList}
          value={brand}
          onChange={(value) => setBrand(value)}
        />

        <NumberInput
          hideControls
          withAsterisk
          label="Discount"
          placeholder="Enter Discount percentage"
          {...form.getInputProps("discount")}
        />
        <NumberInput
          hideControls
          withAsterisk
          label="Stock"
          placeholder="stock"
          {...form.getInputProps("stock")}
        />
        <TextInput
          withAsterisk
          label="Seller"
          placeholder="seller name"
          {...form.getInputProps("seller")}
        />
        <NumberInput
          hideControls
          withAsterisk
          label="Delivery Estimate days "
          placeholder="days"
          {...form.getInputProps("delivery_estimate_days")}
        />
        <div className="col-span-2">
          <TextInput
            withAsterisk
            label="Seller Address"
            placeholder="seller address"
            {...form.getInputProps("seller_address")}
          />
        </div>
        <div className="col-span-2">
          <div className="mb text-sm">
            <label
              htmlFor="customFileInput"
              className="mb-2 inline-block text-sm font-medium tracking-normal"
            >
              Upload Product Images
            </label>
            <div
              className="w-full cursor-pointer rounded-md border-[1.5px] border-gray-300 p-2   focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() =>
                document.getElementById("formFileMultiple").click()
              }
            >
              <div className="flex items-center justify-start gap-2 ">
                {previewImages.length > 0 ? (
                  <>
                    <LuUpload className="inline-block text-gray-800" />
                    <span className="text-gray-800">
                      {previewImages.length} file(s) selected
                    </span>
                  </>
                ) : (
                  <>
                    <LuUpload className="inline-block text-gray-400" />
                    <span className="text-gray-400">No files chosen</span>
                  </>
                )}
              </div>
            </div>
            <input
              className="hidden"
              id="formFileMultiple"
              type="file"
              multiple
              onChange={handleImageChange}
            />
          </div>

          {previewImages.length > 0 && (
            <div className="relative mt-4 flex h-16 w-fit items-center justify-center gap-x-2 ">
              {previewImages.map((item, index) => (
                <div
                  key={index}
                  className="group relative h-14  w-14 overflow-hidden  rounded-sm border border-gray-300 object-cover p-1 shadow-sm hover:opacity-50"
                >
                  <img
                    className="h-full w-full object-contain"
                    src={item?.url}
                    alt="preview"
                  />
                  <button
                    className="absolute left-1/2 top-1/2 inline-block -translate-x-1/2 -translate-y-1/2 text-red-800 opacity-0 group-hover:bg-white group-hover:opacity-100"
                    onClick={(e) => removeImage(e, index)}
                  >
                    <IoMdTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-span-2">
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium text-gray-900"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="dio"
            {...form.getInputProps("description")}
            className="h-40 w-full resize-none rounded-md border-[1.5px] border-gray-300 p-2 text-sm outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div className="py-4 text-end">
        <button
          onClick={form.onSubmit(handleSubmit)}
          className="rounded-sm bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md "
        >
          Next
        </button>
      </div>
    </form>
  )
}

export default BasicInfoStep
