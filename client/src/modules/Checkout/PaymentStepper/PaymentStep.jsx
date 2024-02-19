import { Accordion, Avatar, Group, Text } from "@mantine/core"
import Spinner from "../../../components/Spinner"

const charactersList = [
  {
    id: "upi",
    image: "/phonepe.svg",
    label: "UPI",
    description: "asfsd",
  },

  {
    id: "wallet",
    image: "/upi.svg",
    label: "Wallets",
    description: "Overweight, lazy, and often ignorant",
  },
  {
    id: "creditCard",
    image: "/wallet.png",
    label: "Credit / Debit / ATM Card",
    description: "Overweight, lazy, and often ignorant",
  },
  {
    id: "cod",
    image: "/cash-on-delivery.png",
    label: "Cash on Delivery",
    description: "Overweight, lazy, and often ignorant",
  },
]

function AccordionLabel({ label, phone, image, description }) {
  return (
    <Group wrap="nowrap">
      <Avatar src={image} radius="xl" size="sm" />
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

export default function PaymentStep({ nextStep }) {
  const items = charactersList.map((item) => (
    <Accordion.Item value={item.id} key={item.label}>
      <Accordion.Control>
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel>
        <Text
          onClick={nextStep}
          className="mt-2 w-fit cursor-pointer self-end bg-[#FB641B] px-10   py-3  text-white shadow-md"
          size="xs"
        >
          PAY
        </Text>
      </Accordion.Panel>
    </Accordion.Item>
  ))

  return (
    <>
      {true ? (
        <Accordion chevronPosition="right" variant="contained">
          {items}
        </Accordion>
      ) : (
        <div className="flex h-[25rem] items-center justify-center">
          <Spinner />
        </div>
      )}
    </>
  )
}
