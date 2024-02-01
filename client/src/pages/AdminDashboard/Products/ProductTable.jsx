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
import { Link } from "react-router-dom";
import DeletePopover from "../../../components/DeletePopover.jsx";
import EditUser from "../../../components/modals/EditUserModal.jsx";

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
];

const getTableHeader = (header, headerName) => {
  return (
    <div className="flex  pb-4 flex-col items-start gap-x-2 text-xs text-start bg-red-40 flex-wrap font-semibold text-gray-500">
      <div className="flex items-center w-full  gap-x-1 bg-gray-60">
        <p className="text-xs text-start  bg-red-20 font-semibold text-gray-500 py-1">
          {headerName}
        </p>
        <div
          onClick={() => {
            header.column.toggleSorting();
          }}
        >
          <TbArrowsSort className="text-gray-600 cursor-pointer" size={15} />
        </div>
      </div>
      <div className="pl-1">
        {
          {
            asc: (
              <img
                src="/caret-square-up.svg "
                className="opacity-40"
                alt=""
                width={13}
              />
            ),
            desc: (
              <img
                src="/caret-square-down.svg "
                className="opacity-40"
                alt=""
                width={13}
              />
            ),
          }[header.column.getIsSorted()]
        }
      </div>
    </div>
  );
};

const colHelper = createColumnHelper();
const columns = [
  colHelper.accessor("id", {
    header: (header) => getTableHeader(header, "Product ID"),
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
        className="bg-gray-600 text-white max-w-80 max-h-32  text-xs text-wrap"
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
        className="bg-gray-600 text-white max-w-80 max-h-32  text-xs text-wrap"
      >
        <p className="mr-2 w-32 truncate">{props.getValue()}</p>
      </Tooltip>
    ),
  }),

  colHelper.accessor("createdAt", {
    header: (header) => getTableHeader(header, "Created At"),
    cell: (props) => (
      <p className="mr-2">{moment(props.getValue()).format("YYYY-MM-DD")}</p>
    ),
  }),

  colHelper.accessor("updatedAt", {
    header: (header) => getTableHeader(header, "Updated At"),
    cell: (props) => (
      <p className="mr-2">{moment(props.getValue()).format("YYYY-MM-DD")}</p>
    ),
  }),

  colHelper.accessor("action", {
    header: () => null,
    cell: () => (
      <p className="flex px-0  justify-start items-center gap-x-3 text-gray-500">
        <Link to="/edit-product">
          {" "}
          <EditUser />
        </Link>
        <DeletePopover size={18} deleteItemName="product" />
      </p>
    ),
  }),
];

const ProductTable = ({ globalFilter, setGlobalFilter }) => {
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 11 });

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

export default ProductTable;
