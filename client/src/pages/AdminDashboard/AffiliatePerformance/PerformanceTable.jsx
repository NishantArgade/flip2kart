import { Tooltip } from "@mantine/core"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import moment from "moment"
import { useState } from "react"
import { getTableHeader } from "../../../Utils/common.jsx"
import DeletePopover from "../../../components/DeletePopover.jsx"
import TablePagination from "../../../components/TablePagination.jsx"
import EditTransactionModal from "../../../components/modals/EditTransactionModal.jsx"

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
    header: (header) => getTableHeader(header, "ID"),
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),
  colHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    id: "fullName",
    header: (header) => getTableHeader(header, "Name"),
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor("userId", {
    header: (header) => getTableHeader(header, "UserID"),
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor("createdAt", {
    header: (header) => getTableHeader(header, "CreatedAt"),
    cell: (props) => (
      <p className="mr-2 w-fit truncate">
        {moment(props.getValue()).format("YYYY-MM-DD HH:mm:ss")}
      </p>
    ),
  }),

  colHelper.accessor("quantity", {
    header: (header) => getTableHeader(header, "# of Products"),
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor("amount", {
    header: (header) => getTableHeader(header, "Amount"),
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    // size: 50,
  }),
]

const PerformanceTable = ({ globalFilter, setGlobalFilter, columnFilters }) => {
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 11 })

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      globalFilter,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
  })

  return (
    <div>
      <div className="thin-scrollbar flex h-[28rem] w-full flex-col justify-between overflow-auto">
        <table
          width={table.getTotalSize()}
          className="bg-red-00 w-full text-sm "
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id} className="border-b-2">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id} width={header.column.getSize()}>
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
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b-2  text-xs">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    width={cell.column.getSize()}
                    className="py-2"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination table={table} />
    </div>
  )
}

export default PerformanceTable
