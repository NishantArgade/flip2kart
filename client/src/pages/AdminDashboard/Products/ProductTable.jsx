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
import { Link } from "react-router-dom"
import { getTableHeader } from "../../../Utils/common.jsx"
import DeletePopover from "../../../components/DeletePopover.jsx"
import TablePagination from "../../../components/TablePagination.jsx"
import EditUser from "../../../components/modals/EditUserModal.jsx"

const data = [
  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },
]

const colHelper = createColumnHelper()
const columns = [
  colHelper.accessor("id", {
    header: (header) => getTableHeader(header, "ProductID"),
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),
  colHelper.accessor("name", {
    header: (header) => getTableHeader(header, "Name"),
    cell: (props) => (
      <Tooltip
        label={props.getValue()}
        arrowOffset={12}
        arrowSize={6}
        withArrow
        className="max-h-32 max-w-80 text-wrap bg-gray-600  text-xs text-white"
      >
        <p className="mr-2  w-32 truncate">{props.getValue()}</p>
      </Tooltip>
    ),
    // size: 1000,
  }),

  colHelper.accessor("price", {
    header: (header) => getTableHeader(header, "Price"),
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor("stock", {
    header: (header) => getTableHeader(header, "Stock"),
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor("category", {
    header: (header) => getTableHeader(header, "Category"),
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor("description", {
    header: (header) => getTableHeader(header, "Description"),
    cell: (props) => (
      <Tooltip
        label={props.getValue()}
        arrowOffset={12}
        arrowSize={6}
        withArrow
        className="max-h-32 max-w-80 text-wrap bg-gray-600  text-xs text-white"
      >
        <p className="mr-2 w-32 truncate">{props.getValue()}</p>
      </Tooltip>
    ),
  }),

  colHelper.accessor("createdAt", {
    header: (header) => getTableHeader(header, "CreatedAt"),
    cell: (props) => (
      <p className="mr-2">{moment(props.getValue()).format("YYYY-MM-DD")}</p>
    ),
  }),

  colHelper.accessor("updatedAt", {
    header: (header) => getTableHeader(header, "UpdatedAt"),
    cell: (props) => (
      <p className="mr-2">{moment(props.getValue()).format("YYYY-MM-DD")}</p>
    ),
  }),

  colHelper.accessor("action", {
    header: () => null,
    cell: () => (
      <p className="flex items-center  justify-start gap-x-3 px-0 text-gray-500">
        <Link to="/edit-product">
          {" "}
          <EditUser />
        </Link>
        <DeletePopover size={18} deleteItemName="product" />
      </p>
    ),
  }),
]

const ProductTable = ({ globalFilter, setGlobalFilter }) => {
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 11 })

  const table = useReactTable({
    data: data,
    columns: columns,
    state: {
      sorting,
      pagination,
      globalFilter,
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

export default ProductTable
