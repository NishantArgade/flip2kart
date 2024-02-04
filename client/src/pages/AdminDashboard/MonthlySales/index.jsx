import { ResponsiveLine } from "@nivo/line"
import moment from "moment"
import React, { useEffect, useMemo, useState } from "react"
import DatePicker from "react-datepicker"
import { IoCalendarOutline } from "react-icons/io5"

const dailySalesData = [
  {
    id: "232424dsfdsffdsfgjdgfsd",
    date: new Date("2023/12/03"),
    sales: 200,
    units: 500,
  },
  {
    id: "232424dsfdsffdsfgjdgfsd",
    date: new Date("2023/12/04"),
    sales: 300,
    units: 600,
  },
  {
    id: "232424dsfdsffdsfgjdgfsd",
    date: new Date("2023/12/05"),
    sales: 400,
    units: 700,
  },
  {
    id: "232424dsfdsffdsfgjdgfsd",
    date: new Date("2023/12/06"),
    sales: 300,
    units: 800,
  },
  {
    id: "232424dsfdsffdsfgjdgfsd",
    date: new Date("2023/12/07"),
    sales: 500,
    units: 400,
  },
  {
    id: "232424dsfdsffdsfgjdgfsd",
    date: new Date("2023/12/08"),
    sales: 600,
    units: 800,
  },
  {
    id: "232424dsfdsffdsfgjdgfsd",
    date: new Date("2023/12/09"),
    sales: 800,
    units: 800,
  },
  {
    id: "232424dsfdsffdsfgjdgfsd",
    date: new Date("2023/12/10"),
    sales: 900,
    units: 1000,
  },
  {
    id: "232424dsfdsffdsfgjdgfsd",
    date: new Date("2023/12/11"),
    sales: 400,
    units: 900,
  },
  {
    id: "232424dsfdsffdsfgjdgfsd",
    date: new Date("2023/12/12"),
    sales: 500,
    units: 600,
  },
  {
    id: "232424dsfdsffdsfgjdgfsd",
    date: new Date("2023/12/13"),
    sales: 500,
    units: 900,
  },
  {
    id: "232424dsfdsffdsfgjdgfsd",
    date: new Date("2023/12/14"),
    sales: 400,
    units: 800,
  },
  {
    id: "232424dsfdsffdsfgjdgfsd",
    date: new Date("2023/12/15"),
    sales: 400,
    units: 700,
  },
  {
    id: "232424dsfdsffdsfgjdgfsd",
    date: new Date("2023/12/16"),
    sales: 400,
    units: 1200,
  },
  {
    id: "232424dsfdsffdsfgjdgfsd",
    date: new Date("2023/12/17"),
    sales: 1100,
    units: 300,
  },
  {
    id: "232424dsfdsffdsfgjdgfsd",
    date: new Date("2023/12/18"),
    sales: 1000,
    units: 1200,
  },
]

const data = [
  {
    id: "sales",
    color: "hsl(236, 70%, 50%)",
    data: [
      {
        x: "12-01",
        y: 30,
      },
      {
        x: "12-02",
        y: 40,
      },
      {
        x: "12-03",
        y: 60,
      },
      {
        x: "12-04",
        y: 80,
      },
      {
        x: "12-05",
        y: 100,
      },
    ],
  },
  {
    id: "units",
    color: "hsl(96, 80%,60%)",
    data: [
      {
        x: "12-01",
        y: 70,
      },
      {
        x: "12-02",
        y: 90,
      },
      {
        x: "12-03",
        y: 100,
      },
      {
        x: "12-04",
        y: 120,
      },
      {
        x: "12-05",
        y: 150,
      },
    ],
  },
]

const MonthlySales = () => {
  const [isSmallDevice, setIsSmallDevice] = useState(false)
  const [startDate, setStartDate] = useState(new Date("2023/12/10"))
  const [endDate, setEndDate] = useState(new Date("2023/12/30"))
  const [isDataAvailable, setIsDataAvailable] = useState(true)

  const salesData = {
    id: "sales",
    color: "hsl(236, 70%, 50%)",
  }
  const unitData = {
    id: "units",
    color: "hsl(26, 70%, 50%)",
  }

  const result = useMemo(() => {
    let salesFilteredData = []
    let unitFilteredData = []
    setIsDataAvailable(false)

    dailySalesData.map((item) => {
      if (item.date >= startDate && item.date <= endDate) {
        salesFilteredData.push({
          x: moment(item.date).format("MM-DD"),
          y: item.sales,
        })
        unitFilteredData.push({
          x: moment(item.date).format("MM-DD"),
          y: item.units,
        })
        setIsDataAvailable(true)
      }
    })
    const finalData = [
      { ...salesData, data: salesFilteredData },
      { ...unitData, data: unitFilteredData },
    ]

    return finalData
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate])

  // Monitoring screen size changes
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

  console.log(result)
  return (
    <>
      <div className="mx-2 flex flex-row items-center  justify-between bg-gray-50  p-2 text-sm font-medium text-gray-600 ">
        <div>
          <p className="text-lg uppercase text-gray-500">Monthly Sales</p>
          <p className="text-xs text-gray-400">Chart of monthly sales</p>
        </div>
        {/* <div className="flex gap-4">
          <div>
            <p className="text-xs  ml-1">Start Date</p>
            <DatePicker
              showIcon
              icon={<IoCalendarOutline className="w-auto" />}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="outline-blue-400 border-2 w-28 ml-1 cursor-pointer"
              placeholderText="Start Date"
            />
          </div>
          <div>
            <p className="text-xs  ml-1">End Date</p>
            <DatePicker
              showIcon
              icon={<IoCalendarOutline className="w-auto" />}
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="outline-blue-400 border-2 w-28 ml-1 cursor-pointer"
              placeholderText="End Date"
            />
          </div>
        </div> */}
      </div>
      <div className="bg-green-20 thin-scrollbar felx container mx-auto h-[30rem] w-full items-center justify-center overflow-auto bg-gray-50 shadow-md">
        {isDataAvailable ? (
          <ResponsiveLine
            data={result}
            margin={{ top: 60, right: 50, bottom: 90, left: 74 }}
            xScale={{ type: "point" }}
            xFormat=" >-"
            // curve="catmullRom"
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
                <div className="w-fit rounded-sm border-2 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                  <span className="font-normal">x: </span> {point.data.x},
                  <span className="font-normal"> y: </span>
                  {point.data.y}
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
