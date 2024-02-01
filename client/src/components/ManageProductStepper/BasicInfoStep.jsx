import { NumberInput, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

const BasicInfoStep = ({ nextStep }) => {
  const form = useForm({
    initialValues: {
      name: "",
      price: "",
      category: "",
      stock: "",
      description: "",
    },

    validate: {
      name: (value) => {
        if (!value) return "this field is required";
      },
      price: (value) => {
        if (!value) return "this field is required";
      },
      category: (value) => {
        if (!value) return "this field is required";
      },
      stock: (value) => {
        if (!value) return "this field is required";
      },
    },
  });
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
        <div className="col-span-2">
          <div className="mb">
            <label
              htmlFor="formFileMultiple"
              className="mb-2 inline-block text-sm tracking-normal font-medium"
            >
              Upload Product Images
            </label>
            <input
              type="file"
              className="border-2 w-full "
              id="formFileMultiple"
              multiple
              width={20}
            />
          </div>

          <div className="flex justify-start items-center gap-3 w-40 bg-gray-100 h-16 p-2 mt-4">
            <img className="w-10" src="/camera.png" alt="" />
            <img className="w-10" src="/book.png" alt="" />
            <img className="w-10" src="/shirt.png" alt="" />
          </div>
        </div>
        <div className="col-span-2">
          <label
            htmlFor="description"
            className="block mb-1 text-sm font-medium text-gray-900"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="dio"
            {...form.getInputProps("description")}
            className="border-gray-300 focus:border-blue-500 p-2 text-sm outline-none border-[1.5px] rounded-md resize-none w-full h-40"
          />
        </div>
      </div>
      <div className="text-end py-4">
        <button
          onClick={nextStep}
          type="submit"
          className="bg-blue-500 px-4 py-2 text-white text-sm font-semibold shadow-md rounded-sm "
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default BasicInfoStep;
