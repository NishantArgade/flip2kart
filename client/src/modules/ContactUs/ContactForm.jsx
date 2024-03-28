import { TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import { toast } from "../../utils/toast"
import { sendContactMail } from "../../api/officeApi"
import Spinner from "../../components/Spinner"
import { useSelector } from "react-redux"

const ContactForm = () => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  const user = useSelector((state) => state.user.data)

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

  const { mutate, isPending } = useMutation({
    mutationKey: "contactUs",
    mutationFn: sendContactMail,
    onSuccess: () => {
      toast.success("Message sent successfully")
      form.reset()
      form.setValues({
        name:
          (user?.first_name ? user.first_name : "") +
          " " +
          (user?.last_name ? user?.last_name : ""),
        email: user?.email,
      })
    },
  })

  function handleFormSubmit(values) {
    mutate(values)
  }

  useEffect(() => {
    form.setValues({
      name:
        (user?.first_name ? user.first_name : "") +
        " " +
        (user?.last_name ? user?.last_name : ""),
      email: user?.email,
    })
  }, [user])

  return (
    <div className=" w-full pb-6">
      <div className="flex items-center justify-center px-4 py-2">
        <div>
          <p className="mb-8 mt-4 text-center text-xl font-semibold text-gray-500">
            Contact Form
          </p>
          <form onSubmit={form.onSubmit(handleFormSubmit)}>
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
              className="float-end mt-4 flex w-full justify-center gap-x-2 rounded-md bg-[#2874F0] px-4 py-2 text-sm font-semibold text-white shadow-md"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Spinner size={20} color="green" />
                  <span> Sending</span>
                </>
              ) : (
                <span> Send</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
