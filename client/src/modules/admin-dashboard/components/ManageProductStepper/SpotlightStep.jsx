import { TextInput } from "@mantine/core"
import { useState } from "react"
import { IoMdAddCircle } from "react-icons/io"
import { MdDelete } from "react-icons/md"
import _ from "lodash"
import { getPascalCaseString } from "../../../../utils/helper"
import { RxCross2 } from "react-icons/rx"

const SpotlightStep = ({
  nextStep,
  prevStep,
  spotlightStepData,
  setSpotlightStepData,
}) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  function handleAddService() {
    const formatedTitle = getPascalCaseString(title)
    const formatedDescription = getPascalCaseString(description)

    if (!!formatedTitle && !!formatedDescription) {
      const existingItem = _.find(spotlightStepData, { title: formatedTitle })

      if (existingItem) {
        if (!existingItem.description.includes(formatedDescription))
          existingItem.description.push(formatedDescription)
      } else {
        spotlightStepData.push({
          title: formatedTitle,
          description: [formatedDescription],
        })
      }

      setTitle("")
      setDescription("")
    }
  }

  function handleSumbit() {
    nextStep()
  }

  function handleDeleteDescription(title, descriptionToDelete) {
    setSpotlightStepData((prevData) => {
      const dataCopy = [...prevData]
      const item = dataCopy.find((d) => d.title === title)

      if (item) {
        item.description = item.description.filter(
          (desc) => desc !== descriptionToDelete
        )
      }

      if (item.description.length === 0)
        return dataCopy.filter((item) => item.title !== title)

      return dataCopy
    })
  }

  function handleDeleteService(title) {
    setSpotlightStepData((prevData) =>
      prevData.filter((item) => item.title !== title)
    )
  }

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
        <TextInput
          withAsterisk
          label="Title"
          placeholder="eg. Service"
          className="w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextInput
          withAsterisk
          label="Description"
          placeholder="eg. Cash on delivery"
          className="w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={handleAddService}
          className="flex h-9 w-10 cursor-pointer  flex-col items-center justify-center self-end rounded-md bg-blue-500 text-white  shadow-md md:w-20"
        >
          <IoMdAddCircle size={20} />
        </button>
      </div>

      <div className="">
        {spotlightStepData.length > 0 && (
          <p className="mt-4 border-b-2 py-2 font-semibold">Preview</p>
        )}
        <div className="thin-scrollbar overflow-auto md:h-fit">
          {spotlightStepData.map((spotlight, i) => (
            <div key={i} className=" border-b py-2">
              <div className="flex items-center gap-x-2 ">
                <p className="py-2 font-semibold text-gray-800">
                  {spotlight?.title}
                </p>
                <MdDelete
                  size={18}
                  className="cursor-pointer text-gray-400"
                  onClick={() => handleDeleteService(spotlight?.title)}
                />
              </div>

              {spotlight?.description?.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="flex items-center gap-x-4 border-t-[1.5px] py-1"
                  >
                    <p>{item}</p>
                    <button
                      onClick={() =>
                        handleDeleteDescription(spotlight.title, item)
                      }
                    >
                      <RxCross2 size={18} />
                    </button>
                  </div>
                )
              })}
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
            className="rounded-sm bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md "
            onClick={handleSumbit}
          >
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default SpotlightStep
