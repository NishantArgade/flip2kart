import { Menu, Modal, Rating, Tooltip } from "@mantine/core"
import { createColumnHelper } from "@tanstack/react-table"
import moment from "moment"
import { useState } from "react"
import { FiFilter } from "react-icons/fi"
import DeletePopover from "../../components/DeletePopover"
import ClientFacingHeader from "./components/ClientFacingHeader"
import Table from "./components/Table"
import TableHeader from "./components/TableHeader"
import TableSearchBar from "./components/TableSearchBar"
import { IoIosEye } from "react-icons/io"
import { useDisclosure } from "@mantine/hooks"
import { useMutation, useQuery } from "@tanstack/react-query"
import { allReviewAndRatings, deleteReview } from "../../api/ratingAndReviewApi"
import { queryClient } from "../../main"
import Spinner from "../../components/Spinner"

const getRatingColor = (rating) => {
  if (rating === "1") return "red"
  else if (rating === "2" || rating === "3") return "orange"
  else return "green"
}
const colHelper = createColumnHelper()

const Reviews = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const [globalFilter, setGlobalFilter] = useState("")
  const [userReview, setUserReview] = useState({})
  const [columnFilters, setColumnFilters] = useState([
    { id: "rating", value: "" },
  ])

  const { data, isLoading } = useQuery({
    queryKey: ["allReviews"],
    queryFn: allReviewAndRatings,
  })

  const { mutate, isPending } = useMutation({
    mutationKey: "deleteReview",
    mutationFn: deleteReview,
    onSuccess: () => queryClient.invalidateQueries("allReviews"),
  })

  const onColumnFilterChange = (rating, value) => {
    setColumnFilters((state) =>
      state.filter((f) => f.id !== rating).concat({ id: rating, value })
    )
  }

  const filteredRatingValue =
    columnFilters.find((f) => f.id === "rating").value || ""

  const isSelectedRating = (rating) => filteredRatingValue === rating

  function handleModalOpen(data) {
    setUserReview(data)
    open()
  }

  const columns = [
    colHelper.accessor("_id", {
      id: "srNo",
      header: (header) => <TableHeader header={header} name={"Sr._No"} />,
      cell: ({ row }) => <div>{row.index + 1}</div>,
      maxSize: 90,
    }),
    colHelper.accessor("_id", {
      header: (header) => <TableHeader header={header} name={"ReviewID"} />,
      cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    }),
    colHelper.accessor("product_id", {
      header: (header) => <TableHeader header={header} name={"Product_Name"} />,
      cell: (props) => (
        <Tooltip
          label={props.getValue().name}
          arrowOffset={12}
          arrowSize={6}
          withArrow
          className="max-h-32 max-w-96 text-wrap bg-gray-600  text-xs text-white"
        >
          <p className="mr-2 w-60 truncate">{props.getValue().name}</p>
        </Tooltip>
      ),
    }),

    colHelper.accessor("user_id", {
      header: (header) => <TableHeader header={header} name={"User_Name"} />,
      cell: (props) =>
        props.getValue()?.first_name || props.getValue()?.last_name ? (
          <Tooltip
            label={
              (props.getValue()?.first_name
                ? props.getValue()?.first_name
                : "") +
              " " +
              (props.getValue()?.last_name ? props.getValue()?.last_name : "")
            }
            arrowOffset={12}
            arrowSize={6}
            withArrow
            className="max-h-32 max-w-80 text-wrap bg-gray-600  text-xs text-white"
          >
            <p className="mr-2 w-32 truncate">
              {props.getValue()?.first_name} {props.getValue()?.last_name}
            </p>
          </Tooltip>
        ) : (
          "-"
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
          <span> {props.getValue()} ★</span>
        </p>
      ),
    }),
    colHelper.accessor("review_description", {
      header: (header) => <TableHeader header={header} name={"Comment"} />,
      cell: (props) => (
        <Tooltip
          label={props.getValue()}
          arrowOffset={12}
          arrowSize={6}
          withArrow
          className={`${props.getValue() ? "" : "hidden"} max-h-32 max-w-80 text-wrap bg-gray-600  text-xs text-white`}
        >
          <p className="mr-2 w-28 truncate">
            {props.getValue() ? props.getValue() : "-"}
          </p>
        </Tooltip>
      ),
    }),
    colHelper.accessor("created_at", {
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
      header: () => (
        <p className="ml-3 py-1 pb-5 text-xs text-gray-500">Action</p>
      ),
      cell: ({ row }) => (
        <p className="ml-3 flex items-center justify-center gap-x-3 px-0 text-gray-500">
          <IoIosEye
            onClick={() => handleModalOpen(row.original)}
            size={19}
            className="cursor-pointer"
          />
          <DeletePopover
            mutate={mutate}
            isPending={isPending}
            item={row.original}
            size={18}
            deleteItemName="review"
          />
        </p>
      ),
    }),
  ]

  return (
    <>
      <Modal
        size={"lg"}
        opened={opened}
        onClose={close}
        title="Edit Review"
        closeOnClickOutside={false}
        centered
      >
        <div>
          <div className="mb-2 flex flex-col gap-y-2 text-xs">
            <p className="text-sm font-semibold">Review Info</p>
            <div>
              <span className="font-medium">User Name: </span>
              <span>
                {userReview?.user_id?.first_name}{" "}
                {userReview?.user_id?.last_name}
              </span>
            </div>
            <div>
              <span className="font-medium">Product Name: </span>
              <span className="line-clamp-2">
                {" "}
                {userReview?.product_id?.name}{" "}
              </span>
            </div>
            <div>
              <span className="font-medium">Review At: </span>
              <span>2023-12-23 12:23:23 </span>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4">
              <div className="py-2">
                <p className="text-xs font-medium text-gray-900">
                  Product Rating
                </p>
                <div className="mt-2 flex items-center gap-x-4">
                  <Rating
                    value={userReview?.rating}
                    className="gap-x-2"
                    color="#FFE11B"
                    readOnly
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="Title"
                  className="mb-1 block text-xs font-medium text-gray-900"
                >
                  Title
                </label>
                <input
                  id="Title"
                  disabled
                  value={userReview?.review_title}
                  className="w-full resize-none rounded-md border-[1.5px] border-gray-300 p-2 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="Comment"
                  className="mb-1 block text-xs font-medium text-gray-900"
                >
                  Comment
                </label>
                <textarea
                  id="Commnet"
                  disabled
                  value={userReview?.review_description}
                  className="h-16 w-full resize-none rounded-md border-[1.5px] border-gray-300 p-2 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="relative flex h-16 w-fit items-center justify-center gap-x-2 ">
                {userReview?.images?.map((item, index) => (
                  <div
                    key={index}
                    className="group relative h-14  w-14 overflow-hidden  rounded-sm border border-gray-300 object-cover p-1 shadow-sm "
                  >
                    <img
                      className="h-full w-full object-contain"
                      src={item?.url}
                      alt="preview"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-4">
              <div className="flex flex-col self-start">
                <button
                  onClick={close}
                  className="rounded-sm border-[1.5px] border-gray-200 bg-white px-6 py-2 text-xs text-gray-800 shadow-md"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <ClientFacingHeader
        heading={"Reviews"}
        subHeading={"Table for reviews"}
      />

      {!isLoading ? (
        data?.allRviewsAndRatings.length > 0 ? (
          <div className="w-full p-4">
            {/** Header */}
            <section className="mb-6 flex flex-wrap  justify-end gap-8 md:justify-start">
              <TableSearchBar
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                placeholder={
                  "Search review by rating, comment, created at, etc..."
                }
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
                    <div className="relative">
                      <div
                        className={`${isSelectedRating("") ? "hidden" : ""} absolute -left-0 -top-1 h-1 w-1 rounded-full bg-blue-500`}
                      ></div>
                      <FiFilter />
                    </div>
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
              data={data?.allRviewsAndRatings}
              columns={columns}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              columnFilters={columnFilters}
            />
          </div>
        ) : (
          <div className="flex  h-[28rem] w-full items-center justify-center bg-white font-medium tracking-wider text-gray-300">
            No Data Available
          </div>
        )
      ) : (
        <div className="flex h-[30rem] items-center justify-center bg-white">
          <Spinner />
        </div>
      )}
    </>
  )
}

export default Reviews
