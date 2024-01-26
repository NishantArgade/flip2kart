import { Accordion, Avatar, Group, Text } from "@mantine/core";

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

export default function AddressAccordion({ prevStep, nextStep }) {
  const items = charactersList.map((item) => (
    <Accordion.Item value={item.id} key={item.label}>
      <Accordion.Control>
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel>
        <Text
          className="bg-[#FB641B] py-3 self-end px-10 mt-2 text-white   w-fit  cursor-pointer shadow-md"
          size="xs"
          onClick={nextStep}
        >
          DELIVER HERE
        </Text>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion chevronPosition="right" variant="contained">
      {items}
    </Accordion>
  );
}
