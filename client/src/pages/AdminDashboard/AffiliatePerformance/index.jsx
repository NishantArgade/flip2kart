import { useState } from "react"
import ClientFacingHeader from "../ClientFacingHeader"
import TableSearchBar from "../TableSearchBar"
import PerformanceTable from "./PerformanceTable"

const AffiliatePerformance = () => {
  const [globalFilter, setGlobalFilter] = useState("")

  return (
    <>
      <ClientFacingHeader
        heading={"Affiliate Performance"}
        subHeading={"Track your affiliate sales performance here"}
      />

      <div className=" w-full p-4 ">
        {/** Header */}
        <section className="mb-6 flex justify-start">
          <TableSearchBar
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            placeholder={"Search by name, amount, etc..."}
          />
        </section>

        {/** Table */}
        <PerformanceTable
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
    </>
  )
}

export default AffiliatePerformance
