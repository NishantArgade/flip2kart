import { Group, HoverCard } from "@mantine/core"
import { Link } from "react-router-dom"

const ProductCategoryCard = ({ category }) => {
  return (
    <Group justify="center" mx={14}>
      <HoverCard
        width={160}
        shadow="md"
        position="bottom-start"
        styles={{
          dropdown: {
            padding: "0rem",
          },
        }}
        // withArrow
      >
        <HoverCard.Target>
          <Link
            to={`/products?category=${category?.name}`}
            className=" flex h-[3.6rem] w-14 flex-col items-center justify-center "
          >
            <div className="h-10 w-10 overflow-hidden ">
              <img
                className="h-full w-full object-contain "
                src={category?.image?.url}
                alt=""
              />
            </div>
            <p className="pt-1  text-[0.60rem]">{category?.name}</p>
          </Link>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <div className="thin-scrollbar hidden max-h-60 flex-col items-start justify-start overflow-auto text-xs text-gray-700 shadow-md md:flex">
            {category?.brands?.map((brand, index) => (
              <Link
                key={index}
                to={`/products?category=${category?.name}&brand=${brand}`}
                className="w-full bg-gray-50 p-2 hover:bg-[#F0F5FF] "
              >
                {brand}
              </Link>
            ))}
          </div>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  )
}

export default ProductCategoryCard
