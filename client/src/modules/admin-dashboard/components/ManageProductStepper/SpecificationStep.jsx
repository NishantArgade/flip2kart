import { Table, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useState } from "react"
import { IoMdAddCircle } from "react-icons/io"
import { MdDelete } from "react-icons/md"
import { RxCross2 } from "react-icons/rx"
import { getPascalCaseString } from "../../../../utils/helper"
import _ from "lodash"

const SpecificationStep = ({
  nextStep,
  prevStep,
  specificationStepData,
  setSpecificationStepData,
  handleFormSubmit,
  isEditProduct,
  addProductIsPending,
  updateProductIsPending,
}) => {
  const [category, setCategory] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const form = useForm({
    initialValues: {
      specificationCategory: "",
      specificationTitle: "",
      specificationDescription: "",
    },

    validate: {
      specificationCategory: (value) => {
        if (!value) return "this field is required"
      },
      specificationTitle: (value) => {
        if (!value) return "this field is required"
      },
      specificationDescription: (value) => {
        if (!value) return "this field is required"
      },
    },
  })

  function handleAddService() {
    const formatedCategory = getPascalCaseString(category)
    const formatedTitle = getPascalCaseString(title)
    const formatedDescription = getPascalCaseString(description)

    if (!!formatedCategory && !!formatedTitle && !!formatedDescription) {
      setSpecificationStepData((prevData) => {
        const dataCopy = [...prevData]
        const categoryObject = dataCopy.find(
          (obj) => obj.category === formatedCategory
        )

        if (categoryObject) {
          if (
            !_.find(categoryObject.items, {
              title: formatedTitle,
              description: formatedDescription,
            })
          ) {
            categoryObject.items.push({
              title: formatedTitle,
              description: formatedDescription,
            })
          }
        } else {
          dataCopy.push({
            category: formatedCategory,
            items: [{ title: formatedTitle, description: formatedDescription }],
          })
        }

        return dataCopy
      })
      setTitle("")
      setDescription("")
    }
  }

  function handleDeleteItem(category, title, description) {
    console.log(title, description)
    setSpecificationStepData((prevData) => {
      const dataCopy = [...prevData]
      const categoryObject = dataCopy.find((obj) => obj.category === category)

      if (categoryObject) {
        categoryObject.items = categoryObject.items.filter(
          (item) => item.title !== title || item.description !== description
        )
      }
      if (categoryObject.items.length === 0)
        return dataCopy.filter((item) => item.category !== category)

      return dataCopy
    })
  }

  function handleDeleteByCategory(category) {
    setSpecificationStepData((prevData) => {
      return prevData.filter((item) => item.category !== category)
    })
  }

  return (
    <form
      onSubmit={form.onSubmit(console.log)}
      className="mt-3 flex flex-col text-sm"
    >
      <div className="grid grid-cols-2 gap-5">
        <TextInput
          withAsterisk
          label="Category"
          placeholder="eg. General"
          className="col-span-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextInput
          withAsterisk
          label="Title"
          placeholder="eg. Display"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextInput
          withAsterisk
          label="Description"
          placeholder="eg. FHD Display"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="self-end ">
        <button
          onClick={handleAddService}
          className="mt-4 w-fit cursor-pointer rounded-md bg-blue-500  p-2 text-white shadow-md"
        >
          <IoMdAddCircle size={20} />
        </button>
      </div>
      <div>
        {specificationStepData.length > 0 && (
          <p className="mt-4 border-b-2 py-2 font-semibold">Preview</p>
        )}
        <div className=" thin-scrollbar h-[50rem] overflow-auto md:h-fit">
          {specificationStepData.map((item, i) => (
            <div key={i} className=" border-b py-2">
              <div className="flex items-center gap-x-2 ">
                <p className="py-2 font-semibold text-gray-800">
                  {item.category}
                </p>
                <MdDelete
                  onClick={() => handleDeleteByCategory(item.category)}
                  size={18}
                  className="cursor-pointer text-gray-400"
                />
              </div>

              <Table horizontalSpacing={"xs"}>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Title</Table.Th>
                    <Table.Th>Category name</Table.Th>
                    <Table.Th>Remove</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {item.items.map((element, i) => (
                    <Table.Tr className="text-gray-800" key={i}>
                      <Table.Td>{element.title}</Table.Td>
                      <Table.Td>{element.description}</Table.Td>
                      <Table.Td>
                        <RxCross2
                          className=" cursor-pointer"
                          onClick={() =>
                            handleDeleteItem(
                              item.category,
                              element.title,
                              element.description
                            )
                          }
                        />
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          ))}
        </div>
      </div>
      <div className="float-end flex items-center gap-4 self-end py-4">
        <div className="mt-8 text-end">
          <button
            type="submit"
            className="rounded-sm border-[1.5px] bg-white px-4 py-2 text-sm font-semibold text-gray-500 shadow-md "
            onClick={nextStep}
          >
            Skip
          </button>
        </div>
        <div className="mt-8 text-end">
          <button
            type="submit"
            className="rounded-sm bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md "
            onClick={prevStep}
          >
            Previous
          </button>
        </div>
        <div className="mt-8 text-end">
          <button
            type="submit"
            className="rounded-sm bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md "
            onClick={handleFormSubmit}
            disabled={
              isEditProduct ? updateProductIsPending : addProductIsPending
            }
          >
            {isEditProduct ? "Save" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  )
}

export default SpecificationStep
