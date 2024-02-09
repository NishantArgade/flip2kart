import { Group, HoverCard } from "@mantine/core"
import { Link } from "react-router-dom"

const ProductCategoryCard = ({ category }) => {
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
            className="grid h-[5.5rem] w-14 grid-cols-1 grid-rows-3 flex-col  "
          >
            <div className=" row-span-2 flex items-center justify-center overflow-hidden">
              <img className=" md:w-12 " src={category?.image} alt="" />
            </div>
            <p className="row-span-1 pt-1 text-center text-[0.60rem]">
              {category?.name}
            </p>
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

export default ProductCategoryCard
