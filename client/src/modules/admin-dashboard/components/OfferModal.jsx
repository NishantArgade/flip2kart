import { Modal } from "@mantine/core"
import "react-datepicker/dist/react-datepicker.css"
import { useForm } from "@mantine/form"
import { useMutation } from "@tanstack/react-query"
import { addOffer, editOffer } from "../../../api/offerApi"
import { toast } from "../../../utils/toast"
import { useEffect } from "react"
import { queryClient } from "../../../main"

function OfferModal({ opened, close, isEdit = false, offerData }) {
  const form = useForm({
    initialValues: {
      offer: "",
    },

    validate: {},
  })

  const { mutate: addOfferMutate, isPending: addOfferIsPending } = useMutation({
    mutationKey: "addOffer",
    mutationFn: addOffer,
    onSuccess: () => {
      queryClient.invalidateQueries("getAllOffers")
      toast.success("Offer added successfully")
      close()
      form.reset()
    },
  })
  const { mutate: editOfferMutate, isPending: editOfferIsPending } =
    useMutation({
      mutationKey: "editOffer",
      mutationFn: editOffer,
      onSuccess: () => {
        queryClient.invalidateQueries("getAllOffers")
        toast.success("Offer edited successfully")
        close()
        form.reset()
      },
    })

  function handleSubmit(values) {
    if (isEdit) editOfferMutate({ id: offerData._id, payload: values })
    else addOfferMutate(values)
  }

  function handleClose() {
    close()
    if (isEdit) {
      form.setFieldValue("offer", offerData.offer)
    } else {
      form.setFieldValue("offer", "")
    }
  }

  useEffect(() => {
    if (isEdit) {
      form.setFieldValue("offer", offerData.offer)
    } else {
      form.setFieldValue("offer", "")
    }
  }, [offerData.offer, isEdit])

  return (
    <>
      <Modal
        size={"lg"}
        opened={opened}
        onClose={!addOfferIsPending || !editOfferIsPending ? handleClose : null}
        title={isEdit ? "Edit Offer" : "Add Offer"}
        closeOnClickOutside={false}
        centered
      >
        <form onSubmit={form.onSubmit(handleSubmit)} className="my-2">
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
                onClick={handleClose}
                type="button"
                disabled={addOfferIsPending || editOfferIsPending}
                className="mt-6 rounded-sm border-[1.5px] border-gray-200 bg-white px-6 py-2 text-xs text-gray-800 shadow-md"
              >
                CANCEL
              </button>
            </div>
            <div className="flex flex-col self-start">
              <button
                type="submit"
                className="mt-6 rounded-sm bg-blue-600 px-6 py-2 text-xs text-white shadow-md"
                disabled={addOfferIsPending || editOfferIsPending}
              >
                {isEdit ? "UPDATE" : "ADD"}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default OfferModal
