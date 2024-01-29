import React from "react";
import { FaUsers } from "react-icons/fa";
import LatestTransactionTable from "../../components/LatestTransactionTable.jsx";
import RevenueChart from "../../components/RevenueChart.jsx";
import SalesPieChart from "../../components/SalesPieChart.jsx";

const Dashboard = () => {
  return (
    <div className=" md:p-4 py-4 flex flex-col gap-y-4">
      {/* 1st Grid */}
      <div className=" grid grid-cols-1 lg:grid-cols-12  gap-4">
        {/* LEFT */}
        <div className="bg-slate-white col-span-1 h-full  lg:col-span-5  grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-3 bg-gray-50">
            <div className="flex flex-col justify-between gap-y-2 h-full ">
              <div className="flex justify-between items-center ">
                <p>Total Customer</p>
                <div>
                  <FaUsers size={24} className="text-gray-500" />
                </div>
              </div>
              <p className="text-xl font-semibold">1200</p>
              <div className="flex justify-between items-center gap-x-2">
                <p>+5%</p>
                <p className="text-xs">since last month</p>
              </div>
            </div>
          </div>
          <div className="rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-3 bg-gray-50">
            <div className="flex flex-col justify-between gap-y-2 h-full ">
              <div className="flex justify-between items-center ">
                <p>Total Products</p>
                <div>
                  <FaUsers size={24} className="text-gray-500" />
                </div>
              </div>
              <p className="text-xl font-semibold">100</p>
              <div className="flex justify-between items-center gap-x-2">
                <p>+5%</p>
                <p className="text-xs">since last month</p>
              </div>
            </div>
          </div>
          <div className="rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-3 bg-gray-50">
            <div className="flex flex-col justify-between gap-y-2 h-full ">
              <div className="flex justify-between items-center ">
                <p>Total Orders</p>
                <div>
                  <FaUsers size={24} className="text-gray-500" />
                </div>
              </div>
              <p className="text-xl font-semibold">50</p>
              <div className="flex justify-between items-center gap-x-2">
                <p>+5%</p>
                <p className="text-xs">since last month</p>
              </div>
            </div>
          </div>
          <div className="rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-3 bg-gray-50">
            <div className="flex flex-col justify-between gap-y-2 h-full ">
              <div className="flex justify-between items-center ">
                <p>Sales Today</p>
                <div>
                  <FaUsers size={24} className="text-gray-500" />
                </div>
              </div>
              <p className="text-xl font-semibold">30</p>
              <div className="flex justify-between items-center gap-x-2">
                <p>+5%</p>
                <p className="text-xs">since last month</p>
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className=" col-span-1 lg:col-span-7 h-[15rem] rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-sm text-gray-700 p-3 bg-gray-50">
          <div className="text-sm font-semibold text-slate-500 tracking-wide pb-2">
            Revenue
          </div>
          <RevenueChart />
        </div>
      </div>

      {/* 2st Grid */}
      <div className="grid  grid-cols-1 lg:grid-cols-12 gap-4">
        {/* left */}
        <div className=" col-span-1  lg:col-span-8  p-3 rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-gray-50">
          <div className="text-sm font-semibold text-slate-500 tracking-wide pb-4">
            Latest Transactions
          </div>
          <LatestTransactionTable />
        </div>

        {/* Right */}
        <div className="col-span-1 lg:col-span-4 p-3 rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-gray-50 flex flex-col justify-between gap-y-12">
          <div className="h-[22rem]">
            <p className="text-sm font-semibold text-slate-500 tracking-wide">
              Sales By Category
            </p>
            <SalesPieChart />
          </div>
          <div className="text-xs text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab ipsa
            delectus sapiente tempore pariatur.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
