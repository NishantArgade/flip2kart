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
import OfferModal from "./components/OfferModal.jsx"

const data = [
  {
    id: "65a63a404e9ce490acd0c3a6",
    offer:
      "Bank Offer10% off on Citi-branded Credit and Debit Card Txns, up to ₹1,500 on orders of ₹10,000 and above  and Debit Card Txns, up to ₹1,500 on orders of ₹10,000 and above",
    createdAt: new Date("2023/01/10"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    offer:
      "Bank Offer10% off on Citi-branded Credit and Debit Card Txns, up to ₹1,500 on orders of ₹10,000 and above",
    createdAt: new Date("2023/01/10"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    offer: "EMI starting from ₹1,600/month",
    createdAt: new Date("2023/01/10"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    offer:
      "Bank Offer10% off on Citi-branded Credit and Debit Card Txns, up to ₹1,500 on orders of ₹10,000 and above",
    createdAt: new Date("2023/01/10"),
  },
]

const colHelper = createColumnHelper()

const Offers = () => {
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

    colHelper.accessor("offer", {
      header: (header) => <TableHeader header={header} name={"Offer"} />,
      cell: (props) => <p className="mr-2 w-[40rem]">{props.getValue()}</p>,
    }),

    colHelper.accessor("createdAt", {
      header: (header) => <TableHeader header={header} name={"Created At"} />,
      cell: (props) => (
        <p className="mr-2">{moment(props.getValue()).format("YYYY-MM-DD")}</p>
      ),
    }),

    colHelper.accessor("action", {
      header: () => null,
      cell: () => (
        <p className="flex items-center  justify-start gap-x-3 px-0 text-gray-500">
          <FaEdit onClick={handleEdit} />
          <DeletePopover size={18} deleteItemName="offer" />
        </p>
      ),
    }),
  ]
  return (
    <>
      <OfferModal opened={opened} close={close} isEdit={isEdit} />

      <ClientFacingHeader
        heading={"Offers"}
        subHeading={"Table for to see all available offers"}
      />
      <div className="w-full p-4">
        <section className="mb-6 flex justify-between gap-x-2">
          <TableSearchBar
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            placeholder={"Search office by offer"}
          />
          <button
            onClick={handleAddOffice}
            className="flex  h-full w-20 cursor-pointer items-center justify-center gap-x-2 bg-blue-600 py-2 text-xs   text-white lg:w-32"
          >
            <IoMdAddCircle size={20} />
            <p className="hidden lg:block">Add Offer</p>
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

export default Offers
