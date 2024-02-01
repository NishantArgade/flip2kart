import { Menu } from "@mantine/core";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import TableSearchBar from "../TableSearchBar";
import ReviewTable from "./ReviewTable";

const Reviews = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([
    { id: "rating", value: "" },
  ]);

  const onColumnFilterChange = (rating, value) => {
    setColumnFilters((state) =>
      state.filter((f) => f.id !== rating).concat({ id: rating, value })
    );
  };

  const filteredRatingValue =
    columnFilters.find((f) => f.id === "rating").value || "";

  const isSelectedRating = (rating) => filteredRatingValue === rating;

  return (
    <div className=" w-full p-4 ">
      <div className="flex justify-start gap-x-6 mb-6">
        <TableSearchBar
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <Menu
          shadow="md"
          position="top-start"
          withArrow
          arrowSize={12}
          width={200}
          value="All"
        >
          <Menu.Target>
            <button className="text-blue-500 flex items-center text-sm gap-x-2">
              <FiFilter />
              <p>Filter By Rating</p>
            </button>
          </Menu.Target>

          <Menu.Dropdown defaultValue="All">
            <Menu.Label>Ratings</Menu.Label>
            <Menu.Item
              className={`${
                isSelectedRating("5") && "bg-[#F5FAFF] text-green-500"
              }  hover:bg-[#F5FAFF] hover:text-green-500`}
              onClick={() => onColumnFilterChange("rating", "5")}
            >
              5 Star
            </Menu.Item>
            <Menu.Item
              className={`${
                isSelectedRating("4") && "bg-[#F5FAFF] text-green-500"
              }  hover:bg-[#F5FAFF] hover:text-green-500`}
              onClick={() => onColumnFilterChange("rating", "4")}
            >
              4 Star
            </Menu.Item>
            <Menu.Item
              className={`${
                isSelectedRating("3") && "bg-[#F5FAFF]  text-orange-500"
              }  hover:bg-[#F5FAFF] hover:text-orange-500`}
              onClick={() => onColumnFilterChange("rating", "3")}
            >
              3 Star
            </Menu.Item>
            <Menu.Item
              className={`${
                isSelectedRating("2") && "bg-[#F5FAFF] text-orange-500"
              }  hover:bg-[#F5FAFF] hover:text-orange-500`}
              onClick={() => onColumnFilterChange("rating", "2")}
            >
              2 Star
            </Menu.Item>
            <Menu.Item
              className={`${
                isSelectedRating("1") && "bg-[#F5FAFF] text-red-500"
              }  hover:bg-[#F5FAFF] hover:text-red-500`}
              onClick={() => onColumnFilterChange("rating", "1")}
            >
              1 Star
            </Menu.Item>
            <Menu.Item
              className={`${
                isSelectedRating("") && "bg-[#F5FAFF] text-green-500"
              }  hover:bg-[#F5FAFF] hover:text-green-500`}
              onClick={() => onColumnFilterChange("rating", "")}
              value={"All"}
            >
              All
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>

      <ReviewTable
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        columnFilters={columnFilters}
      />
    </div>
  );
};

export default Reviews;
