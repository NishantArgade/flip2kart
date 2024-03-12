import { ResponsiveLine } from "@nivo/line"
import { ResponsivePie } from "@nivo/pie"
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
    id: "clothing",
    label: "clothing",
    value: 501,
    color: "hsl(221, 70%, 50%)",
  },
  {
    id: "electronics",
    label: "electronics",
    value: 100,
    color: "hsl(21, 70%, 50%)",
  },
  {
    id: "furniture",
    label: "furniture",
    value: 200,
    color: "hsl(111, 70%, 50%)",
  },
  {
    id: "cosmetics",
    label: "cosmetics",
    value: 300,
    color: "hsl(321, 70%, 50%)",
  },
  {
    id: "toys",
    label: "toys",
    value: 400,
    color: "hsl(221, 70%, 50%)",
  },
  {
    id: "accessories",
    label: "accessories",
    value: 500,
    color: "hsl(21, 70%, 50%)",
  },
  {
    id: "home",
    label: "home",
    value: 600,
    color: "hsl(111, 70%, 50%)",
  },
  {
    id: "food",
    label: "food",
    value: 700,
    color: "hsl(321, 70%, 50%)",
  },
  {
    id: "stationary",
    label: "stationary",
    value: 800,
    color: "hsl(221, 70%, 50%)",
  },
  {
    id: "books",
    label: "books",
    value: 900,
    color: "hsl(21, 70%, 50%)",
  },
  {
    id: "beverages",
    label: "beverages",
    value: 1000,
    color: "hsl(111, 70%, 50%)",
  },
  {
    id: "others",
    label: "others",
    value: 1100,
    color: "hsl(321, 70%, 50%)",
  },
]

const SalesBreakdown = () => {
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

  return (
    <>
      <div className="flex  flex-row  items-center justify-between  bg-gray-50 px-3 py-2  text-sm font-medium text-gray-600 ">
        <div>
          <p className="text-lg uppercase text-gray-500">Sales Breakdown</p>
          <p className="text-xs text-gray-400">Chart of sales breakdown</p>
        </div>
        <div>
          <span className="text-gray-500">Total Sales: </span>
          <span className="font-medium">5030</span>
        </div>
      </div>
      <div className="bg-green-20 thin-scrollbar felx container mx-auto h-[30rem] w-full items-center justify-center overflow-auto bg-gray-50 p-4 shadow-md lg:p-1">
        {isDataAvailable ? (
          <ResponsivePie
            data={data}
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
                    <span className="font-bold">{datum.data.value}</span>
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
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: "ruby",
                },
                id: "dots",
              },
              {
                match: {
                  id: "c",
                },
                id: "dots",
              },
              {
                match: {
                  id: "go",
                },
                id: "dots",
              },
              {
                match: {
                  id: "python",
                },
                id: "dots",
              },
              {
                match: {
                  id: "scala",
                },
                id: "lines",
              },
              {
                match: {
                  id: "lisp",
                },
                id: "lines",
              },
              {
                match: {
                  id: "elixir",
                },
                id: "lines",
              },
              {
                match: {
                  id: "javascript",
                },
                id: "lines",
              },
            ]}
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
          <div className="flex h-full w-full items-center justify-center text-2xl font-medium text-gray-300">
            No Data Available
          </div>
        )}
      </div>
    </>
  )
}

export default SalesBreakdown
