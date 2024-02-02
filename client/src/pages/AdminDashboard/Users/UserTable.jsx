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
import { getTableHeader } from "../../../Utils/common";
import DeletePopover from "../../../components/DeletePopover";
import EditUserModal from "../../../components/modals/EditUserModal";

const data = [
  {
    id: "65a63a404e9ce490acd0c3a6",
    fristName: "Nishant",
    lastName: "Argade",
    email: "nishantargade4579@gmail.com",
    phone: 8007896396,
    gender: "male",
    address: "pune, maharashtra, india",
    createdAt: new Date("2023/01/10"),
    role: "user",
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    fristName: "Nishant",
    lastName: "Argade",
    email: "nishantargade4579@gmail.com",
    phone: 8007896396,
    gender: "male",
    address: "pune, maharashtra, india",
    createdAt: new Date("2023/01/10"),
    role: "user",
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    fristName: "Nishant",
    lastName: "Argade",
    email: "nishantargade4579@gmail.com",
    phone: 8007896396,
    gender: "male",
    address: "pune, maharashtra, india",
    createdAt: new Date("2023/01/10"),
    role: "admin",
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    fristName: "Nishant",
    lastName: "Argade",
    email: "nishantargade4579@gmail.com",
    phone: 8007896396,
    gender: "male",
    address: "pune, maharashtra, india",
    createdAt: new Date("2023/01/10"),
    role: "operator",
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    fristName: "Nishant",
    lastName: "Argade",
    email: "nishantargade4579@gmail.com",
    phone: 8007896396,
    gender: "male",
    address: "pune, maharashtra, india",
    createdAt: new Date("2023/01/10"),
    role: "user",
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    fristName: "Nishant",
    lastName: "Argade",
    email: "nishantargade4579@gmail.com",
    phone: 8007896396,
    gender: "male",
    address: "pune, maharashtra, india",
    createdAt: new Date("2023/01/10"),
    role: "user",
  },
];

const colHelper = createColumnHelper();
const columns = [
  colHelper.accessor("id", {
    header: (header) => getTableHeader(header, "UserID"),
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor((row) => `${row.fristName} ${row.lastName}`, {
    id: "fullName",
    header: (header) => getTableHeader(header, "Name"),
    cell: (props) => (
      <Tooltip
        label={props.getValue()}
        arrowOffset={12}
        arrowSize={6}
        withArrow
        className="bg-gray-600 text-white max-w-80 max-h-32  text-xs text-wrap"
      >
        <p className="mr-2 w-14 truncate">{props.getValue()}</p>
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

  colHelper.accessor("address", {
    header: (header) => getTableHeader(header, "Address"),
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

  colHelper.accessor("createdAt", {
    header: (header) => getTableHeader(header, "CreatedAt"),
    cell: (props) => (
      <p className="mr-2">{moment(props.getValue()).format("YYYY-MM-DD")}</p>
    ),
    // size: 500,
  }),

  colHelper.accessor("role", {
    header: (header) => getTableHeader(header, "Role"),
    cell: (props) => (
      <p
        className={`${
          props.getValue() === "user" ? "text-green-500" : "text-orange-600"
        }  mr-2`}
      >
        {props.getValue()?.toLocaleString()}
      </p>
    ),
  }),

  colHelper.accessor("action", {
    header: () => null,
    cell: () => (
      <p className="flex px-0  justify-start items-center gap-x-3 text-gray-500">
        <EditUserModal />
        <DeletePopover size={18} deleteItemName="user" />
      </p>
    ),
  }),
];

const UserTable = ({ globalFilter, setGlobalFilter }) => {
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 11 });

  const table = useReactTable({
    data,
    columns,
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

    debugTable: true,
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

export default UserTable;
