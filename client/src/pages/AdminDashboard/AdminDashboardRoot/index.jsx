import LatestTransactionTable from "./LatestTransactionTable.jsx"
import RevenueChart from "./RevenueChart.jsx"
import SalesPieChart from "./SalesPieChart.jsx"
import SectionOverviewCards from "./SectionOverviewCards.jsx"

const AdminDashboardRoot = () => {
  return (
    <div className=" flex flex-col gap-y-4 py-4 md:p-4">
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
