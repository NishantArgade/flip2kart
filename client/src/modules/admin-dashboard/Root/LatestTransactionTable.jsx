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
import Skeleton from "react-loading-skeleton"

const columnHelper = createColumnHelper()
const columns = [
  columnHelper.accessor("_id", {
    id: "srNo",
    header: (header) => <TableHeader header={header} name={"Sr. No"} />,
    cell: ({ row }) => <div>{row.index + 1}</div>,
    maxSize: 20,
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
  }),

  columnHelper.accessor("totalQuantity", {
    header: (header) => <TableHeader header={header} name={"Qty"} />,
    cell: (props) => (
      <p className="mr-2 py-2 text-[0.7rem]">{props.getValue()}</p>
    ),
  }),

  columnHelper.accessor("total_price", {
    header: (header) => <TableHeader header={header} name={"Amount"} />,
    cell: (props) => (
      <p className="py-2 text-[0.7rem]">
        ₹{props.getValue().toLocaleString("en-In")}
      </p>
    ),
  }),

  columnHelper.accessor("payment.status", {
    header: (header) => <TableHeader header={header} name={"Status"} />,
    cell: (props) => (
      <p
        className={`${props.getValue() === "captured" ? "text-green-600" : props.getValue() === "failed" ? "text-red-500" : ""} py-2 text-[0.7rem]`}
      >
        {props.getValue()}
      </p>
    ),
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
  }),
]

const LatestTransactionTable = ({ data, isLoading }) => {
  const [sorting, setSorting] = useState([])
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
    <div className="col-span-1 flex flex-col rounded-md  bg-gray-50  p-3  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] lg:col-span-8">
      <div className="pb-4 text-sm font-semibold tracking-wide text-slate-500">
        Latest Transactions
      </div>
      {!isLoading ? (
        data?.length > 0 ? (
          <div className="h-full w-full overflow-auto ">
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
          <div className="flex h-80 w-full items-center justify-center">
            <p className="text-sm text-gray-400">No transactions found</p>
          </div>
        )
      ) : (
        <div className="min-h-56 w-full lg:min-h-[22rem]">
          <Skeleton width="100%" height="100%" />
        </div>
      )}
      {!isLoading ? (
        data?.length > 0 && <TablePagination table={table} />
      ) : (
        <div className="mt-4 w-full">
          <Skeleton width="100%" height={30} />
        </div>
      )}
    </div>
  )
}

export default LatestTransactionTable
