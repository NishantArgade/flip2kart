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
import AccordionItem from "./AccordionItem"
import { getAllMyAddresses } from "../../../api/addressApi"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import AddAddressAccordionItem from "./AddAddressAccordionItem"

export default function DeliveryAddressStep({ prevStep, nextStep }) {
  const { data, isLoading } = useQuery({
    queryKey: ["allMyAddresses"],
    queryFn: getAllMyAddresses,
  })

  const [activeItem, setActiveItem] = useState("0")

  useEffect(() => {
    data?.addresses?.length > 0 &&
      data?.addresses?.map((item) => {
        if (item.is_active) {
          setActiveItem(item._id)
        }
      })
  }, [])

  return (
    <>
      {true ? (
        <Accordion
          chevronPosition="right"
          variant="contained"
          value={activeItem}
          onChange={setActiveItem}
        >
          {data?.addresses?.map((item, index) => (
            <AccordionItem
              key={item._id}
              item={item}
              index={index.toString()}
              nextStep={nextStep}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
          ))}
          <AddAddressAccordionItem setActiveItem={setActiveItem} />
        </Accordion>
      ) : (
        <div className="flex h-[25rem] items-center justify-center">
          <Spinner />
        </div>
      )}
    </>
  )
}
