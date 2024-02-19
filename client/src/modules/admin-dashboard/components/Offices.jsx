import { Modal, Tooltip } from "@mantine/core"
import { createColumnHelper } from "@tanstack/react-table"
import moment from "moment"
import { useState } from "react"
import { IoMdAddCircle } from "react-icons/io"
import { Link } from "react-router-dom"
import DeletePopover from "../../components/DeletePopover.jsx"
import EditUser from "../../components/EditUserModal.jsx"
import ClientFacingHeader from "./components/ClientFacingHeader.jsx"
import Table from "./components/Table.jsx"
import TableHeader from "./components/TableHeader.jsx"
import TableSearchBar from "./components/TableSearchBar.jsx"
import { useDisclosure } from "@mantine/hooks"
import OfficeModal from "./components/OfficeModal.jsx"
import { FaEdit } from "react-icons/fa"

const data = [
  {
    id: "65a63a404e9ce490acd0c3a6",
    manager: "Nishant Argade",
    country: "India",
    state: "Maharashtra",
    city: ["Pune", "Mumbai", "Goa", "Nashik", "Channai"],
    phone: "1234567890",
    establishedAt: new Date("2023/01/10"),
  },
  {
    id: "65a63a404e9ce490acd0c31a6",
    manager: "Omkar Khandagle",
    country: "United State",
    state: "CA",
    city: ["San Francisco", "Los Angeles"],
    phone: "1234567890",
    establishedAt: new Date("2023/01/11"),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    manager: "Aniket Argade",
    country: "UK",
    state: "ENG",
    city: ["London", "Manchester"],
    phone: "1234567890",
    establishedAt: new Date("2023/01/12"),
  },
]

const colHelper = createColumnHelper()

const Offices = () => {
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

    colHelper.accessor("manager", {
      header: (header) => <TableHeader header={header} name={"Manager"} />,
      cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    }),

    colHelper.accessor("country", {
      header: (header) => <TableHeader header={header} name={"Country"} />,
      cell: (props) => (
        <p className="mr-2  w-32 truncate">{props.getValue()}</p>
      ),
    }),

    colHelper.accessor("state", {
      header: (header) => <TableHeader header={header} name={"State"} />,
      cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    }),

    colHelper.accessor("city", {
      header: (header) => <TableHeader header={header} name={"City"} />,
      cell: (props) => (
        <Tooltip
          label={props.getValue().join(", ")}
          withArrow
          arrowOffset={12}
          arrowSize={6}
          className="max-h-32 max-w-96 text-wrap bg-gray-600  text-xs text-white"
        >
          <p className="mr-2 w-40 truncate">{props.getValue().join(", ")}</p>
        </Tooltip>
      ),
    }),

    colHelper.accessor("phone", {
      header: (header) => <TableHeader header={header} name={"Phone"} />,
      cell: (props) => <p className="mr-2 w-32 truncate">{props.getValue()}</p>,
    }),

    colHelper.accessor("establishedAt", {
      header: (header) => (
        <TableHeader header={header} name={"EstablishedAt"} />
      ),
      cell: (props) => (
        <p className="mr-2">{moment(props.getValue()).format("YYYY-MM-DD")}</p>
      ),
    }),

    colHelper.accessor("action", {
      header: () => null,
      cell: () => (
        <p className="flex items-center  justify-start gap-x-3 px-0 text-gray-500">
          <FaEdit onClick={handleEdit} />
          <DeletePopover size={18} deleteItemName="office" />
        </p>
      ),
    }),
  ]
  return (
    <>
      <OfficeModal opened={opened} close={close} isEdit={isEdit} />

      <ClientFacingHeader
        heading={"Offices"}
        subHeading={"Table for to see office details"}
      />
      <div className="w-full p-4">
        <section className="mb-6 flex justify-between gap-x-2">
          <TableSearchBar
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            placeholder={"Search office by name, location, etc..."}
          />
          <button
            onClick={handleAddOffice}
            className="flex  h-full w-20 cursor-pointer items-center justify-center gap-x-2 bg-blue-600 py-2 text-xs   text-white lg:w-32"
          >
            <IoMdAddCircle size={20} />
            <p className="hidden lg:block">Add Office</p>
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

export default Offices
