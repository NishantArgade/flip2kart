import { Accordion } from "@mantine/core"
import Spinner from "../../components/Spinner"
import { useQuery } from "@tanstack/react-query"
import { getAllMyAddresses } from "../../api/addressApi"
import AccordionItem from "./components/AccordionItem"
import AddAddressAccordionItem from "./components/AddAddressAccordionItem"
import { useState } from "react"

export default function ManagesAddress() {
  const { data, isLoading } = useQuery({
    queryKey: ["allMyAddresses"],
    queryFn: getAllMyAddresses,
  })
  const [activeItem, setActiveItem] = useState(1)

  return (
    <>
      {!isLoading ? (
        <div className="p-0">
          <Accordion
            chevronPosition="right"
            variant="contained"
            value={activeItem}
            onChange={setActiveItem}
          >
            <AddAddressAccordionItem setActiveItem={setActiveItem} />
            {data?.addresses?.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                setActiveItem={setActiveItem}
              />
            ))}
          </Accordion>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center ">
          <Spinner />
        </div>
      )}
    </>
  )
}
