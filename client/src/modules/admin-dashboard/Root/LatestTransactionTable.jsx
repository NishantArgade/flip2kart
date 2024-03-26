import { Tooltip } from "@mantine/core"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"
import TableHeader from "../components/TableHeader.jsx"
import TablePagination from "../components/TablePagination.jsx"
import moment from "moment"
import Spinner from "../../../components/Spinner.jsx"
import Skeleton from "react-loading-skeleton"

// const data = [
//   {
//     id: "adfasdfsdasdassdfdfdfsdffasfasdfsdfsafsd",
//     firstName: "Nishant",
//     lastName: "Argade",
//     createAt: "2023-02-1 01:03:12",
//     quantity: 40000000,
//     cost: "150000000",
//   },
//   {
//     id: "asfasddfsdfafs2",
//     firstName: "Nishant2",
//     lastName: "Argade",
//     createAt: "2023-02-1 01:03:12",
//     quantity: 4,
//     cost: "2000",
//   },
//   {
//     id: "2",
//     firstName: "Nishant3",
//     lastName: "Argade",
//     createAt: "2023-02-1 01:03:12",
//     quantity: 4,
//     cost: "2000",
//   },
//   {
//     id: "assdfsafs4",
//     firstName: "Nishant4",
//     lastName: "Argade",
//     createAt: "2023-02-1 01:03:15",
//     quantity: 4,
//     cost: "2000",
//   },
//   {
//     id: "asfasdfss5",
//     firstName: "Nishant5",
//     lastName: "Argade",
//     createAt: "2023-02-2 01:03:12",
//     quantity: 4,
//     cost: "2000",
//   },
//   {
//     id: "asfasdfsaasdsfasdfsdfsafs7",
//     firstName: "Nishant6",
//     lastName: "Argade32",
//     createAt: "2023-02-3 01:03:12",
//     quantity: 2,
//     cost: "4000",
//   },
//   {
//     id: "asdfsdfffsafs8",
//     firstName: "Nishant6",
//     lastName: "Argade32",
//     createAt: "2023-02-3 01:03:12",
//     quantity: 2,
//     cost: "4000",
//   },
//   {
//     id: "asdsfffasdfsafs8f",
//     firstName: "Nishant6",
//     lastName: "Argade32",
//     createAt: "2023-02-3 01:03:12",
//     quantity: 2,
//     cost: "4000",
//   },
//   {
//     id: "asfdfasdfsdffsafs8",
//     firstName: "Nishant6",
//     lastName: "Argade32",
//     createAt: "2023-02-3 01:03:12",
//     quantity: 2,
//     cost: "4000",
//   },
//   {
//     id: "asfasdfsfdffsafs8",
//     firstName: "Nishant6",
//     lastName: "Argade32",
//     createAt: "2023-02-3 01:03:12",
//     quantity: 2,
//     cost: "4000",
//   },
//   {
//     id: "asfasasddfsdffsafs8",
//     firstName: "Nishant6",
//     lastName: "Argade32",
//     createAt: "2023-02-3 01:03:12",
//     quantity: 2,
//     cost: "4000",
//   },
// ]

const columnHelper = createColumnHelper()
const columns = [
  columnHelper.accessor("_id", {
    header: (header) => <TableHeader header={header} name={"UserID"} />,
    cell: (props) => (
      <p className="mr-2 py-2 text-[0.7rem]">{props.getValue()}</p>
    ),
  }),

  columnHelper.accessor("billing_user", {
    header: (header) => <TableHeader header={header} name={"Name"} />,
    cell: (props) => (
      <Tooltip
        label={props.getValue()}
        arrowOffset={12}
        arrowSize={6}
        withArrow
        className="text-wrap bg-gray-600  text-xs text-white"
      >
        <p className="mr-2   truncate">{props.getValue()}</p>
      </Tooltip>
    ),
    // minSize: 200,
  }),

  columnHelper.accessor("totalQuantity", {
    header: (header) => <TableHeader header={header} name={"Qty"} />,
    cell: (props) => (
      <p className="mr-2 py-2 text-[0.7rem]">{props.getValue()}</p>
    ),
    // size: 120,
  }),
  columnHelper.accessor("total_price", {
    header: (header) => <TableHeader header={header} name={"Cost"} />,
    cell: (props) => <p className="py-2 text-[0.7rem]">{props.getValue()}</p>,
    // size: 120,
  }),

  columnHelper.accessor("create_at", {
    header: (header) => <TableHeader header={header} name={"Transaction At"} />,
    cell: (props) => (
      <Tooltip
        label={moment(props.getValue()).format("YYYY-MM-DD HH:mm:ss")}
        arrowOffset={12}
        arrowSize={6}
        withArrow
        className="text-wrap bg-gray-600  text-xs text-white"
      >
        <p className="mr-2  truncate">
          {moment(props.getValue()).format("YYYY-MM-DD HH:mm:ss")}
        </p>
      </Tooltip>
    ),
    // minSize: 180,
  }),
]

const LatestTransactionTable = ({ data, isLoading }) => {
  const [sorting, setSorting] = useState([])
  console.log(data)
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const table = useReactTable({
    columns,
    data: data,
    state: {
      sorting,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
  })
  return (
    <div className=" col-span-1 flex flex-col rounded-md  bg-gray-50 p-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] lg:col-span-8">
      <div className="pb-4 text-sm font-semibold tracking-wide text-slate-500">
        Latest Transactions
      </div>
      {!isLoading ? (
        <div className=" h-full w-full ">
          <table width={table.getTotalSize()} id="latestTransactionTable">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          width={header.column.getSize()}
                          key={header.id}
                          id={header.id}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      )
                    })}
                  </tr>
                )
              })}
            </thead>
            <tbody className="text-xs">
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id} className="border-b-2">
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          width={cell.column.getSize()}
                          className=""
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="min-h-56 w-full lg:min-h-[22rem]">
          <Skeleton width="100%" height="100%" />
        </div>
      )}
      {!isLoading ? (
        <TablePagination table={table} />
      ) : (
        <div className="mt-4 w-full">
          <Skeleton width="100%" height={30} />
        </div>
      )}
    </div>
  )
}

export default LatestTransactionTable
