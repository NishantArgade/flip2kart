import { useState } from "react"
import TableSearchBar from "../TableSearchBar"
import UserTable from "./UserTable"

const Users = () => {
  const [globalFilter, setGlobalFilter] = useState("")

  return (
    <div className="w-full p-4">
      {/** Header */}
      <section className="mb-6 flex justify-between gap-x-2">
        <TableSearchBar
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </section>

      {/** Table */}
      <UserTable
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  )
}

export default Users
