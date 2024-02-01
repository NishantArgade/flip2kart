import React from "react";
import { FaUsers } from "react-icons/fa";

const SectionOverviewCards = () => {
  const sectionsInfo = [
    {
      title: "Total Customer",
      icon: <FaUsers size={24} className="text-gray-500" />,
      count: 18000,
      profitPercentage: "+5%",
    },
    {
      title: "Total Products",
      icon: <FaUsers size={24} className="text-gray-500" />,
      count: 1500,
      profitPercentage: "+5%",
    },
    {
      title: "Total Orders",
      icon: <FaUsers size={24} className="text-gray-500" />,
      count: 4000,
      profitPercentage: "+5%",
    },
    {
      title: "Sales Today",
      icon: <FaUsers size={24} className="text-gray-500" />,
      count: 630,
      profitPercentage: "+5%",
    },
  ];

  return (
    <div className="bg-slate-white col-span-1 h-full  lg:col-span-5  grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
      {sectionsInfo.map((section, index) => (
        <div
          key={index}
          className="rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-3 bg-gray-50"
        >
          <div className="flex flex-col justify-between gap-y-2 h-full ">
            <div className="flex justify-between items-center ">
              <p>{section.title}</p>
              <div>
                <FaUsers size={24} className="text-gray-500" />
              </div>
            </div>
            <p className="text-xl font-semibold">{section.count}</p>
            <div className="flex justify-between items-center gap-x-2">
              <p>{section.profitPercentage}</p>
              <p className="text-xs">since last month</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionOverviewCards;
