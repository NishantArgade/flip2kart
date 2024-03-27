import { Modal, NumberInput, TextInput } from "@mantine/core"
import "react-datepicker/dist/react-datepicker.css"
import _ from "lodash"
import { getPascalCaseString } from "../../../utils/helper"
import { useMutation } from "@tanstack/react-query"
import { addCategory, updateCategory } from "../../../api/categoryApi"
import { queryClient } from "../../../main"
import { IoMdTrash } from "react-icons/io"
import { useState } from "react"

function CategoryModal({
  opened,
  close,
  isEdit = false,
  form,
  selectedCategory,
  previewImage,
  selectedImage,
  setPreviewImage,
  setSelectedImage,
}) {
  const [imgError, setImgError] = useState(false)
  const { mutate: mutateAddCategory, isPending: addCategoryIsPending } =
    useMutation({
      mutationKey: "addCategory",
      mutationFn: addCategory,
      onSettled: () => {
        handleClose()
      },
      onSuccess: () => queryClient.invalidateQueries("allCategories"),
    })

  const { mutate: mutateUpdateCategory, isPending: updateCategoryIsPending } =
    useMutation({
      mutationKey: "updateCategory",
      mutationFn: updateCategory,
      onSettled: () => {
        handleClose()
      },
      onSuccess: () => queryClient.invalidateQueries("allCategories"),
    })

  const handleSubmit = (values) => {
    if (!selectedImage) return setImgError(true)

    const array = values?.brands?.split(",") || []
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

    const formData = new FormData()
    formData.append("category", values.category)
    formData.append("brands", JSON.stringify(uniqueBrandList))
    formData.append("min_price", values.min_price)
    formData.append("max_price", values.max_price)
    formData.append("image", selectedImage)

    if (isEdit)
      mutateUpdateCategory({
        categoryID: selectedCategory?._id,
        payload: formData,
      })
    else mutateAddCategory(formData)
  }

  function handleClose(e) {
    e?.preventDefault()
    close()

    form.setValues({
      category: "",
      brands: "",
      min_price: "",
      max_price: "",
    })
    setPreviewImage(null)
    setSelectedImage(null)
    setImgError("")
  }

  const handleImageChange = async (e) => {
    setSelectedImage(e.target.files[0])
    setPreviewImage(URL.createObjectURL(e.target.files[0]))
    setImgError(false)
  }

  const removeImage = async () => {
    setSelectedImage(null)
    setPreviewImage(null)
  }

  return (
    <>
      <Modal
        size={"lg"}
        opened={opened}
        onClose={handleClose}
        title={isEdit ? "Edit Category" : "Add Category"}
        closeOnClickOutside={false}
        centered
      >
        <form onSubmit={form.onSubmit(handleSubmit)} className="my-2">
          <div className="grid grid-cols-3 gap-4">
            <TextInput
              label="Category"
              placeholder="Category name"
              {...form.getInputProps("category")}
              withAsterisk
              size="sm"
            />
            <NumberInput
              withAsterisk
              label="Min Price"
              placeholder="0"
              {...form.getInputProps("min_price")}
            />
            <NumberInput
              withAsterisk
              label="Max Price"
              placeholder="10,00,000"
              {...form.getInputProps("max_price")}
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
            <div className="">
              <p className="pb-1 font-normal">Image</p>
              <button
                type="button"
                onClick={() =>
                  document.getElementById("formFileCategoryImage").click()
                }
                className={`${imgError ? "border border-red-500" : ""} flex h-12 w-12 cursor-pointer items-center justify-center bg-gray-200 p-2`}
              >
                <img src="/addImgCamara.svg" color="red" alt="" />
                <input
                  className="hidden"
                  id="formFileCategoryImage"
                  type="file"
                  multiple={false}
                  onChange={handleImageChange}
                />
              </button>
              {imgError && (
                <p className="mt-1 text-xs text-red-500">Image is required</p>
              )}

              {previewImage && (
                <div className="relative mt-4 flex h-16 w-fit items-center justify-center gap-x-2 ">
                  <div className="group relative h-14  w-14 overflow-hidden  rounded-sm border border-gray-300 object-cover p-1 shadow-sm hover:opacity-50">
                    <img
                      className="h-full w-full object-contain"
                      src={previewImage}
                      alt="preview"
                    />
                    <button
                      type="button"
                      className="absolute left-1/2 top-1/2 inline-block -translate-x-1/2 -translate-y-1/2 text-red-800 opacity-0 group-hover:bg-white group-hover:opacity-100"
                      onClick={removeImage}
                    >
                      <IoMdTrash />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <div className="flex flex-col self-start">
              <button
                onClick={handleClose}
                className="mt-6 rounded-sm border-[1.5px] border-gray-200 bg-white px-6 py-2 text-xs text-gray-800 shadow-md"
              >
                CANCEL
              </button>
            </div>
            <div className="flex flex-col self-start">
              <button
                type="submit"
                className="mt-6 rounded-sm bg-blue-600 px-6 py-2 text-xs text-white shadow-md"
                disabled={
                  isEdit ? updateCategoryIsPending : addCategoryIsPending
                }
              >
                {isEdit ? "SAVE" : "ADD"}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default CategoryModal
