import { Tooltip } from "@mantine/core"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"
import { getTableHeader } from "../../../Utils/common"

const data = [
  {
    id: "adfasdfsdasdassdfdfdfsdffasfasdfsdfsafsd",
    firstName: "Nishant",
    lastName: "Argade",
    createAt: "2023-02-1 01:03:12",
    quantity: 40000000,
    cost: "150000000",
  },
  {
    id: "asfasddfsdfafs2",
    firstName: "Nishant2",
    lastName: "Argade",
    createAt: "2023-02-1 01:03:12",
    quantity: 4,
    cost: "2000",
  },
  {
    id: "2",
    firstName: "Nishant3",
    lastName: "Argade",
    createAt: "2023-02-1 01:03:12",
    quantity: 4,
    cost: "2000",
  },
  {
    id: "assdfsafs4",
    firstName: "Nishant4",
    lastName: "Argade",
    createAt: "2023-02-1 01:03:15",
    quantity: 4,
    cost: "2000",
  },
  {
    id: "asfasdfss5",
    firstName: "Nishant5",
    lastName: "Argade",
    createAt: "2023-02-2 01:03:12",
    quantity: 4,
    cost: "2000",
  },
  {
    id: "asfasdfsaasdsfasdfsdfsafs7",
    firstName: "Nishant6",
    lastName: "Argade32",
    createAt: "2023-02-3 01:03:12",
    quantity: 2,
    cost: "4000",
  },
  {
    id: "asdfsdfffsafs8",
    firstName: "Nishant6",
    lastName: "Argade32",
    createAt: "2023-02-3 01:03:12",
    quantity: 2,
    cost: "4000",
  },
  {
    id: "asdsfffasdfsafs8f",
    firstName: "Nishant6",
    lastName: "Argade32",
    createAt: "2023-02-3 01:03:12",
    quantity: 2,
    cost: "4000",
  },
  {
    id: "asfdfasdfsdffsafs8",
    firstName: "Nishant6",
    lastName: "Argade32",
    createAt: "2023-02-3 01:03:12",
    quantity: 2,
    cost: "4000",
  },
  {
    id: "asfasdfsfdffsafs8",
    firstName: "Nishant6",
    lastName: "Argade32",
    createAt: "2023-02-3 01:03:12",
    quantity: 2,
    cost: "4000",
  },
  {
    id: "asfasasddfsdffsafs8",
    firstName: "Nishant6",
    lastName: "Argade32",
    createAt: "2023-02-3 01:03:12",
    quantity: 2,
    cost: "4000",
  },
]

const columnHelper = createColumnHelper()
const columns = [
  columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    id: "full name",
    header: (header) => getTableHeader(header, "Name"),
    cell: (props) => (
      <Tooltip
        label={props.getValue()}
        arrowOffset={12}
        arrowSize={6}
        withArrow
        className="max-h-32 max-w-80 text-wrap bg-gray-600  text-xs text-white"
      >
        <p className="mr-2  w-16 truncate">{props.getValue()}</p>
      </Tooltip>
    ),
    // minSize: 200,
  }),

  columnHelper.accessor("id", {
    header: (header) => getTableHeader(header, "UserID"),
    cell: (props) => (
      <p className="mr-2 py-2 text-[0.7rem]">{props.getValue()}</p>
    ),
  }),

  columnHelper.accessor("createAt", {
    header: (header) => getTableHeader(header, "CreatedAt"),
    cell: (props) => (
      <Tooltip
        label={props.getValue()}
        arrowOffset={12}
        arrowSize={6}
        withArrow
        className="max-h-32 max-w-80 text-wrap bg-gray-600  text-xs text-white"
      >
        <p className="mr-2  w-16 truncate">{props.getValue()}</p>
      </Tooltip>
    ),
    // minSize: 180,
  }),

  columnHelper.accessor("quantity", {
    header: (header) => getTableHeader(header, "Qty"),
    cell: (props) => (
      <p className="mr-2 py-2 text-[0.7rem]">{props.getValue()}</p>
    ),
    // size: 120,
  }),
  columnHelper.accessor("cost", {
    header: (header) => getTableHeader(header, "Cost"),
    cell: (props) => <p className="py-2 text-[0.7rem]">{props.getValue()}</p>,
    // size: 120,
  }),
]

const LatestTransactionTable = () => {
  const [sorting, setSorting] = useState([])

  const reactTable = useReactTable({
    columns,
    data,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  })

  return (
    <div className=" col-span-1  rounded-md  bg-gray-50 p-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] lg:col-span-8">
      <div className="pb-4 text-sm font-semibold tracking-wide text-slate-500">
        Latest Transactions
      </div>
      <div className="thin-scrollbar  w-full overflow-auto">
        <table width={reactTable.getTotalSize()} id="latestTransactionTable">
          <thead>
            {reactTable.getHeaderGroups().map((headerGroup) => {
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
            {reactTable.getRowModel().rows.map((row) => {
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
    </div>
  )
}

export default LatestTransactionTable
