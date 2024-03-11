import {
  Group,
  Modal,
  NumberInput,
  Radio,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useEffect, useState } from "react"
import { editUser } from "../api/userApi"
import { queryClient } from "../main"
import { useMutation } from "@tanstack/react-query"

function EditUserModal({ opened, close, userId, selectedUser }) {
  const [selectedGender, setSelectedGender] = useState("")
  const [selectedRole, setSelectedRole] = useState("")

  const { mutate, isPending } = useMutation({
    mutationKey: ["editUser"],
    mutationFn: editUser,
    onSuccess: () => {
      close()
      form.reset()
      queryClient.invalidateQueries("allUsers")
    },
    onError: () => {
      close()
      console.log("Error")
      form.reset()
    },
  })

  function handleUserEditSubmit(values) {
    mutate({
      userID: selectedUser?._id,
      payload: { ...values, gender: selectedGender, role: selectedRole },
    })
  }

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    },

    validate: {
      first_name: (value) => {
        if (!value) return "This field is required"
      },
      email: (value) => {
        if (!value) return "This field is required"
        return emailRegex.test(value) ? null : "Invalid email"
      },
      phone: (value) => {
        if (!value) return "This field is required"
        return value.toString().length === 10 || value.toString().length === 12
          ? null
          : "Invalid mobile number"
      },
    },
  })

  const closeAndReset = (e) => {
    e?.preventDefault()
    close()

    form.setValues({
      first_name: selectedUser?.first_name || "",
      last_name: selectedUser?.last_name || "",
      email: selectedUser?.email || "",
      phone: selectedUser?.phone || "",
    })
    setSelectedGender(selectedUser?.gender)
    setSelectedRole(selectedUser?.role)
  }

  useEffect(() => {
    form.setValues({
      first_name: selectedUser?.first_name || "",
      last_name: selectedUser?.last_name || "",
      email: selectedUser?.email || "",
      phone: selectedUser?.phone || "",
    })

    setSelectedGender(selectedUser?.gender)
    setSelectedRole(selectedUser?.role)
  }, [selectedUser])

  return (
    <>
      <Modal
        size={"lg"}
        opened={opened}
        onClose={closeAndReset}
        title="Edit User"
        closeOnClickOutside={false}
        centered
        key={userId}
      >
        <div>
          <form className="">
            <p className="border-t-2 py-2 text-sm font-medium">User Info: </p>
            <div className="mb-5 grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <TextInput
                  label="First Name"
                  placeholder="First Name"
                  withAsterisk
                  size="xs"
                  value={form.values.first_name}
                  onChange={(e) => {
                    form.setFieldValue("first_name", e.target.value)
                  }}
                  styles={{
                    input: {
                      border: form.errors.first_name ? "1px solid red" : "",
                    },
                  }}
                />
                {form.errors.first_name && (
                  <div className="mt-1 text-[0.70rem] text-red-500">
                    {form.errors.first_name}
                  </div>
                )}
              </div>
              <TextInput
                label="Last Name"
                placeholder="Last Name"
                value={form.values.last_name}
                onChange={(e) => {
                  form.setFieldValue("last_name", e.target.value)
                }}
                size="xs"
              />
              <div className="flex flex-col">
                <TextInput
                  label="Email"
                  placeholder="Email"
                  withAsterisk
                  size="xs"
                  value={form.values.email}
                  onChange={(e) => {
                    form.setFieldValue("email", e.target.value)
                  }}
                  styles={{
                    input: {
                      border: form.errors.email ? "1px solid red" : "",
                    },
                  }}
                />
                {form.errors.email && (
                  <div className="mt-1 text-[0.70rem] text-red-500">
                    {form.errors.email}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <NumberInput
                  hideControls
                  label="Mobile"
                  placeholder="Mobile"
                  withAsterisk
                  size="xs"
                  value={form.values.phone}
                  onChange={(value) => {
                    form.setFieldValue("phone", value)
                  }}
                  styles={{
                    input: {
                      border: form.errors.phone ? "1px solid red" : "",
                    },
                  }}
                />
                {form.errors.phone && (
                  <div className="mt-1 text-[0.70rem] text-red-500">
                    {form.errors.phone}
                  </div>
                )}
              </div>
              <Select
                label="Role"
                withAsterisk
                placeholder="Select Role"
                size="xs"
                data={["admin", "user", "operator"]}
                value={selectedRole}
                onChange={setSelectedRole}
                allowDeselect={false}
              />
              <Radio.Group
                name="Gender"
                label="Gender"
                value={selectedGender}
                onChange={setSelectedGender}
                size="xs"
              >
                <Group pt={6}>
                  <Radio value="male" label="Male" size="xs" />
                  <Radio value="female" label="Female" size="xs" />
                </Group>
              </Radio.Group>
            </div>

            <div className="flex items-center justify-end gap-4">
              <div className="flex flex-col self-start">
                <button
                  onClick={closeAndReset}
                  className="mt-6 rounded-sm border-[1.5px] border-gray-200 bg-white px-6 py-2 text-xs text-gray-800 shadow-md"
                >
                  CANCEL
                </button>
              </div>
              <div className="flex flex-col self-start">
                <button
                  onClick={form.onSubmit(handleUserEditSubmit)}
                  className="mt-6 rounded-sm bg-blue-600 px-6 py-2 text-xs text-white shadow-md"
                  disabled={isPending}
                >
                  SAVE
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      {/* <FaEdit onClick={open} size={16} className="cursor-pointer" /> */}
    </>
  )
}

export default EditUserModal
