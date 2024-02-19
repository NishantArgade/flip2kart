import { Modal, TextInput } from "@mantine/core"
import "react-datepicker/dist/react-datepicker.css"
import { useForm } from "@mantine/form"
import _ from "lodash"
import { getPascalCaseString } from "../../../utils/helper"

function CategoryModal({ opened, close, isEdit = false }) {
  const form = useForm({
    initialValues: {
      category: "",
      brands: "",
    },

    validate: {},
  })

  const handleSubmit = (values) => {
    const array = values.brands.split(",")
    const brandList = []

    for (let index = 0; index < array.length; index++) {
      const brand = array[index]
      const brandName = brand.trim()
      const specialCharRegex = /[!@$%^*()_+\=\[\]{};':"\\|,.<>\/?]+/

      if (brandName === "" || specialCharRegex.test(brandName)) continue
      else {
        const pascalCaseStr = getPascalCaseString(brandName)
        brandList.push(pascalCaseStr)
      }
    }

    const uniqueBrandList = _.uniq(brandList)

    console.log(values.category, uniqueBrandList)
  }

  return (
    <>
      <Modal
        size={"lg"}
        opened={opened}
        onClose={close}
        title={isEdit ? "Edit Category" : "Add Category"}
        closeOnClickOutside={false}
        centered
      >
        <form onSubmit={form.onSubmit(handleSubmit)} className="my-2">
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label="Category"
              placeholder="Category name"
              {...form.getInputProps("category")}
              withAsterisk
              size="sm"
            />
            <div className="col-span-2">
              <label
                htmlFor="Brands"
                className="mb-1 block text-sm font-medium text-gray-900"
              >
                Brands
              </label>
              <textarea
                id="brands"
                placeholder="Brands array (comma separated)"
                {...form.getInputProps("brands")}
                className="h-32 w-full resize-none rounded-md border-[1.5px] border-gray-300 p-2 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <div className="flex flex-col self-start">
              <button
                onClick={close}
                className="mt-6 rounded-sm border-[1.5px] border-gray-200 bg-white px-6 py-2 text-xs text-gray-800 shadow-md"
              >
                CANCEL
              </button>
            </div>
            <div className="flex flex-col self-start">
              <button
                type="submit"
                className="mt-6 rounded-sm bg-blue-600 px-6 py-2 text-xs text-white shadow-md"
              >
                ADD
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default CategoryModal
