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
        <div className="p-6">
          <Accordion
            chevronPosition="right"
            variant="contained"
            value={activeItem}
            onChange={setActiveItem}
          >
            <AddAddressAccordionItem setActiveItem={setActiveItem} />
            {data?.addresses?.map((item) => (
              <AccordionItem
                key={item._id}
                item={item}
                setActiveItem={setActiveItem}
              />
            ))}
          </Accordion>
        </div>
      ) : (
        <div className="flex h-3/4 items-center justify-center ">
          <Spinner />
        </div>
      )}
    </>
  )
}
