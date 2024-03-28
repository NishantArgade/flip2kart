import { ResponsivePie } from "@nivo/pie"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { getSalesBreakdownData } from "../../api/salesApi"
import Spinner from "../../components/Spinner"

const SalesBreakdown = () => {
  const [isSmallDevice, setIsSmallDevice] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ["getSalesBreakdownData"],
    queryFn: getSalesBreakdownData,
  })

  const result = useMemo(() => {
    let config = []
    if (!isLoading && data?.result.length > 0) {
      config = data?.result.map((item) => ({
        id: item.category,
        label: item.category,
        value: item.totalSales,
        color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
      }))
    }
    return config
  }, [data, isLoading])

  useEffect(() => {
    const handleResize = () => setIsSmallDevice(window.innerWidth < 1000)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      <div className="flex  flex-row flex-wrap  items-center  justify-between gap-y-4  bg-gray-50 px-3 py-2  text-sm font-medium text-gray-600 ">
        <div>
          <p className="text-lg uppercase text-gray-500">Sales Breakdown</p>
          <p className="text-xs text-gray-400">Chart of sales breakdown</p>
        </div>
        {result.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Total Sales: </span>
            <span className="font-medium">
              ₹{data?.overallTotalSales.toLocaleString("en-In")}
            </span>
          </div>
        )}
      </div>
      <div className="bg-green-20 thin-scrollbar felx container mx-auto h-[30rem] w-full items-center justify-center overflow-auto bg-gray-50 p-4 shadow-md lg:p-1">
        {!isLoading ? (
          result.length > 0 ? (
            <ResponsivePie
              data={result}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              cornerRadius={1}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{
                from: "color",
                modifiers: [["darker", 0.2]],
              }}
              theme={{
                labels: {
                  text: {
                    fillOpacity: 1,
                    fontWeight: 700,
                    fontSize: isSmallDevice ? "10px" : "14px",
                  },
                },
                legends: {
                  text: {
                    fillOpacity: 1,
                    fontWeight: 700,
                    fontSize: isSmallDevice ? "10px" : "14px",
                  },
                },
              }}
              tooltip={({ datum }) => {
                return (
                  <div className="flex  w-fit items-center justify-center gap-2 rounded-sm border-[0.8px] border-gray-300  bg-white px-2 py-1 text-[0.70rem]  shadow-sm">
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: datum.color,
                      }}
                    ></div>
                    <span className="text-[#4e4e4e]">
                      <span className="font-normal">{datum.data.label}: </span>
                      <span className="font-bold">
                        ₹{datum.data.value.toLocaleString("en-In")}
                      </span>
                    </span>
                  </div>
                )
              }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#333333"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 2]],
              }}
              arcLabelsRadiusOffset={0.6}
              legends={
                isSmallDevice
                  ? undefined
                  : [
                      {
                        anchor: "top-right",
                        direction: "column",
                        justify: false,
                        translateX: 43,
                        translateY: -20,
                        itemsSpacing: 26,
                        // itemDirection: "top-to-bottom",
                        itemWidth: 105,
                        itemHeight: 5,
                        itemTextColor: "#999",
                        itemDirection: "right-to-left",
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: "circle",
                        effects: [
                          {
                            on: "hover",
                            style: {
                              itemTextColor: "#000",
                            },
                          },
                        ],
                      },
                    ]
              }
            />
          ) : (
            <div className="flex h-[28rem] w-full items-center justify-center bg-white font-medium tracking-wider text-gray-300">
              No Data Available
            </div>
          )
        ) : (
          <div className="flex h-[26rem] items-center justify-center bg-white">
            <Spinner />
          </div>
        )}
      </div>
    </>
  )
}

export default SalesBreakdown
