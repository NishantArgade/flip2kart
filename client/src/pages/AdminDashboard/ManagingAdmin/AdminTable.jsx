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
import EditUserModal from "../../../components/modals/EditUserModal.jsx"

const data = [
  {
    id: "65a63a404e9ce490acd0c3a6",
    firstName: "Nishant",
    lastName: "Argade",
    email: "nishantargade4579@gmail.com",
    phone: "12322324223",
    country: "India",
    role: "Admin",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    firstName: "Omkar",
    lastName: "Khandagle",
    email: "nishantargade4579@gmail.com",
    phone: "12322324223",
    country: "India",
    role: "Admin",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    firstName: "Aniket",
    lastName: "Argade",
    email: "nishantargade4579@gmail.com",
    phone: "12322324223",
    country: "India",
    role: "Operator",
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

  colHelper.accessor("createdAt", {
    header: (header) => getTableHeader(header, "CreatedAt"),
    cell: (props) => (
      <Tooltip
        label={moment(props.getValue()).format("YYYY-MM-DD HH:mm:ss")}
        arrowOffset={12}
        arrowSize={6}
        withArrow
        className="max-h-32 max-w-80 text-wrap bg-gray-600  text-xs text-white"
      >
        <p className="mr-2 w-[4.5rem] truncate">
          {moment(props.getValue()).format("YYYY-MM-DD HH:mm:ss")}
        </p>
      </Tooltip>
    ),
  }),

  colHelper.accessor("email", {
    header: (header) => getTableHeader(header, "Email"),
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor("phone", {
    header: (header) => getTableHeader(header, "Phone"),
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),
  colHelper.accessor("country", {
    header: (header) => getTableHeader(header, "Country"),
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor("role", {
    header: (header) => getTableHeader(header, "Role"),
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor("action", {
    header: () => null,
    cell: (props) => (
      <p className="flex items-center  justify-start gap-x-3 px-0 text-gray-500">
        <EditUserModal />
        <DeletePopover size={18} deleteItemName={props.row.original.role} />
      </p>
    ),
  }),
]

const AdminTable = ({ globalFilter, setGlobalFilter, columnFilters }) => {
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

export default AdminTable
