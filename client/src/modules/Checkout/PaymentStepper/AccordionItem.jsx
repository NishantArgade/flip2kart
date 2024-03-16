import {
  Accordion,
  Group,
  NumberInput,
  Radio,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core"
import React, { useState } from "react"
import { getAddressString } from "../../../utils/helper"
import { useForm } from "@mantine/form"
import { useMutation } from "@tanstack/react-query"
import { updateAddress } from "../../../api/addressApi"
import { queryClient } from "../../../main"

function AccordionLabel({ user_name, phone, isActive, address }) {
  return (
    <Group wrap="nowrap">
      <div>
        <Radio size="xs" defaultChecked={isActive} readOnly />
      </div>
      <div>
        <div className="flex items-center gap-x-4">
          <Text size="sm">{user_name}</Text>
          <Text size="sm">{phone}</Text>
        </div>
        <Text className="mt-1 text-xs" size="sm" c="dimmed" fw={400}>
          {address}
        </Text>
      </div>
    </Group>
  )
}

const AccordionItem = ({ item, nextStep, activeItem, setPaymentData }) => {
  const [isEdit, setIsEdit] = useState(true)

  const form = useForm({
    initialValues: {
      user_name: item?.user_name,
      phone: item?.phone,
      alternate_phone: item?.alternate_phone,
      country: item?.country,
      city: item?.city,
      state: item?.state,
      landmark: item?.landmark,
      pincode: item?.pincode,
      street: item?.street,
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
      city: (value) => {
        if (!value) return "field is required"
        return value.length < 2 ? "Wrong city" : null
      },
      state: (value) => {
        if (!value) return "field is required"
        return value.length < 2 ? "Wrong state" : null
      },
      pincode: (value) => {
        if (!value) return "field is required"
        return value.toString().length === 6 ? null : "Wrong pincode"
      },
    },
  })

  function handleCancelEdit() {
    // form.reset()
    setIsEdit(true)
  }
  const { mutate: updateAddressMutate, isPending: updateAddressIsPending } =
    useMutation({
      mutationKey: "updateAddress",
      mutationFn: updateAddress,
      onSuccess: () => {
        queryClient.invalidateQueries("allMyAddresses")
        setIsEdit(true)
      },
    })

  const handleUpdateAddress = (addressID, values) => {
    updateAddressMutate({ addressID, payload: values })
  }

  function handleDeliverClick() {
    setPaymentData((prev) => ({
      ...prev,
      shipping_address: getAddressString(item),
    }))

    nextStep()
  }
  return (
    <Accordion.Item value={item._id}>
      <Accordion.Control onClick={handleCancelEdit}>
        <AccordionLabel
          {...item}
          isActive={item._id == activeItem}
          address={getAddressString(item)}
          activeItem={activeItem}
        />
      </Accordion.Control>
      <Accordion.Panel>
        {isEdit ? (
          <div className="flex justify-between">
            <Text
              className="mt-2 w-fit cursor-pointer self-end bg-[#FB641B] px-10   py-3  text-white shadow-md"
              size="xs"
              onClick={handleDeliverClick}
            >
              DELIVER HERE
            </Text>

            <button
              className="text-xs font-medium uppercase text-[#2874F0]"
              // disabled={updateAddressIsPending}
              onClick={(e) => {
                e.preventDefault()
                setIsEdit(false)
              }}
            >
              Edit
            </button>
          </div>
        ) : (
          <form
            onSubmit={form.onSubmit((values) =>
              handleUpdateAddress(item._id, values)
            )}
          >
            <div className="grid grid-cols-2 gap-3">
              <TextInput
                label="Name"
                placeholder="john"
                {...form.getInputProps("user_name")}
                disabled={isEdit}
              />

              <NumberInput
                hideControls
                label="Mobile Number"
                placeholder="Mobile Number"
                {...form.getInputProps("phone")}
                disabled={isEdit}
              />
              <TextInput
                label="Country"
                placeholder="Country"
                {...form.getInputProps("country")}
                disabled={isEdit}
              />
              <TextInput
                label="State"
                placeholder="State"
                {...form.getInputProps("state")}
                disabled={isEdit}
              />
              <TextInput
                label="City"
                placeholder="City"
                {...form.getInputProps("city")}
                disabled={isEdit}
              />
              <TextInput
                label="Landmark"
                placeholder="Landmark (Optional)"
                {...form.getInputProps("landmark")}
                disabled={isEdit}
              />
              <NumberInput
                hideControls
                label="Pincode"
                placeholder="Pincode"
                {...form.getInputProps("pincode")}
                disabled={isEdit}
              />
              <NumberInput
                hideControls
                label="Alternate Phone (Optional)"
                placeholder="Alternate Mobile Number"
                {...form.getInputProps("alternate_phone")}
                disabled={isEdit}
              />
            </div>
            <Textarea
              label="Area or Street"
              placeholder="Area or Street"
              {...form.getInputProps("street")}
              autosize
              minRows={2}
              maxRows={4}
              mt={12}
              disabled={isEdit}
            />

            <div className="mt-5 flex items-center justify-start gap-x-2">
              <button
                className="rounded-sm bg-[#2874F0] px-6 py-3 text-xs font-medium uppercase text-white shadow-md "
                disabled={updateAddressIsPending}
                type="submit"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="cursor-pointer px-4 py-3 text-sm font-semibold text-blue-500"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Accordion.Panel>
    </Accordion.Item>
  )
}

export default AccordionItem
