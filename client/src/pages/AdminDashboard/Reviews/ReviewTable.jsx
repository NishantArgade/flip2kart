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
import EditReviewModal from "../../../components/modals/EditReviewModal.jsx"

const data = [
  {
    id: "65a63a404e9ce490acd0c3a6",
    productId: "65a63a404e9ce490acd0c3a6",
    productName: "Iphone",
    userId: "65a63a404e9ce490acd0c3a6",
    userName: "Nishant Argade",
    rating: "4",
    comment:
      "Elitr ea sed stet sed et amet duo aliquyam sed, dolor eos ipsum sanctus rebum invidunt. Diam ut dolor vero.",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    productId: "65a63a404e9ce490acd0c3a6",
    productName: "Iphone",
    userId: "65a63a404e9ce490acd0c3a6",
    userName: "Nishant Argade",
    rating: "5",
    comment:
      "Elitr ea sed stet sed et amet duo aliquyam sed, dolor eos ipsum sanctus rebum invidunt. Diam ut dolor vero.",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    productId: "65a63a404e9ce490acd0c3a6",
    productName: "Iphone",
    userId: "65a63a404e9ce490acd0c3a6",
    userName: "Nishant Argade",
    rating: "3",
    comment:
      "Elitr ea sed stet sed et amet duo aliquyam sed, dolor eos ipsum sanctus rebum invidunt. Diam ut dolor vero.",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    productId: "65a63a404e9ce490acd0c3a6",
    productName: "Iphone",
    userId: "65a63a404e9ce490acd0c3a6",
    userName: "Nishant Argade",
    rating: "2",
    comment:
      "Elitr ea sed stet sed et amet duo aliquyam sed, dolor eos ipsum sanctus rebum invidunt. Diam ut dolor vero.",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    productId: "65a63a404e9ce490acd0c3a6",
    productName: "Iphone",
    userId: "65a63a404e9ce490acd0c3a6",
    userName: "Nishant Argade",
    rating: "1",
    comment:
      "Elitr ea sed stet sed et amet duo aliquyam sed, dolor eos ipsum sanctus rebum invidunt. Diam ut dolor vero.",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce4d90acd0c3a6",
    productId: "65a63a404e9ce490acd0c3a6",
    productName: "Iphone",
    userId: "65a63a404e9ce490acd0c3a6",
    userName: "Nishant Argade",
    rating: "1",
    comment:
      "Elitr ea sed stet sed et amet duo aliquyam sed, dolor eos ipsum sanctus rebum invidunt. Diam ut dolor vero.",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    productId: "65a63a404e9ce490acd0c3a6",
    productName: "Iphone",
    userId: "65a63a404e9ce490acd0c3a6",
    userName: "Nishant Argade",
    rating: "5",
    comment:
      "Elitr ea sed stet sed et amet duo aliquyam sed, dolor eos ipsum sanctus rebum invidunt. Diam ut dolor vero.",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    productId: "65a63a404e9ce490acd0c3a6",
    productName: "Iphone",
    userId: "65a63a404e9ce490acd0c3a6",
    userName: "Nishant Argade",
    rating: "3",
    comment:
      "Elitr ea sed stet sed et amet duo aliquyam sed, dolor eos ipsum sanctus rebum invidunt. Diam ut dolor vero.",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    productId: "65a63a404e9ce490acd0c3a6",
    productName: "Iphone",
    userId: "65a63a404e9ce490acd0c3a6",
    userName: "Nishant Argade",
    rating: "2",
    comment:
      "Elitr ea sed stet sed et amet duo aliquyam sed, dolor eos ipsum sanctus rebum invidunt. Diam ut dolor vero.",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    productId: "65a63a404e9ce490acd0c3a6",
    productName: "Iphone",
    userId: "65a63a404e9ce490acd0c3a6",
    userName: "Nishant2 Argade",
    rating: "1",
    comment:
      "Elitr ea sed stet sed et amet duo aliquyam sed, dolor eos ipsum sanctus rebum invidunt. Diam ut dolor vero.",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce4d90acd0c3a6",
    productId: "65a63a404e9ce490acd0c3a6",
    productName: "Iphone",
    userId: "65a63a404e9ce490acd0c3a6",
    userName: "Nishant Argade",
    rating: "1",
    comment:
      "Elitr ea sed stet sed et amet duo aliquyam sed, dolor eos ipsum sanctus rebum invidunt. Diam ut dolor vero.",
    createdAt: new Date(),
  },
]

const getRatingColor = (rating) => {
  if (rating === "1") return "red"
  else if (rating === "2" || rating === "3") return "orange"
  else return "green"
}

const colHelper = createColumnHelper()
const columns = [
  colHelper.accessor("productId", {
    header: (header) => getTableHeader(header, "ProductID"),
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),
  colHelper.accessor("productName", {
    header: (header) => getTableHeader(header, "ProductName"),
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
  colHelper.accessor("userName", {
    header: (header) => getTableHeader(header, "UserName"),
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
  colHelper.accessor("rating", {
    header: (header) => getTableHeader(header, "Rating"),
    cell: (props) => (
      <p
        className={`${
          getRatingColor(props.getValue()) === "green"
            ? "bg-green-500"
            : getRatingColor(props.getValue()) === "orange"
              ? "bg-orange-500"
              : "bg-red-500"
        }  mr-4 w-10 rounded-md px-2 text-center text-[0.70rem] font-semibold  text-white`}
      >
        <span> {props.getValue()}★</span>
      </p>
    ),
  }),
  colHelper.accessor("comment", {
    header: (header) => getTableHeader(header, "Comment"),
    cell: (props) => (
      <Tooltip
        label={props.getValue()}
        arrowOffset={12}
        arrowSize={6}
        withArrow
        className="max-h-32 max-w-80 text-wrap bg-gray-600  text-xs text-white"
      >
        <p className="mr-2 w-28 truncate">{props.getValue()}</p>
      </Tooltip>
    ),
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
        <p className="mr-2 w-full truncate">
          {moment(props.getValue()).format("YYYY-MM-DD HH:mm:ss")}
        </p>
      </Tooltip>
    ),
  }),
  colHelper.accessor("action", {
    header: () => null,
    cell: () => (
      <p className="flex items-center  justify-start gap-x-3 px-0 text-gray-500">
        <EditReviewModal />
        <DeletePopover size={18} deleteItemName="review" />
      </p>
    ),
  }),
]

const ReviewTable = ({ globalFilter, setGlobalFilter, columnFilters }) => {
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

export default ReviewTable
