import {
  Accordion,
  Group,
  NumberInput,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core"
import React, { useEffect, useState } from "react"
import { getAddressString } from "../../../utils/helper"
import { useForm } from "@mantine/form"
import { useMutation } from "@tanstack/react-query"
import { deleteAddress, updateAddress } from "../../../api/addressApi"
import { queryClient } from "../../../main"

function AccordionLabel({ user_name, phone, address }) {
  return (
    <Group wrap="nowrap">
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

const AccordionItem = ({ item, setActiveItem }) => {
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

  const { mutate: updateAddressMutate, isPending: updateAddressIsPending } =
    useMutation({
      mutationKey: "updateAddress",
      mutationFn: updateAddress,
      onSuccess: () => {
        setActiveItem(null)
        setIsEdit(true)
        queryClient.invalidateQueries("allMyAddresses")
      },
    })

  const { mutate: deleteAddressMutate, isPending: deleteAddressIsPending } =
    useMutation({
      mutationKey: "deleteAddress",
      mutationFn: deleteAddress,
      onSuccess: () => {
        queryClient.invalidateQueries("allMyAddresses")
      },
    })

  const handleUpdateAddress = (addressID, values) => {
    updateAddressMutate({ addressID, payload: values })
  }
  const handleDeleteAddress = (addressID) => {
    deleteAddressMutate(addressID)
  }

  function handleCancelEdit() {
    form.reset()
    setIsEdit(true)
  }
  return (
    <Accordion.Item value={item._id} key={item._id}>
      <Accordion.Control onClick={handleCancelEdit}>
        <AccordionLabel {...item} address={getAddressString(item)} />
      </Accordion.Control>
      <Accordion.Panel>
        <div className="md:px-4">
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

            <div className="mt-5">
              {isEdit ? (
                <div className="flex items-center justify-start gap-x-2">
                  <button
                    className=" rounded-sm bg-[#2874F0] px-6 py-3 text-xs font-medium uppercase text-white shadow-md "
                    disabled={updateAddressIsPending}
                    onClick={(e) => {
                      e.preventDefault()
                      setIsEdit(false)
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteAddress(item._id)}
                    className="float-end rounded-sm bg-[#FB641B] px-6 px-6 py-3 py-3 text-xs font-medium uppercase text-white shadow-md"
                    disabled={deleteAddressIsPending}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-start gap-x-3">
                  <button
                    className=" rounded-sm bg-[#2874F0] px-6 py-3 text-xs font-medium uppercase text-white shadow-md "
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
              )}
            </div>
          </form>
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  )
}

export default AccordionItem
