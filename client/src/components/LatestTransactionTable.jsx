import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { FaSortUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa6";
import { TbArrowsSort } from "react-icons/tb";

const data = [
  {
    id: "adfasdfsdasdassdfdfdfsdffasfasdfsdfsafsd",
    firstName: "Niasdfasdfst",
    lastName: "Argadfddffdf",
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
];

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    id: "full name",
    header: (header) => (
      <div className="py-2 flex items-center gap-2">
        <div className="flex items-center">
          <p className="text-xs  mr-2 text-gray-500 font-semibold  border-gray-300 text-left">
            Full Name
          </p>
          <div
            onClick={() => {
              header.column.toggleSorting();
            }}
          >
            <TbArrowsSort className="text-gray-600 cursor-pointer" size={15} />
          </div>
        </div>

        <div>
          {
            {
              asc: (
                <img
                  src="/caret-square-up.svg "
                  className="opacity-40"
                  alt=""
                  width={15}
                />
              ),
              desc: (
                <img
                  src="/caret-square-down.svg "
                  className="opacity-40"
                  alt=""
                  width={15}
                />
              ),
            }[header.column.getIsSorted()]
          }
        </div>
      </div>
    ),

    cell: (props) => (
      <p className="text-[0.7rem] py-2 mr-2">{props.getValue()}</p>
    ),
    minSize: 200,
  }),
  columnHelper.accessor("id", {
    header: (header) => (
      <div className="py-2 flex items-center gap-2">
        <div className="flex items-center">
          <p className="text-xs  mr-2 text-gray-500 font-semibold  border-gray-300 text-left">
            ID{" "}
          </p>
          <div
            onClick={() => {
              header.column.toggleSorting();
            }}
          >
            <TbArrowsSort className="text-gray-600 cursor-pointer" size={15} />
          </div>
        </div>

        <div>
          {
            {
              asc: (
                <img
                  src="/caret-square-up.svg "
                  className="opacity-40"
                  alt=""
                  width={15}
                />
              ),
              desc: (
                <img
                  src="/caret-square-down.svg "
                  className="opacity-40"
                  alt=""
                  width={15}
                />
              ),
            }[header.column.getIsSorted()]
          }
        </div>
      </div>
    ),
    cell: (props) => (
      <p className="text-[0.7rem] py-2 mr-2">{props.getValue()}</p>
    ),
  }),

  columnHelper.accessor("createAt", {
    header: (header) => (
      <div className="py-2 flex items-center gap-2">
        <div className="flex items-center">
          <p className="text-xs  mr-2 text-gray-500 font-semibold  border-gray-300 text-left">
            Created At
          </p>
          <div
            onClick={() => {
              header.column.toggleSorting();
            }}
          >
            <TbArrowsSort className="text-gray-600 cursor-pointer" size={15} />
          </div>
        </div>

        <div>
          {
            {
              asc: (
                <img
                  src="/caret-square-up.svg "
                  className="opacity-40"
                  alt=""
                  width={15}
                />
              ),
              desc: (
                <img
                  src="/caret-square-down.svg "
                  className="opacity-40"
                  alt=""
                  width={15}
                />
              ),
            }[header.column.getIsSorted()]
          }
        </div>
      </div>
    ),
    cell: (props) => (
      <p className="text-[0.7rem] py-2 mr-2">{props.getValue()}</p>
    ),
    minSize: 180,
  }),

  columnHelper.accessor("quantity", {
    header: (header) => (
      <div className="py-2 flex items-center gap-2">
        <div className="flex items-center">
          <p className="text-xs  mr-2 text-gray-500 font-semibold  border-gray-300 text-left">
            Qty
          </p>
          <div
            onClick={() => {
              header.column.toggleSorting();
            }}
          >
            <TbArrowsSort className="text-gray-600 cursor-pointer" size={15} />
          </div>
        </div>

        <div>
          {
            {
              asc: (
                <img
                  src="/caret-square-up.svg "
                  className="opacity-40"
                  alt=""
                  width={15}
                />
              ),
              desc: (
                <img
                  src="/caret-square-down.svg "
                  className="opacity-40"
                  alt=""
                  width={15}
                />
              ),
            }[header.column.getIsSorted()]
          }
        </div>
      </div>
    ),
    cell: (props) => (
      <p className="text-[0.7rem] py-2 mr-2">{props.getValue()}</p>
    ),
    size: 120,
  }),
  columnHelper.accessor("cost", {
    header: (header) => (
      <div className="py-2 flex items-center gap-2">
        <div className="flex items-center">
          <p className="text-xs  mr-2 text-gray-500 font-semibold  border-gray-300 text-left">
            Cost
          </p>
          <div
            onClick={() => {
              header.column.toggleSorting();
            }}
          >
            <TbArrowsSort className="text-gray-600 cursor-pointer" size={15} />
          </div>
        </div>

        <div>
          {
            {
              asc: (
                <img
                  src="/caret-square-up.svg "
                  className="opacity-40"
                  alt=""
                  width={15}
                />
              ),
              desc: (
                <img
                  src="/caret-square-down.svg "
                  className="opacity-40"
                  alt=""
                  width={15}
                />
              ),
            }[header.column.getIsSorted()]
          }
        </div>
      </div>
    ),
    cell: (props) => <p className="text-[0.7rem] py-2">{props.getValue()}</p>,
    size: 120,
  }),
];

const LatestTransactionTable = () => {
  const [sorting, setSorting] = useState([]);

  const reactTable = useReactTable({
    columns,
    data,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <div className="overflow-auto  w-full thin-scrollbar">
      <table width={reactTable.getTotalSize()}>
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
                      {/* <div className="flex justify-start gap-x-2"> */}
                      {/* <div> */}
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {/* </div> */}
                      {/* <span className="inline-flex flex-col gap-y-[4px] w-3">
                        <div className=" overflow-hidden inline-block ">
                          <div
                            onClick={() => {
                              header.column.toggleSorting(false, false);
                            }}
                            className="h-[0.5rem] w-[0.5rem] bg-orange-300 rotate-45 transform origin-bottom-left"
                          ></div>
                        </div>
                        <div className="w-10 overflow-hidden inline-block">
                          <div
                            onClick={() => {
                              header.column.toggleSorting(true, false);
                            }}
                            className=" h-[0.5rem] w-[0.5rem] bg-orange-300 -rotate-45 transform origin-top-left"
                          ></div>
                        </div>
                      </span> */}
                      {/* </div> */}
                    </th>
                  );
                })}
              </tr>
            );
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
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LatestTransactionTable;
