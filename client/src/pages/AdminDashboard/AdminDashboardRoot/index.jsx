import LatestTransactionTable from "./LatestTransactionTable.jsx";
import RevenueChart from "./RevenueChart.jsx";
import SalesPieChart from "./SalesPieChart.jsx";
import SectionOverviewCards from "./SectionOverviewCards.jsx";

const AdminDashboardRoot = () => {
  return (
    <div className=" md:p-4 py-4 flex flex-col gap-y-4">
      {/* 1st Grid */}
      <div className=" grid grid-cols-1 lg:grid-cols-12  gap-4">
        {/* Overview Section */}
        <SectionOverviewCards />

        {/* Revenue Section */}
        <RevenueChart />
      </div>

      {/* 2nd Grid */}
      <div className="grid  grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Latest Transactions Section  */}
        <LatestTransactionTable />

        {/* Pie Chart Section */}
        <SalesPieChart />
      </div>
    </div>
  );
};

export default AdminDashboardRoot;
