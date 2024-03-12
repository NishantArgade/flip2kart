import { Accordion } from "@mantine/core"
import Spinner from "../../../components/Spinner"
import AccordionItem from "./AccordionItem"
import { useEffect, useState } from "react"
import AddAddressAccordionItem from "./AddAddressAccordionItem"
import { getAllMyAddresses } from "../../../api/addressApi"
import { useQuery } from "@tanstack/react-query"

export default function DeliveryAddressStep({ prevStep, nextStep }) {
  const [activeItem, setActiveItem] = useState("0")
  const { data, isLoading } = useQuery({
    queryKey: ["allMyAddresses"],
    queryFn: getAllMyAddresses,
  })

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
      {!isLoading ? (
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
