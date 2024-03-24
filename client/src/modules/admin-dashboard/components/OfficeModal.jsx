import { Modal, NumberInput, TextInput } from "@mantine/core"
import "react-datepicker/dist/react-datepicker.css"
import { useForm } from "@mantine/form"
import DatePicker from "react-datepicker"
import { IoCalendarOutline } from "react-icons/io5"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { addOffice, editOffice } from "../../../api/officeApi"
import { queryClient } from "../../../main"

function OfficeModal({ opened, close, isEdit = false, officeData }) {
  const [establishedAt, setEstablishedAt] = useState(null)

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

  const form = useForm({
    initialValues: {
      manager: "",
      country: "",
      state: "",
      city: "",
      phone: "",
      landline: "",
      email: "",
    },

    validate: {
      manager: (value) => {
        if (!value) return "field should not be empty"
        return value.length < 2
          ? "first name must have at least 2 letters"
          : null
      },
      email: (value) => {
        if (!value) return "Email is required"
        return emailRegex.test(value) ? null : "Invalid email"
      },
      phone: (value) => {
        if (!value) return "Mobile number is required"
        return value.toString().length === 10 || value.toString().length === 12
          ? null
          : "Invalid mobile number"
      },
      landline: (value) => {
        if (!value) return "Mobile number is required"
        return value.toString().length === 10 || value.toString().length === 12
          ? null
          : "Invalid mobile number"
      },
    },
  })

  const { mutate: addOfficeMutate, isPending: addOfficeIsPending } =
    useMutation({
      mutationKey: "addOffice",
      mutationFn: addOffice,
      onSuccess: () => {
        queryClient.invalidateQueries("allOffices")
        close()
        setEstablishedAt(null)
        form.reset()
      },
    })

  const { mutate: editOfficeMutate, isPending: editOfficeIsPending } =
    useMutation({
      mutationKey: "editOffice",
      mutationFn: editOffice,
      onSuccess: () => {
        queryClient.invalidateQueries("allOffices")
        close()
        setEstablishedAt(null)
        form.reset()
      },
    })

  function handleSubmit(values) {
    if (isEdit)
      editOfficeMutate({
        id: officeData?._id,
        payload: { ...values, established_at: establishedAt },
      })
    else addOfficeMutate({ ...values, established_at: establishedAt })
  }

  function setInput(data) {
    if (data) {
      form.setValues(data)
      setEstablishedAt(new Date(data?.established_at))
    } else {
      form.reset()
      setEstablishedAt(null)
    }
  }

  function handleClose() {
    close()
    if (isEdit) {
      setInput(officeData)
    } else {
      setInput(null)
    }
  }

  useEffect(() => {
    if (isEdit) {
      setInput(officeData)
    } else {
      setInput(null)
    }
  }, [officeData, isEdit])

  return (
    <>
      <Modal
        size={"lg"}
        opened={opened}
        onClose={handleClose}
        title={isEdit ? "Edit Office" : "Add Office"}
        closeOnClickOutside={false}
        centered
      >
        <form onSubmit={form.onSubmit(handleSubmit)} className="my-2">
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label="Manager"
              placeholder="Manager name"
              {...form.getInputProps("manager")}
              // disabled={!personalInfoEdit}
              withAsterisk
              size="xs"
            />
            <TextInput
              label="Country"
              placeholder="Country name"
              {...form.getInputProps("country")}
              // disabled={!personalInfoEdit}
              size="xs"
            />
            <TextInput
              label="State"
              placeholder="State name"
              withAsterisk
              {...form.getInputProps("state")}
              // disabled={!emailEdit}
              size="xs"
            />
            <TextInput
              label="City"
              placeholder="City name"
              withAsterisk
              {...form.getInputProps("city")}
              size="xs"
            />
            <TextInput
              label="Email"
              placeholder="Email address"
              withAsterisk
              {...form.getInputProps("email")}
              size="xs"
            />
            <NumberInput
              hideControls
              label="Mobile"
              placeholder="Mobile number"
              withAsterisk
              {...form.getInputProps("phone")}
              // disabled={!mobileEdit}
              size="xs"
            />
            <NumberInput
              hideControls
              label="Landline number"
              placeholder="Landline number"
              withAsterisk
              {...form.getInputProps("landline")}
              size="xs"
            />

            <div>
              <div className="mb-[0.2rem] mt-1 text-xs font-medium">
                Established At
              </div>
              <DatePicker
                size="xs"
                showIcon
                icon={<IoCalendarOutline className="w-auto py-3 text-xs" />}
                selected={establishedAt}
                onChange={(date) => setEstablishedAt(date)}
                className="w-full cursor-pointer border-2  text-xs outline-blue-400"
                placeholderText="Date of establishment"
                maxDate={new Date()}
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <div className="flex flex-col self-start">
              <button
                onClick={handleClose}
                className="mt-6 rounded-sm border-[1.5px] border-gray-200 bg-white px-6 py-2 text-xs text-gray-800 shadow-md"
                type="button"
              >
                CANCEL
              </button>
            </div>
            <div className="flex flex-col self-start">
              <button
                type="submit"
                className="mt-6 rounded-sm bg-blue-600 px-6 py-2 text-xs text-white shadow-md"
                disabled={isEdit ? editOfficeIsPending : addOfficeIsPending}
              >
                {isEdit ? "UPDATE" : "SAVE"}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default OfficeModal
