import { NumberInput, Select, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"

const BasicInfoStep = ({ nextStep }) => {
  const form = useForm({
    initialValues: {
      name: "",
      price: "",
      category: "",
      stock: "",
      description: "",
      sellerName: "",
      deliveryEstimateDays: "",
    },

    validate: {
      name: (value) => {
        if (!value) return "this field is required"
      },
      price: (value) => {
        if (!value) return "this field is required"
      },
      category: (value) => {
        if (!value) return "this field is required"
      },
      stock: (value) => {
        if (!value) return "this field is required"
      },
    },
  })
  return (
    <form onSubmit={form.onSubmit(console.log)} className="mt-3">
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
          label="Category"
          placeholder="Pick value"
          data={["React", "Angular", "Vue", "Svelte"]}
          {...form.getInputProps("category")}
        />
        <TextInput
          withAsterisk
          label="Stock"
          placeholder="dio"
          {...form.getInputProps("stock")}
        />
        <TextInput
          withAsterisk
          label="Seller"
          placeholder="seller name"
          {...form.getInputProps("sellerName")}
        />
        <NumberInput
          hideControls
          withAsterisk
          label="Delivery Estimate"
          placeholder="days"
          {...form.getInputProps("deliveryEstimateDays")}
        />
        <div className="col-span-2">
          <div className="mb">
            <label
              htmlFor="formFileMultiple"
              className="mb-2 inline-block text-sm font-medium tracking-normal"
            >
              Upload Product Images
            </label>
            <input
              type="file"
              className="w-full border-2 "
              id="formFileMultiple"
              multiple
              width={20}
            />
          </div>

          <div className="mt-4 flex h-16 w-40 items-center justify-start gap-3 bg-gray-100 p-2">
            <img className="w-10" src="/camera.png" alt="" />
            <img className="w-10" src="/book.png" alt="" />
            <img className="w-10" src="/shirt.png" alt="" />
          </div>
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
          onClick={nextStep}
          type="submit"
          className="rounded-sm bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md "
        >
          Next
        </button>
      </div>
    </form>
  )
}

export default BasicInfoStep
