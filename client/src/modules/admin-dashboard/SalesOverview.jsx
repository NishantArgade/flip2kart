import { ResponsiveLine } from "@nivo/line"
import { useEffect, useState } from "react"

const salesData = [
  {
    id: "japan",
    color: "hsl(236, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 0,
      },
      {
        x: "helicopter",
        y: 10,
      },
      {
        x: "boat",
        y: 30,
      },
      {
        x: "train",
        y: 23,
      },
      {
        x: "subway",
        y: 40,
      },
      {
        x: "bus",
        y: 50,
      },
      {
        x: "car",
        y: 80,
      },
      {
        x: "moto",
        y: 70,
      },
      {
        x: "bicycle",
        y: 60,
      },
      {
        x: "horse",
        y: 65,
      },
      {
        x: "skateboard",
        y: 90,
      },
      {
        x: "others",
        y: 100,
      },
    ],
  },
]
const unitData = [
  {
    id: "japan",
    color: "hsl(236, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 10,
      },
      {
        x: "helicopter",
        y: 40,
      },
      {
        x: "boat",
        y: 70,
      },
      {
        x: "train",
        y: 93,
      },
      {
        x: "subway",
        y: 10,
      },
      {
        x: "bus",
        y: 20,
      },
      {
        x: "car",
        y: 100,
      },
      {
        x: "moto",
        y: 120,
      },
      {
        x: "bicycle",
        y: 120,
      },
      {
        x: "horse",
        y: 130,
      },
      {
        x: "skateboard",
        y: 90,
      },
      {
        x: "others",
        y: 100,
      },
    ],
  },
]

const SalesOverview = () => {
  const [isSmallDevice, setIsSmallDevice] = useState(false)
  const [view, setView] = useState("sales")

  useEffect(() => {
    const handleResize = () => {
      // Check if the width is below a certain threshold (e.g., 600 pixels)
      setIsSmallDevice(window.innerWidth < 1000)
    }

    // Initial check on mount
    handleResize()

    // Add event listener to track screen size changes
    window.addEventListener("resize", handleResize)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <div className="flex flex-row  items-center justify-between bg-gray-50 px-3 py-2 text-sm font-medium text-gray-600 ">
        <div>
          <p className="text-lg uppercase text-gray-500">Sales Overview</p>
          <p className="text-xs text-gray-400">Chart for sales overview</p>
        </div>
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
      </div>
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
                    y: <span className="font-bold">{point.data.y}</span>
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
    </>
  )
}

export default SalesOverview
