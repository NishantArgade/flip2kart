import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

const ContactUs = () => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },

    validate: {
      name: (value) => {
        if (!value) return "Name is required";
      },
      email: (value) => {
        if (!value) return "Email is required";
        return emailRegex.test(value) ? null : "Invalid email";
      },
      message: (value) => {
        if (!value) return "Message is required";
      },
    },
  });
  console.log(form.errors.message);

  return (
    <div className="container mx-auto bg-white mt-2 mb-4 rounded-sm shadow-md ">
      {/** Office Locations */}
      <div className="flex flex-col items-center justify-center gap-2 p-2">
        <div className="map bg-green-200 w-full h-80">Map</div>

        <div className="map  w-full pb-6">
          <div className="flex justify-center items-center py-2">
            <div>
              <p className="text-xl mt-4 mb-8 text-center text-gray-500 font-semibold">
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
                      className="block mb-1 text-sm font-medium text-gray-900"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      placeholder="Message..."
                      {...form.getInputProps("message")}
                      className={`${
                        form.errors.message
                          ? " border-red-500"
                          : "border-gray-300"
                      } focus:border-blue-500 p-2 text-sm outline-none border-[1.5px] rounded-md resize-none w-full h-24`}
                    />
                    {form.errors.message && (
                      <p className="text-[0.78rem] text-red-500 font-normal">
                        Message is required
                      </p>
                    )}
                  </div>
                </div>
                <button
                  className="bg-[#2874F0] py-2 px-4 rounded-md text-white shadow-md text-sm font-semibold mt-4 w-full float-end"
                  type="submit"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
