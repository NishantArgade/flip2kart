import { Modal } from "@mantine/core"
import "react-datepicker/dist/react-datepicker.css"
import { useForm } from "@mantine/form"

function OfferModal({ opened, close, isEdit = false }) {
  const form = useForm({
    initialValues: {
      offer: "",
    },

    validate: {},
  })

  return (
    <>
      <Modal
        size={"lg"}
        opened={opened}
        onClose={close}
        title={isEdit ? "Edit Offer" : "Add Offer"}
        closeOnClickOutside={false}
        centered
      >
        <form onSubmit={form.onSubmit(console.log)} className="my-2">
          <div className="w-full">
            <label
              htmlFor="offer"
              className="mb-1 block text-sm font-medium text-gray-900"
            >
              Offer
            </label>
            <textarea
              id="offer"
              placeholder="Type offer"
              {...form.getInputProps("offer")}
              className="h-28 w-full resize-none rounded-md border-[1.5px] border-gray-300 p-2 text-sm outline-none focus:border-blue-500"
            />
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

export default OfferModal
