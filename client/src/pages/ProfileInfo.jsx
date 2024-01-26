import {
  Box,
  Button,
  Group,
  NumberInput,
  Radio,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect, useMemo, useState } from "react";

const ProfileInfo = () => {
  const [personalInfoEdit, setPersonalInfoEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [mobileEdit, setMobileEdit] = useState(false);
  const [gender, setGender] = useState("male");

  const personalInfoForm = useForm({
    initialValues: { firstName: "", lastName: "", gender: "" },

    validate: {
      firstName: (value) => {
        if (!value) return "field should not be empty";
        return value.length < 2
          ? "first name must have at least 2 letters"
          : null;
      },
      lastName: (value) => {
        if (!value) return "field should not be empty";
        return value.length < 2
          ? "last name must have at least 2 letters"
          : null;
      },
    },
  });
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const emailForm = useForm({
    initialValues: { email: "" },

    validate: {
      email: (value) => {
        if (!value) return "Email is required";
        return emailRegex.test(value) ? null : "Invalid email";
      },
    },
  });

  const mobileForm = useForm({
    initialValues: { mobile: "" },

    validate: {
      mobile: (value) => {
        if (!value) return "Mobile number is required";
        return value.toString().length === 10 || value.toString().length === 12
          ? null
          : "Invalid mobile number";
      },
    },
  });

  function handleEmailEdit() {
    setEmailEdit((state) => !state);
  }
  function handleMobileEdit() {
    setMobileEdit((state) => !state);
  }

  useEffect(() => {
    if (!personalInfoEdit) {
      personalInfoForm.clearErrors();
    }
    if (!emailEdit) {
      emailForm.clearErrors();
    }
    if (!mobileEdit) {
      mobileForm.clearErrors();
    }
  }, [
    personalInfoEdit,
    personalInfoForm,
    emailEdit,
    emailForm,
    mobileEdit,
    mobileForm,
  ]);

  return (
    <>
      <div className="p-6">
        {/* Personal Information */}
        <div className=" py-4">
          <div className="mb-5 flex items-center justify-start gap-x-4">
            <span className="text-lg font-semibold ">Personal information</span>
            <button
              className="pt-1 text-sm text-blue-500 font-medium"
              onClick={() => setPersonalInfoEdit((value) => !value)}
            >
              {personalInfoEdit ? "Cancel" : "Edit"}
            </button>
          </div>
          <form
            onSubmit={personalInfoForm.onSubmit(console.log)}
            className="flex items-center justify-start gap-x-10"
          >
            <div className="flex items-start justify-start gap-x-6">
              <TextInput
                label="First Name"
                placeholder="First Name"
                {...personalInfoForm.getInputProps("firstName")}
                disabled={!personalInfoEdit}
              />
              <TextInput
                label="Last Name"
                placeholder="Last Name"
                {...personalInfoForm.getInputProps("lastName")}
                disabled={!personalInfoEdit}
              />
              <Radio.Group
                {...personalInfoForm.getInputProps("gender")}
                name="Gender"
                label="Your Gender"
                value={gender}
              >
                <Group
                  pt={6}
                  onChange={(value) => setGender(value.target.value)}
                >
                  <Radio
                    disabled={!personalInfoEdit}
                    value="male"
                    label="Male"
                  />
                  <Radio
                    disabled={!personalInfoEdit}
                    value="female"
                    label="Female"
                  />
                </Group>
              </Radio.Group>
            </div>
            {personalInfoEdit && (
              <div className="flex flex-col self-start">
                <button
                  type="submit"
                  className="bg-blue-600 text-white shadow-md rounded-sm text-sm py-2 px-6 mt-6"
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
            <span className="text-lg font-semibold ">Email Address</span>
            <button
              className="pt-1 text-sm text-blue-500 font-medium"
              onClick={handleEmailEdit}
            >
              {emailEdit ? "Cancel" : "Edit"}
            </button>
          </div>
          <form
            onSubmit={emailForm.onSubmit(console.log)}
            className="flex items-center justify-start gap-x-10"
          >
            <div className="flex items-start justify-start gap-x-6">
              <TextInput
                label="Email"
                placeholder="Email"
                {...emailForm.getInputProps("email")}
                disabled={!emailEdit}
              />
            </div>
            {emailEdit && (
              <div className="flex flex-col self-start">
                <button
                  type="submit"
                  className="bg-blue-600 text-white shadow-md rounded-sm text-sm py-2 px-6 mt-6"
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
            <span className="text-lg font-semibold ">Mobile Number</span>
            <button
              className="pt-1 text-sm text-blue-500 font-medium"
              onClick={handleMobileEdit}
            >
              {mobileEdit ? "Cancel" : "Edit"}
            </button>
          </div>
          <form
            onSubmit={mobileForm.onSubmit(console.log)}
            className="flex items-center justify-start gap-x-10"
          >
            <div className="flex items-start justify-start gap-x-6">
              <NumberInput
                hideControls
                label="Mobile"
                placeholder="Mobile"
                {...mobileForm.getInputProps("mobile")}
                disabled={!mobileEdit}
              />
            </div>
            {mobileEdit && (
              <div className="flex flex-col self-start">
                <button
                  type="submit"
                  className="bg-blue-600 text-white shadow-md rounded-sm text-sm py-2 px-6 mt-6"
                >
                  SAVE
                </button>
              </div>
            )}
          </form>
        </div>

        {/* FAQ's */}
        <div>
          <p className=" py-4 font-semibold">FAQs</p>
          <div className="flex flex-col items-start justify-start gap-y-6 text-xs">
            <div>
              <p className="font-semibold mb-2">
                What happens when I update my email address (or mobile number)?
              </p>
              <p>
                Your login email id (or mobile number) changes, likewise. You'll
                receive all your account related communication on your updated
                email address (or mobile number)
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">
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
      <img src="/profileBg.png" className="w-full mt-6" alt="" />
    </>
  );
};

export default ProfileInfo;
