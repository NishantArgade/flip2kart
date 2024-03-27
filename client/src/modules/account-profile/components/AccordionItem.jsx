import {
  Accordion,
  Group,
  NumberInput,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core"
import { useEffect, useState } from "react"
import { getAddressString } from "../../../utils/helper"
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
  const [inputs, setInputs] = useState({})
  const [errors, setErrors] = useState({})

  const { mutate: updateAddressMutate, isPending: updateAddressIsPending } =
    useMutation({
      mutationKey: "updateAddress",
      mutationFn: updateAddress,
      onSuccess: () => {
        queryClient.invalidateQueries("allMyAddresses")
        setActiveItem(null)
        setIsEdit(true)
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

  function validate() {
    const validateField = (field, message) => (field ? null : message)

    const validatePhone = (phone) => {
      if (!phone) return "Mobile number is required"

      phone = String(phone)
      if (phone.length === 10 || phone.length === 12) return null
      return "Invalid mobile number"
    }

    const validateAlternatePhone = (phone) => {
      if (!phone) return null

      phone = String(phone)
      if (phone.length === 10 || phone.length === 12) return null
      return "Invalid mobile number"
    }

    const validatePincode = (pincode) => {
      if (!pincode) return "Pincode is required"

      pincode = String(pincode)
      if (pincode.length === 6) return null
      else return "Invalid pincode"
    }

    const errors = {
      user_name: validateField(inputs?.user_name, "Name is required"),
      phone: validatePhone(inputs?.phone),
      alternate_phone: validateAlternatePhone(inputs?.alternate_phone),
      city: validateField(inputs?.city, "City is required"),
      state: validateField(inputs?.state, "State is required"),
      pincode: validatePincode(inputs?.pincode),
    }

    const hasErrors = Object.values(errors).some((error) => error !== null)

    if (hasErrors) setErrors(errors || {})
    else setErrors({})

    return hasErrors
  }

  const handleUpdateAddress = (e, addressID) => {
    e.preventDefault()

    if (validate()) return

    updateAddressMutate({ addressID, payload: inputs })
  }
  const handleDeleteAddress = (addressID) => {
    deleteAddressMutate(addressID)
  }

  function handleCancelEdit() {
    // setInputs({})
    setIsEdit(true)
  }

  function handleInputChange(e, name = null, value = null) {
    name = name ? name : e?.target?.name || ""
    value = value ? value : e?.target?.value || ""

    setInputs((state) => ({
      ...state,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((state) => ({
        ...state,
        [name]: null,
      }))
    }
  }

  useEffect(() => {
    setInputs({ ...item })
  }, [item])

  return (
    <Accordion.Item value={item._id}>
      <Accordion.Control onClick={handleCancelEdit}>
        <AccordionLabel {...item} address={getAddressString(item)} />
      </Accordion.Control>
      <Accordion.Panel>
        <div className="md:px-4">
          <form onSubmit={(e) => handleUpdateAddress(e, item._id)}>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <TextInput
                  label="Name"
                  placeholder="john"
                  disabled={isEdit}
                  value={inputs?.user_name || ""}
                  name="user_name"
                  onChange={(e) => handleInputChange(e)}
                />
                <p className="text-xs text-red-500">{errors.user_name}</p>
              </div>
              <div className="flex flex-col gap-1">
                <NumberInput
                  hideControls
                  label="Mobile Number"
                  placeholder="Mobile Number"
                  disabled={isEdit}
                  value={inputs?.phone || ""}
                  name="phone"
                  onChange={(value) => handleInputChange(null, "phone", value)}
                />
                <p className="text-xs text-red-500">{errors.phone}</p>
              </div>
              <div className="flex flex-col gap-1">
                <TextInput
                  label="Country"
                  placeholder="Country"
                  disabled={isEdit}
                  value={inputs?.country || ""}
                  name="country"
                  onChange={(e) => handleInputChange(e)}
                />
                <p className="text-xs text-red-500">{errors.country}</p>
              </div>
              <div className="flex flex-col gap-1">
                <TextInput
                  label="State"
                  placeholder="State"
                  disabled={isEdit}
                  value={inputs?.state || ""}
                  name="state"
                  onChange={(e) => handleInputChange(e)}
                />
                <p className="text-xs text-red-500">{errors.state}</p>
              </div>
              <div className="flex flex-col gap-1">
                <TextInput
                  label="City"
                  placeholder="City"
                  disabled={isEdit}
                  value={inputs?.city || ""}
                  name="city"
                  onChange={(e) => handleInputChange(e)}
                />
                <p className="text-xs text-red-500">{errors.city}</p>
              </div>
              <div className="flex flex-col gap-1">
                <TextInput
                  label="Landmark"
                  placeholder="Landmark (Optional)"
                  disabled={isEdit}
                  value={inputs?.landmark || ""}
                  name="landmark"
                  onChange={(e) => handleInputChange(e)}
                />
                <p className="text-xs text-red-500">{errors.landmark}</p>
              </div>
              <div className="flex flex-col gap-1">
                <NumberInput
                  hideControls
                  label="Pincode"
                  placeholder="Pincode"
                  disabled={isEdit}
                  value={inputs?.pincode || ""}
                  name="pincode"
                  onChange={(value) =>
                    handleInputChange(null, "pincode", value)
                  }
                />
                <p className="text-xs text-red-500">{errors.pincode}</p>
              </div>
              <div className="flex flex-col gap-1">
                <NumberInput
                  hideControls
                  label="Alternate Phone (Optional)"
                  placeholder="Alternate Mobile Number"
                  disabled={isEdit}
                  value={inputs?.alternate_phone || ""}
                  name="alternate_phone"
                  onChange={(value) =>
                    handleInputChange(null, "alternate_phone", value)
                  }
                />
                <p className="text-xs text-red-500">{errors.alternate_phone}</p>
              </div>
              <div className="flex flex-col gap-1">
                <Textarea
                  label="Area or Street"
                  placeholder="Area or Street"
                  autosize
                  minRows={2}
                  maxRows={4}
                  mt={12}
                  disabled={isEdit}
                  value={inputs?.street || ""}
                  name="street"
                  onChange={(e) => handleInputChange(e)}
                />
                <p className="text-xs text-red-500">{errors.street}</p>
              </div>
            </div>

            <div className="mt-5">
              {isEdit ? (
                <div className="flex items-center justify-start gap-x-2">
                  <button
                    type="button"
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
