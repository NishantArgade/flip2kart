import {
  Group,
  Modal,
  NumberInput,
  Radio,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { FaEdit } from "react-icons/fa";

function EditUserModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      gender: "",
      role: "",
      address: "",
    },

    validate: {
      firstName: (value) => {
        if (!value) return "field should not be empty";
        return value.length < 2
          ? "first name must have at least 2 letters"
          : null;
      },

      email: (value) => {
        if (!value) return "Email is required";
        return emailRegex.test(value) ? null : "Invalid email";
      },
      mobile: (value) => {
        if (!value) return "Mobile number is required";
        return value.toString().length === 10 || value.toString().length === 12
          ? null
          : "Invalid mobile number";
      },
    },
  });

  return (
    <>
      <Modal
        size={"lg"}
        opened={opened}
        onClose={close}
        title="Edit User"
        closeOnClickOutside={false}
        centered
      >
        <div>
          <form onSubmit={form.onSubmit(console.log)} className="">
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="First Name"
                placeholder="First Name"
                {...form.getInputProps("firstName")}
                // disabled={!personalInfoEdit}
                withAsterisk
                size="xs"
              />
              <TextInput
                label="Last Name"
                placeholder="Last Name"
                {...form.getInputProps("lastName")}
                // disabled={!personalInfoEdit}
                size="xs"
              />
              <TextInput
                label="Email"
                placeholder="Email"
                withAsterisk
                {...form.getInputProps("email")}
                // disabled={!emailEdit}
                size="xs"
              />
              <NumberInput
                hideControls
                label="Mobile"
                placeholder="Mobile"
                withAsterisk
                {...form.getInputProps("mobile")}
                // disabled={!mobileEdit}
                size="xs"
              />
              <Select
                label="Role"
                placeholder="Select Role"
                size="xs"
                data={["Admin", "User", "Operator"]}
                {...form.getInputProps("role")}
              />
              <Radio.Group
                {...form.getInputProps("gender")}
                name="Gender"
                label="Gender"
                // value={gender}
                size="xs"
              >
                <Group
                  pt={6}
                  //   onChange={(value) => setGender(value.target.value)}
                >
                  <Radio
                    // disabled={!personalInfoEdit}
                    value="male"
                    label="Male"
                    size="xs"
                  />
                  <Radio
                    // disabled={!personalInfoEdit}
                    value="female"
                    label="Female"
                    size="xs"
                  />
                </Group>
              </Radio.Group>
              <div className="col-span-2">
                <label
                  htmlFor="Address"
                  className="block mb-1 text-xs font-medium text-gray-900"
                >
                  Address
                </label>
                <textarea
                  id="Address"
                  placeholder="Address"
                  {...form.getInputProps("address")}
                  className="border-gray-300 focus:border-blue-500 p-2 text-sm outline-none border-[1.5px] rounded-md resize-none w-full h-16"
                  // maxLength={10}
                />
              </div>
            </div>

            <div className="flex gap-4 items-center justify-end">
              <div className="flex flex-col self-start">
                <button
                  onClick={close}
                  className="bg-white text-gray-800 border-[1.5px] border-gray-200 shadow-md rounded-sm text-xs py-2 px-6 mt-6"
                >
                  CANCEL
                </button>
              </div>
              <div className="flex flex-col self-start">
                <button
                  type="submit"
                  className="bg-blue-600 text-white shadow-md rounded-sm text-xs py-2 px-6 mt-6"
                >
                  SAVE
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <FaEdit onClick={open} size={16} className="cursor-pointer" />
    </>
  );
}

export default EditUserModal;
