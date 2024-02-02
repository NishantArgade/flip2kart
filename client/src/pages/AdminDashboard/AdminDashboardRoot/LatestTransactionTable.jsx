import { Tooltip } from "@mantine/core";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { getTableHeader } from "../../../Utils/common";

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
];

const columnHelper = createColumnHelper();
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
        className="bg-gray-600 text-white max-w-80 max-h-32  text-xs text-wrap"
      >
        <p className="mr-2  w-16 truncate">{props.getValue()}</p>
      </Tooltip>
    ),
    // minSize: 200,
  }),

  columnHelper.accessor("id", {
    header: (header) => getTableHeader(header, "UserID"),
    cell: (props) => (
      <p className="text-[0.7rem] py-2 mr-2">{props.getValue()}</p>
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
        className="bg-gray-600 text-white max-w-80 max-h-32  text-xs text-wrap"
      >
        <p className="mr-2  w-16 truncate">{props.getValue()}</p>
      </Tooltip>
    ),
    // minSize: 180,
  }),

  columnHelper.accessor("quantity", {
    header: (header) => getTableHeader(header, "Qty"),
    cell: (props) => (
      <p className="text-[0.7rem] py-2 mr-2">{props.getValue()}</p>
    ),
    // size: 120,
  }),
  columnHelper.accessor("cost", {
    header: (header) => getTableHeader(header, "Cost"),
    cell: (props) => <p className="text-[0.7rem] py-2">{props.getValue()}</p>,
    // size: 120,
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
    <div className=" col-span-1  lg:col-span-8  p-3 rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-gray-50">
      <div className="text-sm font-semibold text-slate-500 tracking-wide pb-4">
        Latest Transactions
      </div>
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
    </div>
  );
};

export default LatestTransactionTable;
