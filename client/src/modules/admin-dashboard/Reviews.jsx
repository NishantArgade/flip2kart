import { Menu, Tooltip } from "@mantine/core"
import { createColumnHelper } from "@tanstack/react-table"
import moment from "moment"
import { useState } from "react"
import { FiFilter } from "react-icons/fi"
import DeletePopover from "../../components/DeletePopover"
import EditReviewModal from "../../components/modals/EditReviewModal"
import ClientFacingHeader from "./components/ClientFacingHeader"
import Table from "./components/Table"
import TableHeader from "./components/TableHeader"
import TableSearchBar from "./components/TableSearchBar"

const data = [
  {
    id: "65a63a404e9ce490acd0c3a6",
    productId: "65a63a404e9ce490acd0c3a6",
    productName: "Iphone",
    userId: "65a63a404e9ce490acd0c3a6",
    userName: "Nishant Argade",
    rating: "4",
    comment:
      "Elitr ea sed stet sed et amet duo aliquyam sed, dolor eos ipsum sanctus rebum invidunt. Diam ut dolor vero.",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    productId: "65a63a404e9ce490acd0c3a6",
    productName: "Iphone",
    userId: "65a63a404e9ce490acd0c3a6",
    userName: "Nishant Argade",
    rating: "5",
    comment:
      "Elitr ea sed stet sed et amet duo aliquyam sed, dolor eos ipsum sanctus rebum invidunt. Diam ut dolor vero.",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    productId: "65a63a404e9ce490acd0c3a6",
    productName: "Iphone",
    userId: "65a63a404e9ce490acd0c3a6",
    userName: "Nishant Argade",
    rating: "3",
    comment:
      "Elitr ea sed stet sed et amet duo aliquyam sed, dolor eos ipsum sanctus rebum invidunt. Diam ut dolor vero.",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    productId: "65a63a404e9ce490acd0c3a6",
    productName: "Iphone",
    userId: "65a63a404e9ce490acd0c3a6",
    userName: "Nishant Argade",
    rating: "2",
    comment:
      "Elitr ea sed stet sed et amet duo aliquyam sed, dolor eos ipsum sanctus rebum invidunt. Diam ut dolor vero.",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    productId: "65a63a404e9ce490acd0c3a6",
    productName: "Iphone",
    userId: "65a63a404e9ce490acd0c3a6",
    userName: "Nishant Argade",
    rating: "1",
    comment:
      "Elitr ea sed stet sed et amet duo aliquyam sed, dolor eos ipsum sanctus rebum invidunt. Diam ut dolor vero.",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce4d90acd0c3a6",
    productId: "65a63a404e9ce490acd0c3a6",
    productName: "Iphone",
    userId: "65a63a404e9ce490acd0c3a6",
    userName: "Nishant Argade",
    rating: "1",
    comment:
      "Elitr ea sed stet sed et amet duo aliquyam sed, dolor eos ipsum sanctus rebum invidunt. Diam ut dolor vero.",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    productId: "65a63a404e9ce490acd0c3a6",
    productName: "Iphone",
    userId: "65a63a404e9ce490acd0c3a6",
    userName: "Nishant Argade",
    rating: "5",
    comment:
      "Elitr ea sed stet sed et amet duo aliquyam sed, dolor eos ipsum sanctus rebum invidunt. Diam ut dolor vero.",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    productId: "65a63a404e9ce490acd0c3a6",
    productName: "Iphone",
    userId: "65a63a404e9ce490acd0c3a6",
    userName: "Nishant Argade",
    rating: "3",
    comment:
      "Elitr ea sed stet sed et amet duo aliquyam sed, dolor eos ipsum sanctus rebum invidunt. Diam ut dolor vero.",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    productId: "65a63a404e9ce490acd0c3a6",
    productName: "Iphone",
    userId: "65a63a404e9ce490acd0c3a6",
    userName: "Nishant Argade",
    rating: "2",
    comment:
      "Elitr ea sed stet sed et amet duo aliquyam sed, dolor eos ipsum sanctus rebum invidunt. Diam ut dolor vero.",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    productId: "65a63a404e9ce490acd0c3a6",
    productName: "Iphone",
    userId: "65a63a404e9ce490acd0c3a6",
    userName: "Nishant2 Argade",
    rating: "1",
    comment:
      "Elitr ea sed stet sed et amet duo aliquyam sed, dolor eos ipsum sanctus rebum invidunt. Diam ut dolor vero.",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce4d90acd0c3a6",
    productId: "65a63a404e9ce490acd0c3a6",
    productName: "Iphone",
    userId: "65a63a404e9ce490acd0c3a6",
    userName: "Nishant Argade",
    rating: "1",
    comment:
      "Elitr ea sed stet sed et amet duo aliquyam sed, dolor eos ipsum sanctus rebum invidunt. Diam ut dolor vero.",
    createdAt: new Date(),
  },
]

const getRatingColor = (rating) => {
  if (rating === "1") return "red"
  else if (rating === "2" || rating === "3") return "orange"
  else return "green"
}
const colHelper = createColumnHelper()
const columns = [
  colHelper.accessor("productId", {
    header: (header) => <TableHeader header={header} name={"ProductID"} />,
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),
  colHelper.accessor("productName", {
    header: (header) => <TableHeader header={header} name={"ProductName"} />,
    cell: (props) => (
      <Tooltip
        label={props.getValue()}
        arrowOffset={12}
        arrowSize={6}
        withArrow
        className="max-h-32 max-w-80 text-wrap bg-gray-600  text-xs text-white"
      >
        <p className="mr-2 w-32 truncate">{props.getValue()}</p>
      </Tooltip>
    ),
  }),
  colHelper.accessor("userName", {
    header: (header) => <TableHeader header={header} name={"UserName"} />,
    cell: (props) => (
      <Tooltip
        label={props.getValue()}
        arrowOffset={12}
        arrowSize={6}
        withArrow
        className="max-h-32 max-w-80 text-wrap bg-gray-600  text-xs text-white"
      >
        <p className="mr-2 w-32 truncate">{props.getValue()}</p>
      </Tooltip>
    ),
  }),
  colHelper.accessor("rating", {
    header: (header) => <TableHeader header={header} name={"Rating"} />,
    cell: (props) => (
      <p
        className={`${
          getRatingColor(props.getValue()) === "green"
            ? "bg-green-500"
            : getRatingColor(props.getValue()) === "orange"
              ? "bg-orange-500"
              : "bg-red-500"
        }  mr-4 w-10 rounded-md px-2 text-center text-[0.70rem] font-semibold  text-white`}
      >
        <span> {props.getValue()}★</span>
      </p>
    ),
  }),
  colHelper.accessor("comment", {
    header: (header) => <TableHeader header={header} name={"Comment"} />,
    cell: (props) => (
      <Tooltip
        label={props.getValue()}
        arrowOffset={12}
        arrowSize={6}
        withArrow
        className="max-h-32 max-w-80 text-wrap bg-gray-600  text-xs text-white"
      >
        <p className="mr-2 w-28 truncate">{props.getValue()}</p>
      </Tooltip>
    ),
  }),
  colHelper.accessor("createdAt", {
    header: (header) => <TableHeader header={header} name={"CreatedAt"} />,
    cell: (props) => (
      <Tooltip
        label={moment(props.getValue()).format("YYYY-MM-DD HH:mm:ss")}
        arrowOffset={12}
        arrowSize={6}
        withArrow
        className="max-h-32 max-w-80 text-wrap bg-gray-600  text-xs text-white"
      >
        <p className="mr-2 w-full truncate">
          {moment(props.getValue()).format("YYYY-MM-DD HH:mm:ss")}
        </p>
      </Tooltip>
    ),
  }),
  colHelper.accessor("action", {
    header: () => null,
    cell: () => (
      <p className="flex items-center  justify-start gap-x-3 px-0 text-gray-500">
        <EditReviewModal />
        <DeletePopover size={18} deleteItemName="review" />
      </p>
    ),
  }),
]

const Reviews = () => {
  const [globalFilter, setGlobalFilter] = useState("")
  const [columnFilters, setColumnFilters] = useState([
    { id: "rating", value: "" },
  ])

  const onColumnFilterChange = (rating, value) => {
    setColumnFilters((state) =>
      state.filter((f) => f.id !== rating).concat({ id: rating, value })
    )
  }

  const filteredRatingValue =
    columnFilters.find((f) => f.id === "rating").value || ""

  const isSelectedRating = (rating) => filteredRatingValue === rating

  return (
    <>
      <ClientFacingHeader
        heading={"Reviews"}
        subHeading={"Table for reviews"}
      />

      <div className="w-full p-4">
        {/** Header */}
        <section className="mb-6 flex flex-wrap  justify-end gap-8 md:justify-start">
          <TableSearchBar
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            placeholder={"Search review by product name, user name, etc..."}
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
              <button className="flex items-center gap-x-2 text-xs text-blue-500">
                <FiFilter />
                <p>Filter By Rating</p>
              </button>
            </Menu.Target>

            <Menu.Dropdown defaultValue="All">
              <Menu.Label>Ratings</Menu.Label>
              <Menu.Item
                className={`${
                  isSelectedRating("") && "bg-[#F5FAFF] text-gray-700"
                }  hover:bg-[#F5FAFF] hover:text-gray-700`}
                onClick={() => onColumnFilterChange("rating", "")}
                value={"All"}
              >
                All
              </Menu.Item>
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
            </Menu.Dropdown>
          </Menu>
        </section>

        {/** Table */}
        <Table
          data={data}
          columns={columns}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          columnFilters={columnFilters}
        />
      </div>
    </>
  )
}

export default Reviews
