import { Group, HoverCard } from "@mantine/core";
import { Link } from "react-router-dom";

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
            className="flex flex-col justify-center items-center "
          >
            <div className="h-16 flex flex-col justify-center items-center ">
              <img className="md:w-12 w-8" src={category?.image} alt="" />
            </div>
            <p className="text-xs mt-2">{category?.name} </p>
          </Link>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <div className="flex flex-col items-start justify-start text-gray-700 text-xs shadow-md">
            {category?.categoryOptions?.map((option, index) => (
              <Link
                key={index}
                to="/all-products"
                className="bg-gray-50 w-full p-2 hover:bg-[#F0F5FF] "
              >
                {option}
              </Link>
            ))}
          </div>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
};

export default ProductCategoryCard;
