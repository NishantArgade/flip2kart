import { Tooltip } from "@mantine/core";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import moment from "moment";
import { useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import {
  MdKeyboardDoubleArrowLeft,
  MdOutlineNavigateNext,
} from "react-icons/md";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { TbArrowsSort } from "react-icons/tb";
import { getTableHeader } from "../../../Utils/common.jsx";
import DeletePopover from "../../../components/DeletePopover.jsx";
import EditReviewModal from "../../../components/modals/EditReviewModal.jsx";

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
];

const getRatingColor = (rating) => {
  if (rating === "1") return "red";
  else if (rating === "2" || rating === "3") return "orange";
  else return "green";
};

const colHelper = createColumnHelper();
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
        className="bg-gray-600 text-white max-w-80 max-h-32  text-xs text-wrap"
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
        className="bg-gray-600 text-white max-w-80 max-h-32  text-xs text-wrap"
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
        }  text-white font-semibold rounded-md text-[0.70rem] mr-4 px-2 w-10  text-center`}
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
        className="bg-gray-600 text-white max-w-80 max-h-32  text-xs text-wrap"
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
        className="bg-gray-600 text-white max-w-80 max-h-32  text-xs text-wrap"
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
      <p className="flex px-0  justify-start items-center gap-x-3 text-gray-500">
        <EditReviewModal />
        <DeletePopover size={18} deleteItemName="review" />
      </p>
    ),
  }),
];

const ReviewTable = ({ globalFilter, setGlobalFilter, columnFilters }) => {
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 11 });

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
  });

  return (
    <div>
      <div className="overflow-auto thin-scrollbar h-[28rem] w-full flex flex-col justify-between">
        <table
          width={table.getTotalSize()}
          className="bg-red-00 text-sm w-full "
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
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="text-xs  border-b-2">
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
      <div className="flex justify-end items-center w-full  gap-2 mt-2">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <MdKeyboardDoubleArrowLeft />
        </button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          <GrFormPrevious />
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          <MdOutlineNavigateNext />
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <RiArrowRightDoubleLine />
        </button>
        <p className="font-medium text-sm ml-3">
          {table.getState().pagination.pageIndex + 1}
        </p>
        <p className="font-base text-gray-600 text-sm">of</p>
        <p className="font-medium text-sm">{table.getPageCount()}</p>
      </div>
    </div>
  );
};

export default ReviewTable;
