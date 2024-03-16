import { Accordion, NumberInput, TextInput, Textarea } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useMutation } from "@tanstack/react-query"
import React from "react"
import { IoIosAdd } from "react-icons/io"
import { queryClient } from "../../../main"
import { addAddress } from "../../../api/addressApi"
import { getAddressString } from "../../../utils/helper"

const AddAddressAccordionItem = ({
  setActiveItem,
  nextStep,
  setPaymentData,
}) => {
  const form = useForm({
    initialValues: {
      user_name: "",
      phone: "",
      alternate_phone: "",
      country: "",
      city: "",
      state: "",
      landmark: "",
      pincode: "",
      street: "",
    },
    validate: {
      user_name: (value) => {
        if (!value) return "name is required"
        return value.length < 2 ? "Name must have at least 2 letters" : null
      },
      phone: (value) => {
        if (!value) return "Mobile number is required"
        return value.toString().length === 10 || value.toString().length === 12
          ? null
          : "Invalid mobile number"
      },
      country: (value) => {
        if (!value) return "field is required"
      },
      pincode: (value) => {
        if (!value) return "field is required"
        return value.toString().length === 6 ? null : "Wrong pincode"
      },
    },
  })
  const { mutate: addAddressMutate, isPending: addAddressIsPending } =
    useMutation({
      mutationKey: "addAddress",
      mutationFn: addAddress,
      onSuccess: () => {
        setActiveItem(null)
        form.reset()
        queryClient.invalidateQueries("allMyAddresses")
      },
    })

  function handleFormSubmit(values) {
    addAddressMutate(values)
  }

  function handleCancel() {
    setActiveItem(null)
    form.reset()
  }
  function handleClickContinue() {
    setPaymentData((prev) => ({
      ...prev,
      shipping_address: getAddressString({ ...form.values }),
    }))

    nextStep()
  }
  return (
    <Accordion.Item value={"add-new-address"}>
      <Accordion.Control>
        <div className="flex items-center gap-x-2 text-sm text-blue-500">
          <IoIosAdd size={22} />
          <div>Add a new address</div>
        </div>
      </Accordion.Control>
      <Accordion.Panel>
        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <div className="grid grid-cols-2 gap-3">
            <TextInput
              label="Name"
              withAsterisk
              placeholder="john"
              {...form.getInputProps("user_name")}
            />

            <NumberInput
              hideControls
              label="Mobile Number"
              placeholder="Mobile Number"
              withAsterisk
              {...form.getInputProps("phone")}
            />
            <TextInput
              label="Country"
              placeholder="Country"
              withAsterisk
              {...form.getInputProps("country")}
            />
            <TextInput
              label="State"
              placeholder="State"
              {...form.getInputProps("state")}
            />
            <TextInput
              label="City"
              placeholder="City"
              {...form.getInputProps("city")}
            />
            <TextInput
              label="Landmark"
              placeholder="Landmark (Optional)"
              {...form.getInputProps("landmark")}
            />
            <NumberInput
              hideControls
              label="Pincode"
              placeholder="Pincode"
              withAsterisk
              {...form.getInputProps("pincode")}
            />
            <NumberInput
              hideControls
              label="Alternate Phone (Optional)"
              placeholder="Alternate Mobile Number"
              {...form.getInputProps("alternate_phone")}
            />
          </div>
          <Textarea
            label="Area or Street"
            placeholder="Area or Street"
            autosize
            minRows={2}
            maxRows={4}
            mt={12}
            {...form.getInputProps("street")}
          />

          <div className="flex items-center justify-between gap-x-2">
            <div>
              <button
                className="text-xm mt-4  rounded-sm bg-[#FB641B] px-6 py-3 font-medium uppercase text-white shadow-md "
                type="submit"
                disabled={addAddressIsPending}
                onClick={handleClickContinue}
              >
                Save and delivery here
              </button>
              <button
                className="mr-2 mt-4 px-6 py-3  text-xs  font-medium uppercase text-blue-500"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </Accordion.Panel>
    </Accordion.Item>
  )
}

export default AddAddressAccordionItem
