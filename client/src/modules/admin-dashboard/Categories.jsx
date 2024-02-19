import { Tooltip } from "@mantine/core"
import { createColumnHelper } from "@tanstack/react-table"
import moment from "moment"
import { useState } from "react"
import { IoMdAddCircle } from "react-icons/io"
import DeletePopover from "../../components/DeletePopover.jsx"
import ClientFacingHeader from "./components/ClientFacingHeader.jsx"
import Table from "./components/Table.jsx"
import TableHeader from "./components/TableHeader.jsx"
import TableSearchBar from "./components/TableSearchBar.jsx"
import { useDisclosure } from "@mantine/hooks"
import { FaEdit } from "react-icons/fa"
import CategoryModal from "./components/CategoryModal.jsx"

const data = [
  {
    id: "65a63a404e9ce490acd0c3a6",
    category: "Clothes",
    brands: [
      "Nike",
      "Adidas",
      "Puma",
      "Reebok",
      "Nike",
      "Adidas",
      "Puma",
      "Reebok",
      "Nike",
      "Adidas",
      "Puma",
      "Reebok",
      "Adidas",
      "Puma",
      "Reebok",
      "Nike",
      "Adidas",
      "Puma",
      "Reebok",
      "Nike",
      "Adidas",
      "Puma",
      "Reebok",
      "Adidas",
      "Puma",
      "Reebok",
      "Nike",
      "Adidas",
      "Puma",
      "Reebok",
      "Nike",
      "Adidas",
      "Puma",
      "Reebok",
    ],
    totalProducts: 100,
    createdAt: new Date("2023/01/10"),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    category: "Phone",
    brands: ["Apple", "Samsung", "OnePlus", "Xiaomi"],
    totalProducts: 100,
    createdAt: new Date("2023/01/10"),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    category: "Clothes",
    brands: ["Nike", "Adidas", "Puma", "Reebok"],
    totalProducts: 100,
    createdAt: new Date("2023/01/10"),
  },
]

const colHelper = createColumnHelper()

const Categories = () => {
  const [globalFilter, setGlobalFilter] = useState("")
  const [opened, { open, close }] = useDisclosure(false)
  const [isEdit, setIsEdit] = useState(false)

  function handleEdit() {
    setIsEdit(true)
    open()
  }
  function handleAddOffice() {
    setIsEdit(false)
    open()
  }
  const columns = [
    colHelper.accessor("id", {
      header: (header) => <TableHeader header={header} name={"ID"} />,
      cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    }),

    colHelper.accessor("category", {
      header: (header) => <TableHeader header={header} name={"Category"} />,
      cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    }),

    colHelper.accessor("brands", {
      header: (header) => <TableHeader header={header} name={"Brands"} />,
      cell: (props) => (
        <Tooltip
          label={props.getValue().join(", ")}
          withArrow
          arrowOffset={12}
          arrowSize={6}
          className="max-h-40 max-w-[28rem] text-wrap bg-gray-600  text-xs text-white"
        >
          <p className="mr-2 w-[28rem] truncate">
            {props.getValue().join(", ")}
          </p>
        </Tooltip>
      ),
    }),

    colHelper.accessor("totalProducts", {
      header: (header) => (
        <TableHeader header={header} name={"Total Products"} />
      ),
      cell: (props) => <p className="mr-2 w-32 truncate">{props.getValue()}</p>,
    }),

    colHelper.accessor("createdAt", {
      header: (header) => <TableHeader header={header} name={"createdAt"} />,
      cell: (props) => (
        <p className="mr-2">{moment(props.getValue()).format("YYYY-MM-DD")}</p>
      ),
    }),

    colHelper.accessor("action", {
      header: () => null,
      cell: () => (
        <p className="flex items-center  justify-start gap-x-3 px-0 text-gray-500">
          <FaEdit onClick={handleEdit} />
          <DeletePopover size={18} deleteItemName="category" />
        </p>
      ),
    }),
  ]
  return (
    <>
      <CategoryModal opened={opened} close={close} isEdit={isEdit} />

      <ClientFacingHeader
        heading={"Categories"}
        subHeading={"Table for to see category details"}
      />
      <div className="w-full p-4">
        <section className="mb-6 flex justify-between gap-x-2">
          <TableSearchBar
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            placeholder={"Search office by category, brand, etc..."}
          />
          <button
            onClick={handleAddOffice}
            className="flex  h-full w-20 cursor-pointer items-center justify-center gap-x-2 bg-blue-600 py-2 text-xs   text-white lg:w-32"
          >
            <IoMdAddCircle size={20} />
            <p className="hidden lg:block">Add Category</p>
          </button>
        </section>

        {/** Table */}
        <Table
          data={data}
          columns={columns}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
    </>
  )
}

export default Categories
