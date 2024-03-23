import { ResponsiveLine } from "@nivo/line"
import { useQuery } from "@tanstack/react-query"
import { getMonthlySalesData } from "../../api/salesApi"
import { useEffect, useMemo } from "react"
import Spinner from "../../components/Spinner"

const MonthlySales = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getMonthlySalesData"],
    queryFn: getMonthlySalesData,
  })

  const result = useMemo(() => {
    const config = [
      { id: "sale", color: "hsl(40, 92%,41%)", data: [] },
      { id: "unit", color: "hsl(26, 70%, 50%)", data: [] },
    ]

    if (!isLoading && data?.result?.length > 0) {
      data?.result.map((item) => {
        config[0].data.push({
          id: "sale",
          x: item.month,
          y: item.totalPrice,
        })
        config[1].data.push({
          id: "unit",
          x: item.month,
          y: item.totalQty,
        })
      })
    }
    return config
  }, [isLoading, data])

  return (
    <>
      <div className="flex flex-row items-center justify-between  bg-gray-50  px-3 py-2 text-sm font-medium text-gray-600 ">
        <div>
          <p className="text-lg uppercase text-gray-500">Monthly Sales</p>
          <p className="text-xs text-gray-400">Chart of monthly sales</p>
        </div>
      </div>
      {!isLoading ? (
        <div className="bg-green-20 thin-scrollbar felx container mx-auto h-[30rem] w-full items-center justify-center overflow-auto bg-gray-50 shadow-md">
          {!data?.isEmpty > 0 ? (
            <ResponsiveLine
              data={result}
              margin={{ top: 60, right: 50, bottom: 90, left: 74 }}
              xScale={{ type: "point" }}
              xFormat=" >-"
              theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: "rgba(0,0,0,0.4)",
                    },
                  },
                },
              }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
              }}
              yFormat=" >-.2f"
              axisTop={null}
              axisRight={null}
              // axisBottom={{
              //   format: (v) => {
              //     if (isSmallDevice) return v.slice(0, 3)
              //     return v
              //   },
              //   tickSize: 5,
              //   tickPadding: 5,
              //   tickRotation: 90,
              //   legend: "Months",
              //   legendOffset: 60,
              //   legendPosition: "middle",
              // }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Total",
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
                          {point.data.id === "sale"
                            ? `₹${point.data.y.toLocaleString("en-IN")}`
                            : point.data.y}
                        </span>
                      </span>
                    </span>
                  </div>
                )
              }}
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
          ) : (
            <div className="flex h-[28rem] w-full items-center justify-center bg-white font-medium tracking-wider text-gray-300">
              No Data Available
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-[30rem] items-center justify-center bg-white">
          <Spinner />
        </div>
      )}
    </>
  )
}

export default MonthlySales
