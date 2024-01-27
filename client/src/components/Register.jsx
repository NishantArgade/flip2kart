import { useState } from "react";

import { PasswordInput, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link } from "react-router-dom";

const Register = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handleRegister = () => {
    // 1. check if mobile number already exists if so then navigate to login page
    // 2. else send otp to user mobile then verify otp after succesfull verification of otp then navigate to registeration page  set setShowRegistrationForm(true)
    // 3. after successful registeration redirect user to home page (back page where he was using naviagte(-1))
    setShowRegistrationForm(true);
  };
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

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
        if (!value) return "First name is required";
        return value.length < 2 ? "Name must have at least 2 letters" : null;
      },
      email: (value) => {
        if (!value) return "Email is required";
        return emailRegex.test(value) ? null : "Invalid email";
      },
      password: (value) => (!value ? "Password is required" : null),

      confrimPassword: (value, values) => {
        if (!value) return "Confrim Password is required";
        return value !== values.password ? "Passwords did not match" : null;
      },
    },
  });

  return (
    <div className="container mx-auto  grid py-4  place-items-center">
      <div className="w-full md:w-[37rem] min-h-[33rem] bg-white  shadow-md flex flex-col md:flex-row ">
        {/* info */}
        <div className="flex flex-col justify-between items-center md:items-start w-full md:w-[36rem] bg-[#2874F0] p-6">
          <div className="text-center md:text-start">
            <h1 className="text-white font-bold text-2xl">
              Looks like you're new here!
            </h1>
            <p className="text-gray-300 text-sm mt-3">
              Sign up with your mobile number to get started
            </p>
          </div>
          <img src="loginSecure.png" className="w-32 md:w-80" alt="loginImg" />
        </div>
        {/* login */}
        <div className="flex flex-col justify-between items-start p-6 md:w-[64rem] ">
          {!showRegistrationForm ? (
            <div className="flex flex-col justify-start items-center  md:gap-y-7 w-full mt-5 md:my-auto">
              <input
                className="w-full text-sm md:text-base outline-none border-b-[1.5px] border-gray-300 px-2 focus:border-blue-500"
                type="number"
                placeholder={"Enter Mobile number"}
              />
              <div className="w-full mt-5 md:mt-0">
                <p className="text-[0.60rem] text-gray-400 mb-3">
                  By continuing, you agree to Flipkart's Terms of Use and
                  Privacy Policy.
                </p>

                <button
                  onClick={handleRegister}
                  className="bg-[#FB641B] w-full p-3 shadow-md text-xs font-bold text-white rounded-sm"
                >
                  Continue
                </button>
              </div>
            </div>
          ) : (
            <div>
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
                <div className="grid grid-cols-3 gap-x-3 mt-2">
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
                  className="bg-[#2874F0] py-2 px-4 rounded-md text-white shadow-md text-sm font-semibold mt-4 float-end"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          )}

          <Link
            to="/login"
            className="self-center text-xs text-blue-500 font-bold mt-8 md:mt-4"
          >
            Existing User? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
