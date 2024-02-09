import { ResponsiveLine } from "@nivo/line"
import moment from "moment"
import { useEffect, useState } from "react"

const allSalesData = [
  {
    id: "232424dsfdsffdsfgjdgfsd",
    date: new Date("2023/08/03"),
    sales: 200,
    units: 100,
  },

  {
    id: "232424dsfdsffdsfgjdgfsd",
    date: new Date("2023/10/04"),
    sales: 300,
    units: 400,
  },
  {
    id: "232424dsfdsffdsfgjdgfsd",
    date: new Date("2023/12/04"),
    sales: 500,
    units: 600,
  },
]

const MonthlySales = () => {
  const [isSmallDevice, setIsSmallDevice] = useState(false)

  const salesData = {
    id: "sales",
    color: "hsl(236, 70%, 50%)",
  }
  const unitData = {
    id: "units",
    color: "hsl(26, 70%, 50%)",
  }

  let salesFilteredData = []
  let unitFilteredData = []

  allSalesData.map((item) => {
    salesFilteredData.push({
      x: moment(item.date).format("MMM"),
      y: item.sales,
    })
    unitFilteredData.push({
      x: moment(item.date).format("MMM"),
      y: item.units,
    })
  })
  const result = [
    { ...salesData, data: salesFilteredData },
    { ...unitData, data: unitFilteredData },
  ]

  // Monitoring screen size changes for adjesting the chart
  useEffect(() => {
    const handleResize = () => setIsSmallDevice(window.innerWidth < 1000)

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <div className="flex flex-row items-center justify-between  bg-gray-50  px-3 py-2 text-sm font-medium text-gray-600 ">
        <div>
          <p className="text-lg uppercase text-gray-500">Monthly Sales</p>
          <p className="text-xs text-gray-400">Chart of monthly sales</p>
        </div>
      </div>
      <div className="bg-green-20 thin-scrollbar felx container mx-auto h-[30rem] w-full items-center justify-center overflow-auto bg-gray-50 shadow-md">
        {allSalesData.length > 0 ? (
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
            axisBottom={{
              format: (v) => {
                if (isSmallDevice) return v.slice(0, 3)
                return v
              },
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Months",
              legendOffset: 60,
              legendPosition: "middle",
            }}
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
                      y: <span className="font-bold">{point.data.y}</span>
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
          <div className="flex h-full w-full items-center justify-center text-2xl font-medium text-gray-300">
            No Data Available
          </div>
        )}
      </div>
    </>
  )
}

export default MonthlySales
