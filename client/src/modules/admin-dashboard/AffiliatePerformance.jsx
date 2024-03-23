import { createColumnHelper } from "@tanstack/react-table"
import moment from "moment"
import { useState } from "react"
import TableHeader from "./components/TableHeader"
import ClientFacingHeader from "./components/ClientFacingHeader"
import Table from "./components/Table"
import TableSearchBar from "./components/TableSearchBar"
import { useQuery } from "@tanstack/react-query"
import { getAffiliatePerformanceData } from "../../api/userApi"
import Spinner from "../../components/Spinner"

const data2 = [
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
  colHelper.accessor("_id", {
    header: (header) => <TableHeader header={header} name={"UserID"} />,
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor("user_name", {
    header: (header) => <TableHeader header={header} name={"Name"} />,
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor("count", {
    header: (header) => <TableHeader header={header} name={"# of Orders"} />,
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor("total_price", {
    header: (header) => <TableHeader header={header} name={"Total Amount"} />,
    cell: (props) => (
      <p className="mr-2">₹{props.getValue().toLocaleString("en-In")}</p>
    ),
  }),
]

const AffiliatePerformance = () => {
  const [globalFilter, setGlobalFilter] = useState("")

  const { data, isLoading } = useQuery({
    queryKey: ["affiliatePerformanceData"],
    queryFn: getAffiliatePerformanceData,
  })

  console.log(data)

  return (
    <>
      <ClientFacingHeader
        heading={"Affiliate Performance"}
        subHeading={"Track your affiliate sales performance here"}
      />

      {!isLoading ? (
        data?.orders?.length > 0 ? (
          <div className="w-full p-4 ">
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
              data={data?.orders}
              columns={columns}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
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

export default AffiliatePerformance
