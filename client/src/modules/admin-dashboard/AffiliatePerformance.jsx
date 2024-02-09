import { createColumnHelper } from "@tanstack/react-table"
import moment from "moment"
import { useState } from "react"
import TableHeader from "./components/TableHeader"
import ClientFacingHeader from "./components/ClientFacingHeader"
import Table from "./components/Table"
import TableSearchBar from "./components/TableSearchBar"

const data = [
  {
    id: "65a63a404e9ce490acd0c3a6",
    firstName: "Aniket",
    lastName: "Argade",
    userId: "65a63a404e9ce490acd0c3a6",
    status: "Processing",
    quantity: 30000,
    amount: 20000000,
    address:
      "pune, maharashtra, chakan pin 410501, near ganesh temple pune india",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    firstName: "Aniket",
    lastName: "Argade",
    userId: "65a63a404e9ce490acd0c3a6",
    status: "Delivered",
    quantity: 30000,
    amount: 20000000,
    address:
      "pune, maharashtra, chakan pin 410501, near ganesh temple pune india",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    firstName: "Aniket",
    lastName: "Argade",
    userId: "65a63a404e9ce490acd0c3a6",
    status: "Failed",
    quantity: 30000,
    amount: 20000000,
    address:
      "pune, maharashtra, chakan pin 410501, near ganesh temple pune india",
    createdAt: new Date(),
  },
]

const colHelper = createColumnHelper()
const columns = [
  colHelper.accessor("id", {
    header: (header) => <TableHeader header={header} name={"ID"} />,
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),
  colHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    id: "fullName",
    header: (header) => <TableHeader header={header} name={"Name"} />,
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor("userId", {
    header: (header) => <TableHeader header={header} name={"UserID"} />,
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor("createdAt", {
    header: (header) => <TableHeader header={header} name={"CreatedAt"} />,
    cell: (props) => (
      <p className="mr-2 w-fit truncate">
        {moment(props.getValue()).format("YYYY-MM-DD HH:mm:ss")}
      </p>
    ),
  }),

  colHelper.accessor("quantity", {
    header: (header) => <TableHeader header={header} name={"# of Products"} />,
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor("amount", {
    header: (header) => <TableHeader header={header} name={"Amount"} />,
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    // size: 50,
  }),
]

const AffiliatePerformance = () => {
  const [globalFilter, setGlobalFilter] = useState("")

  return (
    <>
      <ClientFacingHeader
        heading={"Affiliate Performance"}
        subHeading={"Track your affiliate sales performance here"}
      />

      <div className=" w-full p-4 ">
        {/** Header */}
        <section className="mb-6 flex justify-start">
          <TableSearchBar
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            placeholder={"Search by name, amount, etc..."}
          />
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

export default AffiliatePerformance
