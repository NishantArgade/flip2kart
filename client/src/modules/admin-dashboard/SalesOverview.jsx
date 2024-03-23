import { ResponsiveLine } from "@nivo/line"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getMonthlySalesData } from "../../api/salesApi"
import Spinner from "../../components/Spinner"

const salesData = [
  {
    id: "sale",
    color: "hsl(236, 70%, 50%)",
    data: [],
  },
]
const unitData = [
  {
    id: "unit",
    color: "hsl(36, 70%, 50%)",
    data: [],
  },
]

const SalesOverview = () => {
  const [isSmallDevice, setIsSmallDevice] = useState(false)
  const [view, setView] = useState("sales")

  const { data, isLoading } = useQuery({
    queryKey: ["getMonthlySalesData"],
    queryFn: getMonthlySalesData,
  })

  useEffect(() => {
    if (!isLoading && data?.result.length > 0) {
      salesData[0].data = data?.result?.map((item) => ({
        x: item?.month,
        y: item?.totalPrice,
      }))
      unitData[0].data = data?.result?.map((item) => ({
        x: item?.month,
        y: item?.totalQty,
      }))
    }
  }, [data, isLoading])

  useEffect(() => {
    const handleResize = () => setIsSmallDevice(window.innerWidth < 1000)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      <div className="flex flex-row  items-center justify-between bg-gray-50 px-3 py-2 text-sm font-medium text-gray-600 ">
        <div>
          <p className="text-lg uppercase text-gray-500">Sales Overview</p>
          <p className="text-xs text-gray-400">Chart for sales overview</p>
        </div>
        {!data?.isEmpty && (
          <div className="">
            <label htmlFor="select" className="mr-2">
              View :
            </label>
            <select
              onChange={(value) => setView(value.target.value)}
              name=""
              id="select"
              className="cursor-pointer border-2 p-1 outline-blue-400"
            >
              <option value="sales">Sales</option>
              <option value="unit">Units</option>
            </select>
          </div>
        )}
      </div>
      {!isLoading ? (
        !data?.isEmpty ? (
          <div className="bg-green-20 thin-scrollbar felx container mx-auto h-[30rem] w-full items-center justify-center overflow-auto bg-gray-50 shadow-md">
            <ResponsiveLine
              data={view === "sales" ? salesData : unitData}
              margin={{ top: 60, right: 50, bottom: 80, left: 74 }}
              xScale={{ type: "point" }}
              xFormat=" >-"
              curve="catmullRom"
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
              }}
              theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: "rgba(0,0,0,0.4)",
                    },
                  },
                },
              }}
              tooltip={({ point }) => {
                return (
                  <div className="flex  w-fit items-center justify-center gap-2 rounded-sm border-[0.8px] border-gray-300  bg-white px-2 py-1 text-[0.70rem]  shadow-sm">
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: point.borderColor,
                      }}
                    ></div>
                    <span className="text-[#4e4e4e]">
                      <span className="mr-1 font-normal">
                        x: <span className="font-bold">{point.data.x},</span>
                      </span>
                      <span className="font-normal">
                        y:{" "}
                        <span className="font-bold">
                          {view === "sales"
                            ? `₹${point.data.y.toLocaleString("en-IN")}`
                            : point.data.y}
                        </span>
                      </span>
                    </span>
                  </div>
                )
              }}
              yFormat=" >-.2f"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                format: (v) => {
                  if (isSmallDevice) return v.slice(0, 3)
                  return v
                },
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Months",
                legendOffset: 50,
                legendPosition: "middle",
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend:
                  view === "sales"
                    ? `Total Revenue for Year`
                    : `Total Units for Year`,
                legendOffset: -50,
                legendPosition: "middle",
              }}
              enableGridX={false}
              enableGridY={false}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: "top-right",
                  direction: "column",
                  justify: false,
                  translateX: 50,
                  translateY: -60,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
          </div>
        ) : (
          <div className="flex h-[28rem] w-full items-center justify-center font-medium tracking-wider text-gray-300">
            No Data Available
          </div>
        )
      ) : (
        <div className="flex h-[30rem] items-center justify-center bg-white">
          <Spinner />
        </div>
      )}
    </>
  )
}

export default SalesOverview
