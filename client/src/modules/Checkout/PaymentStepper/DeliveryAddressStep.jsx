import {
  Accordion,
  Group,
  NumberInput,
  Radio,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { IoIosAdd } from "react-icons/io"
import Spinner from "../../../components/Spinner"

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
]

function AccordionLabel({ label, phone, description }) {
  return (
    <Group wrap="nowrap">
      <div>
        <Radio size="xs" />
      </div>
      <div>
        <div className="flex items-center gap-x-4">
          <Text size="sm">{label}</Text>
          <Text size="sm">{phone}</Text>
        </div>
        <Text className="mt-1 text-xs" size="sm" c="dimmed" fw={400}>
          {description}
        </Text>
      </div>
    </Group>
  )
}

export default function DeliveryAddressStep({ prevStep, nextStep }) {
  const items = charactersList.map((item) => (
    <Accordion.Item value={item.id} key={item.label}>
      <Accordion.Control>
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel>
        <Text
          className="mt-2 w-fit cursor-pointer self-end bg-[#FB641B] px-10   py-3  text-white shadow-md"
          size="xs"
          onClick={nextStep}
        >
          DELIVER HERE
        </Text>
      </Accordion.Panel>
    </Accordion.Item>
  ))

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      contry: "",
      city: "",
      state: "",
      landmark: "",
      pincode: "",
      areaOrStreet: "",
    },
    validate: {
      name: (value) => {
        if (!value) return "name is required"
        return value.length < 2 ? "Name must have at least 2 letters" : null
      },
      mobile: (value) => {
        if (!value) return "Mobile number is required"
        return value.toString().length === 10 || value.toString().length === 12
          ? null
          : "Invalid mobile number"
      },
      city: (value) => {
        if (!value) return "field is required"
        return value.length < 2 ? "Wrong city" : null
      },
      state: (value) => {
        if (!value) return "field is required"
        return value.length < 2 ? "Wrong state" : null
      },
      pincode: (value) => {
        if (!value) return "field is required"
        return value.toString().length === 6 ? null : "Wrong pincode"
      },
    },
  })

  return (
    <>
      {true ? (
        <Accordion chevronPosition="right" variant="contained">
          {items}

          <Accordion.Item value={"add-new-address"}>
            <Accordion.Control>
              <div className="flex items-center gap-x-2 text-sm text-blue-500">
                <IoIosAdd size={22} />
                <div>Add a new address</div>
              </div>
            </Accordion.Control>
            <Accordion.Panel>
              <form onSubmit={form.onSubmit(console.log)}>
                <div className="grid grid-cols-2 gap-3">
                  <TextInput
                    label="Name"
                    placeholder="john"
                    {...form.getInputProps("name")}
                  />
                  <TextInput
                    label="email"
                    placeholder="dio"
                    {...form.getInputProps("email")}
                  />

                  <NumberInput
                    hideControls
                    label="Mobile Number"
                    placeholder="Mobile Number"
                    {...form.getInputProps("mobile")}
                  />
                  <TextInput
                    label="Contry"
                    placeholder="Contry"
                    {...form.getInputProps("contry")}
                  />
                  <TextInput
                    label="State"
                    placeholder="State"
                    {...form.getInputProps("state")}
                  />
                  <TextInput
                    label="City"
                    placeholder="City"
                    {...form.getInputProps("city")}
                  />
                  <NumberInput
                    hideControls
                    label="Landmark"
                    placeholder="Landmark (Optional)"
                    {...form.getInputProps("landmark")}
                  />
                  <NumberInput
                    hideControls
                    label="Pincode"
                    placeholder="Pincode"
                    {...form.getInputProps("pincode")}
                  />
                </div>
                <Textarea
                  label="Area or Street"
                  placeholder="Area or Street"
                  autosize
                  minRows={2}
                  maxRows={4}
                  mt={12}
                />

                <div className="flex items-center justify-between gap-x-2">
                  <div>
                    <button
                      className="text-xm mt-4  rounded-sm bg-[#FB641B] px-6 py-3 font-medium uppercase text-white shadow-md "
                      type="submit"
                    >
                      Save and delivery here
                    </button>
                    <button
                      className="mr-2 mt-4 px-6 py-3  text-xs  font-medium uppercase text-blue-500"
                      type="submit"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      ) : (
        <div className="flex h-[25rem] items-center justify-center">
          <Spinner />
        </div>
      )}
    </>
  )
}
