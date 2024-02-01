import { useState } from "react";
import TableSearchBar from "../TableSearchBar";
import TransactionTable from "./TransactionTable";

const Transactions = () => {
  const [globalFilter, setGlobalFilter] = useState("");

  return (
    <div className=" w-full p-4 ">
      <div className="flex justify-between gap-x-2 mb-6">
        <TableSearchBar
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <TransactionTable
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
};

export default Transactions;
