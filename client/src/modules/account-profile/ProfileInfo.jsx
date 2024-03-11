import { Group, NumberInput, Radio, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { getUserData, updateProfile } from "../../api/userApi"
import { queryClient } from "../../main"
import { useSelector } from "react-redux"

const ProfileInfo = () => {
  const user = useSelector((state) => state.user.data)

  const [personalInfoEdit, setPersonalInfoEdit] = useState(false)
  const [emailEdit, setEmailEdit] = useState(false)
  const [mobileEdit, setMobileEdit] = useState(false)
  const [gender, setGender] = useState("")

  const personalInfoForm = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
    },

    validate: {
      first_name: (value) => {
        if (!value) return "field should not be empty"
      },
    },
  })

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  const emailForm = useForm({
    initialValues: { email: "" },

    validate: {
      email: (value) => {
        if (!value) return "Email is required"
        return emailRegex.test(value) ? null : "Invalid email"
      },
    },
  })

  const mobileForm = useForm({
    initialValues: { phone: "" },

    validate: {
      phone: (value) => {
        if (!value) return "Mobile number is required"
        return value.toString().length === 10 || value.toString().length === 12
          ? null
          : "Invalid mobile number"
      },
    },
  })

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(user._id),
  })

  useEffect(() => {
    if (!isLoading && !isError && data?.user) {
      const { first_name, last_name, gender, email, phone } = data.user

      personalInfoForm.setFieldValue("first_name", first_name)
      personalInfoForm.setFieldValue("last_name", last_name)
      emailForm.setFieldValue("email", email)
      mobileForm.setFieldValue("phone", phone)
      setGender(gender)
    }
  }, [isLoading, isError, data])

  function handleEmailEdit() {
    setEmailEdit((state) => !state)
  }
  function handleMobileEdit() {
    setMobileEdit((state) => !state)
  }

  const { mutate } = useMutation({
    mutationKey: "updateProfile",
    mutationFn: updateProfile,
    onError: (error) => {
      console.log(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries("userData")
      setPersonalInfoEdit(false)
      setEmailEdit(false)
      setMobileEdit(false)
    },
  })

  function handleProfileUpdate(values) {
    mutate({ userID: user._id, payload: values })
  }

  return (
    <>
      <div className="px-6">
        {/* Personal Information */}
        <div className="py-4">
          <div className="mb-5 flex items-center justify-start gap-x-4">
            <span className="text-base font-semibold ">
              Personal information
            </span>
            <button
              className="pt-1 text-sm font-medium text-blue-500"
              onClick={() => setPersonalInfoEdit((value) => !value)}
            >
              {personalInfoEdit ? "Cancel" : "Edit"}
            </button>
          </div>
          <form
            onSubmit={personalInfoForm.onSubmit((values) =>
              handleProfileUpdate({ ...values, gender })
            )}
            className="flex items-center justify-start gap-x-10"
          >
            <div className="flex flex-col items-start justify-start gap-6 md:flex-row">
              <TextInput
                label="First Name"
                placeholder="First Name"
                value={personalInfoForm?.values?.first_name || ""}
                onChange={(e) => {
                  const newValue = e.target.value.trim().replace(/\s/g, "")
                  personalInfoForm.setFieldValue("first_name", newValue)
                }}
                disabled={!personalInfoEdit}
                size="xs"
              />
              <TextInput
                label="Last Name"
                placeholder="Last Name"
                value={personalInfoForm?.values?.last_name || ""}
                onChange={(e) => {
                  const newValue = e.target.value.trim().replace(/\s/g, "")
                  personalInfoForm.setFieldValue("last_name", newValue)
                }}
                disabled={!personalInfoEdit}
                size="xs"
              />
              <Radio.Group
                name="Gender"
                label="Your Gender"
                value={gender}
                onChange={setGender}
                size="xs"
              >
                <Group
                  pt={6}
                  onChange={(value) => setGender(value.target.value)}
                >
                  <Radio
                    disabled={!personalInfoEdit}
                    value="male"
                    label="Male"
                    size="xs"
                  />
                  <Radio
                    disabled={!personalInfoEdit}
                    value="female"
                    label="Female"
                    size="xs"
                  />
                </Group>
              </Radio.Group>
            </div>
            {personalInfoEdit && (
              <div className="flex flex-col self-start">
                <button
                  type="submit"
                  className="mt-6 rounded-sm bg-blue-600 px-6 py-2 text-xs text-white shadow-md"
                >
                  SAVE
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Email */}
        <div className=" border-t-[1px] py-4">
          <div className="mb-5 flex items-center justify-start gap-x-4">
            <span className="text-base font-semibold ">Email Address</span>
            <button
              className="pt-1 text-sm font-medium text-blue-500"
              onClick={handleEmailEdit}
            >
              {emailEdit ? "Cancel" : "Edit"}
            </button>
          </div>
          <form
            onSubmit={emailForm.onSubmit(handleProfileUpdate)}
            className="flex items-center justify-start gap-x-10"
          >
            <div className="flex items-start justify-start gap-x-6">
              <TextInput
                label="Email"
                placeholder="Email"
                value={emailForm?.values?.email || ""}
                onChange={(e) => {
                  const newValue = e.target.value.trim().replace(/\s/g, "")
                  emailForm.setFieldValue("email", newValue)
                }}
                disabled={!emailEdit}
                size="xs"
              />
            </div>
            {emailEdit && (
              <div className="flex flex-col self-start">
                <button
                  type="submit"
                  className="mt-6 rounded-sm bg-blue-600 px-6 py-2 text-xs text-white shadow-md"
                >
                  SAVE
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Mobile */}
        <div className=" border-t-[1px] py-4">
          <div className="mb-5 flex items-center justify-start gap-x-4">
            <span className="text-base font-semibold ">Mobile Number</span>
            <button
              className="pt-1 text-sm font-medium text-blue-500"
              onClick={handleMobileEdit}
            >
              {mobileEdit ? "Cancel" : "Edit"}
            </button>
          </div>
          <form
            onSubmit={mobileForm.onSubmit(handleProfileUpdate)}
            className="flex items-center justify-start gap-x-10"
          >
            <div className="flex items-start justify-start gap-x-6">
              <NumberInput
                hideControls
                label="Mobile"
                placeholder="Mobile"
                {...mobileForm.getInputProps("phone")}
                disabled={!mobileEdit}
                size="xs"
              />
            </div>
            {mobileEdit && (
              <div className="flex flex-col self-start">
                <button
                  type="submit"
                  className="mt-6 rounded-sm bg-blue-600 px-6 py-2 text-xs text-white shadow-md"
                >
                  SAVE
                </button>
              </div>
            )}
          </form>
        </div>

        {/* FAQ's */}
        <div>
          <p className=" py-4 text-base font-semibold">FAQs</p>
          <div className="flex flex-col items-start justify-start gap-y-6 text-xs">
            <div>
              <p className="mb-2 font-semibold">
                What happens when I update my email address (or mobile number)?
              </p>
              <p>
                Your login email id (or mobile number) changes, likewise. You'll
                receive all your account related communication on your updated
                email address (or mobile number)
              </p>
            </div>
            <div>
              <p className="mb-2 font-semibold">
                What happens when I update my email address (or mobile number)?
              </p>
              <p>
                Your login email id (or mobile number) changes, likewise. You'll
                receive all your account related communication on your updated
                email address (or mobile number)
              </p>
            </div>
          </div>
        </div>

        <div />
      </div>
      <img src="/profileBg.png" className="mt-6 w-full" alt="" />
    </>
  )
}

export default ProfileInfo
