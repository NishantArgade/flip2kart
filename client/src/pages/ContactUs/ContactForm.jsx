import { TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import React from "react"

const ContactForm = () => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },

    validate: {
      name: (value) => {
        if (!value) return "Name is required"
      },
      email: (value) => {
        if (!value) return "Email is required"
        return emailRegex.test(value) ? null : "Invalid email"
      },
      message: (value) => {
        if (!value) return "Message is required"
      },
    },
  })

  return (
    <div className=" w-full pb-6">
      <div className="flex items-center justify-center py-2">
        <div>
          <p className="mb-8 mt-4 text-center text-xl font-semibold text-gray-500">
            Contact Form
          </p>
          <form onSubmit={form.onSubmit(console.log)}>
            <div className="grid grid-cols-2 gap-3">
              <TextInput
                withAsterisk
                label="Name"
                placeholder="john"
                {...form.getInputProps("name")}
              />
              <TextInput
                withAsterisk
                label="Email"
                placeholder="xyz@gmail.com"
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Subject"
                placeholder="Subject"
                {...form.getInputProps("subject")}
                className="col-span-2"
              />
              <div className="col-span-2">
                <label
                  htmlFor="message"
                  className="mb-1 block text-sm font-medium text-gray-900"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Message..."
                  {...form.getInputProps("message")}
                  className={`${
                    form.errors.message ? " border-red-500" : "border-gray-300"
                  } h-24 w-full resize-none rounded-md border-[1.5px] p-2 text-sm outline-none focus:border-blue-500`}
                />
                {form.errors.message && (
                  <p className="text-[0.78rem] font-normal text-red-500">
                    Message is required
                  </p>
                )}
              </div>
            </div>
            <button
              className="float-end mt-4 w-full rounded-md bg-[#2874F0] px-4 py-2 text-sm font-semibold text-white shadow-md"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactForm