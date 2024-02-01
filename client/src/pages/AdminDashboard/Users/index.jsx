import { useState } from "react";
import TableSearchBar from "../TableSearchBar";
import UserTable from "./UserTable";

const Users = () => {
  const [globalFilter, setGlobalFilter] = useState("");

  return (
    <div className=" w-full p-4 ">
      <div className="flex justify-between gap-x-2 mb-6">
        <TableSearchBar
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <UserTable
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
};

export default Users;
