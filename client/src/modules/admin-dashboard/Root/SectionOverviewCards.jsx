import { FaUsers } from "react-icons/fa"
import Skeleton from "react-loading-skeleton"
import { FaBox, FaShoppingCart } from "react-icons/fa"
import { HiCurrencyRupee } from "react-icons/hi2"

const SectionOverviewCards = ({ data, isLoading }) => {
  const sectionsInfo = [
    {
      title: "Total Customer",
      icon: <FaUsers size={24} className="text-gray-500" />,
      count: data?.userData?.totalUsersCount,
    },
    {
      title: "Total Products",
      icon: <FaBox size={19} className="text-gray-500" />,
      count: data?.productData?.totalProductsCount,
    },
    {
      title: "Total Orders",
      icon: <FaShoppingCart size={21} className="text-gray-500" />,
      count: data?.ordersData?.orders.reduce(
        (acc, curr) => curr.count + acc,
        0
      ),
    },
    {
      title: "Total Revenue",
      icon: <HiCurrencyRupee size={24} className="text-gray-500" />,
      count: data?.ordersData?.totalAmount
        ? "₹" + data?.ordersData?.totalAmount?.toLocaleString("en-In")
        : "₹" + 0,
    },
  ]

  return (
    <div className="bg-slate-white col-span-1 grid  h-full  grid-cols-1 gap-4 text-sm text-gray-700 md:grid-cols-2 lg:col-span-5">
      {!isLoading
        ? sectionsInfo.map((section, index) => (
            <div
              key={index}
              className="rounded-md bg-gray-50 p-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
            >
              <div className=" flex h-full flex-col ">
                <div className="flex items-center justify-between rounded-sm bg-gray-100 px-1 py-2 shadow-sm">
                  <p>{section.title}</p>
                  <div>{section.icon}</div>
                </div>
                <div className="flex h-full items-center justify-center">
                  <p className="text-xl font-semibold">{section.count}</p>
                </div>
              </div>
            </div>
          ))
        : sectionsInfo.map((section, index) => (
            <div
              key={index}
              className="rounded-md bg-gray-50 p-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
            >
              <div className=" flex h-full flex-col ">
                <div className="flex items-center justify-between rounded-sm bg-gray-100 px-1 py-2 shadow-sm">
                  <p>{section.title}</p>
                  <div>{section.icon} </div>
                </div>
                <div className="flex h-full items-center justify-center">
                  <p className="text-xl font-semibold">
                    <Skeleton width={100} height={30} />
                  </p>
                </div>
              </div>
            </div>
          ))}
    </div>
  )
}

export default SectionOverviewCards
