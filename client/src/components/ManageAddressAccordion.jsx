import {
  Accordion,
  Avatar,
  Group,
  NumberInput,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const charactersList = [
  {
    id: "bender",
    label: "Nishant Argade",
    phone: "8007896396",
    description:
      "address pune Fascinated with cooking, though has no sense of taste",
  },

  {
    id: "carol",
    // image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
    label: "Carol Miller",
    description: "One of the richest people on Earth",
  },

  {
    id: "homer",
    // image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
    label: "Homer Simpson",
    description: "Overweight, lazy, and often ignorant",
  },
];

function AccordionLabel({ label, phone, description }) {
  return (
    <Group wrap="nowrap">
      <div>
        <div className="flex items-center gap-x-4">
          <Text size="sm">{label}</Text>
          <Text size="sm">{phone}</Text>
        </div>
        <Text className="text-xs mt-1" size="sm" c="dimmed" fw={400}>
          {description}
        </Text>
      </div>
    </Group>
  );
}

export default function ManageAddressAccordion() {
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      city: "",
      state: "",
      pincode: "",
      areaOrStreet: "",
    },
    validate: {
      firstName: (value) => {
        if (!value) return "First name is required";
        return value.length < 2 ? "Name must have at least 2 letters" : null;
      },
      mobile: (value) => {
        if (!value) return "Mobile number is required";
        return value.toString().length === 10 || value.toString().length === 12
          ? null
          : "Invalid mobile number";
      },
      city: (value) => {
        if (!value) return "field is required";
        return value.length < 2 ? "Wrong city" : null;
      },
      state: (value) => {
        if (!value) return "field is required";
        return value.length < 2 ? "Wrong state" : null;
      },
      pincode: (value) => {
        if (!value) return "field is required";
        return value.toString().length === 6 ? null : "Wrong pincode";
      },
    },
  });

  const items = charactersList.map((item) => (
    <Accordion.Item value={item.id} key={item.label}>
      <Accordion.Control>
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel>
        <div className="px-4 ">
          <form onSubmit={form.onSubmit(console.log)}>
            <div className="grid grid-cols-2 gap-3">
              <TextInput
                label="First Name"
                placeholder="john"
                {...form.getInputProps("firstName")}
              />
              <TextInput
                label="Last Name"
                placeholder="dio"
                {...form.getInputProps("lastName")}
              />

              <NumberInput
                hideControls
                label="Mobile Number"
                placeholder="Mobile Number"
                {...form.getInputProps("mobile")}
              />
              <TextInput
                label="City"
                placeholder="City"
                {...form.getInputProps("city")}
              />
              <TextInput
                label="State"
                placeholder="State"
                {...form.getInputProps("state")}
              />
              <NumberInput
                hideControls
                label="Pincode"
                placeholder="Pincode"
                {...form.getInputProps("pincode")}
              />
              <Textarea
                label="Area or Street"
                placeholder="Area or Street"
                autosize
                minRows={2}
                maxRows={4}
              />
            </div>

            <div className="flex items-center justify-between gap-x-2">
              <div>
                <button
                  className="bg-[#2874F0]  py-2 px-6 rounded-sm text-white shadow-md text-sm font-semibold mt-4 "
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="py-2 mr-2 px-6  text-blue-700  text-sm font-semibold mt-4"
                  type="submit"
                >
                  Cancel
                </button>
              </div>
              <button
                className="bg-[#FB641B] py-2 px-6 rounded-sm text-white shadow-md text-sm font-semibold mt-4 float-end"
                type="submit"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion chevronPosition="right" variant="contained">
      {items}
    </Accordion>
  );
}
