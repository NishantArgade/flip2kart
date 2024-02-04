import { Group, HoverCard } from "@mantine/core"
import { Link } from "react-router-dom"

const Card = ({ category }) => {
  return (
    <Group justify="center" mx={14}>
      <HoverCard
        width={120}
        shadow="md"
        position="bottom-start"
        styles={{
          dropdown: {
            background: "red",
            padding: "0rem",
          },
        }}
      >
        <HoverCard.Target>
          <Link
            to="/all-products"
            className="flex h-24 w-14 flex-col  items-center justify-center"
          >
            <div className=" ">
              <img className="md:w-12" src={category?.image} alt="" />
            </div>
            <p className="mt-2 text-center text-xs">{category?.name}</p>
          </Link>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <div className="flex flex-col items-start justify-start text-xs text-gray-700 shadow-md">
            {category?.categoryOptions?.map((option, index) => (
              <Link
                key={index}
                to="/all-products"
                className="w-full bg-gray-50 p-2 hover:bg-[#F0F5FF] "
              >
                {option}
              </Link>
            ))}
          </div>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  )
}

export default Card
