import { FaDownload } from "react-icons/fa"
import LatestTransactionTable from "./LatestTransactionTable.jsx"
import RevenueChart from "./RevenueChart.jsx"
import SalesPieChart from "./SalesPieChart.jsx"
import SectionOverviewCards from "./SectionOverviewCards.jsx"

const AdminDashboardRoot = () => {
  return (
    <div className=" flex flex-col gap-y-4 py-4 md:p-4">
      <div className="flex items-center justify-between border-b-[1.8px] pb-3">
        <div>
          <p className="text-lg uppercase text-gray-500">Dashboard</p>
          <p className="text-xs text-gray-400">Welcome to admin dashboard</p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-sm bg-gray-100 px-4 py-2 text-sm text-gray-600 shadow-md hover:text-gray-700">
          <FaDownload />
          <p>Download Report</p>
        </button>
      </div>
      {/* 1st Grid */}
      <section className=" grid grid-cols-1 gap-4  lg:grid-cols-12">
        {/* Overview Section */}
        <SectionOverviewCards />

        {/* Revenue Section */}
        <RevenueChart />
      </section>

      {/* 2nd Grid */}
      <section className="grid  grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Latest Transactions Section  */}
        <LatestTransactionTable />

        {/* Pie Chart Section */}
        <SalesPieChart />
      </section>
    </div>
  )
}

export default AdminDashboardRoot
