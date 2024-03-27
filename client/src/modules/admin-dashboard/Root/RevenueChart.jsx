import { ResponsiveLine } from "@nivo/line"
import { getMonthlySalesData } from "../../../api/salesApi"
import { useQuery } from "@tanstack/react-query"
import Skeleton from "react-loading-skeleton"

const RevenueChart = ({ data, isLoading }) => {
  let isDashboard = true

  const result = [
    {
      id: "Revenue",
      color: "hsl(161, 70%, 50%)",
      data: [],
    },
  ]
  result[0].data = data?.result?.map((item) => ({
    x: item?.month,
    y: item?.totalPrice,
  }))

  return (
    <div className="col-span-1 h-[15rem] rounded-md bg-gray-50 p-3 text-sm text-gray-700 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] lg:col-span-7">
      <div className="pb-2 text-sm font-semibold tracking-wide text-slate-500">
        Revenue
      </div>
      {!isLoading ? (
        <ResponsiveLine
          colors={"#93e0deec"}
          data={result}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: "#4e4e4e",
                },
              },
              legend: {
                text: {
                  fill: "#4e4e4e",
                },
              },
              ticks: {
                line: {
                  stroke: "#4e4e4e",
                  strokeWidth: 1,
                },
                text: {
                  fill: "#4e4e4e",
                },
              },
            },
            legends: {
              text: {
                fill: "red",
              },
            },
            tooltip: {
              container: {
                color: "#4e4e4e",
                fontSize: "0.70rem",
              },
            },
          }}
          margin={{ top: 15, right: 10, bottom: 72, left: 70 }}
          yFormat=" >-.2f"
          curve="catmullRom"
          enableArea={isDashboard}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: (v) => {
              if (isDashboard) return v.slice(0, 3)
              return v
            },
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Month",
            legendOffset: 30,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Revenue",
            legendOffset: -60,
            tickValues: 5,
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
                      {`₹${point.data.y.toLocaleString("en-IN")}`}
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
              translateX: 20,
              translateY: -20,
              padding: 1,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 10,
              symbolShape: "circle",
              itemTextColor: "#4e4e4e",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .02)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      ) : (
        <div className="h-full w-full pb-8">
          <Skeleton width="100%" height="100%" />
        </div>
      )}
    </div>
  )
}

export default RevenueChart
