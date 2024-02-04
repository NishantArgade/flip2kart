import { PasswordInput, Select, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import React from "react"

const Registration = () => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      address: "",
      password: "",
      confrimPassword: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      firstName: (value) => {
        if (!value) return "First name is required"
        return value.length < 2 ? "Name must have at least 2 letters" : null
      },
      email: (value) => {
        if (!value) return "Email is required"
        return emailRegex.test(value) ? null : "Invalid email"
      },
      password: (value) => (!value ? "Password is required" : null),

      confrimPassword: (value, values) => {
        if (!value) return "Confrim Password is required"
        return value !== values.password ? "Passwords did not match" : null
      },
    },
  })

  return (
    <form onSubmit={form.onSubmit(console.log)}>
      <div className="grid grid-cols-2 gap-x-3">
        <TextInput
          withAsterisk
          label="First Name"
          placeholder="john"
          {...form.getInputProps("firstName")}
        />
        <TextInput
          label="Last Name"
          placeholder="dio"
          {...form.getInputProps("lastName")}
        />
      </div>
      <div className="mt-2 grid grid-cols-3 gap-x-3">
        <TextInput
          withAsterisk
          label="Email"
          placeholder="Email"
          {...form.getInputProps("email")}
          className="col-span-2"
        />
        <Select
          className="col-span-1"
          label="Gender"
          placeholder="Select"
          data={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
          {...form.getInputProps("gender")}
        />
      </div>
      <div className="mt-2">
        <TextInput
          label="Address"
          placeholder="01 street, india"
          {...form.getInputProps("address")}
        />
      </div>
      <div className="mt-2">
        <PasswordInput
          placeholder="*****"
          label="Password"
          description="Password must include at least one letter, number and special character"
          withAsterisk
          className="mb-2"
          {...form.getInputProps("password")}
        />
        <PasswordInput
          placeholder="*****"
          label="Repeat Password"
          withAsterisk
          {...form.getInputProps("confrimPassword")}
        />
      </div>
      <button
        className="float-end mt-4 rounded-md bg-[#2874F0] px-4 py-2 text-sm font-semibold text-white shadow-md"
        type="submit"
      >
        Submit
      </button>
    </form>
  )
}

export default Registration
