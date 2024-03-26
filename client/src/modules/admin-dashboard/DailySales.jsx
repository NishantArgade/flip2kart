import { ResponsiveLine } from "@nivo/line"
import moment from "moment"
import React, { useEffect, useMemo, useState } from "react"
import DatePicker from "react-datepicker"
import { IoCalendarOutline } from "react-icons/io5"
import { getDailySalesData } from "../../api/salesApi"
import { useQuery } from "@tanstack/react-query"
import Spinner from "../../components/Spinner"

const DailySales = () => {
  const [isSmallDevice, setIsSmallDevice] = useState(false)
  const [endDate, setEndDate] = useState(new Date())
  const [startDate, setStartDate] = useState(
    new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 30)
  )

  const { data, isLoading } = useQuery({
    queryKey: ["getDailySalesData"],
    queryFn: getDailySalesData,
  })

  const result = useMemo(() => {
    let salesFilteredData = []
    let unitFilteredData = []

    data?.result.map((item) => {
      const date = new Date(item.date)

      if (date >= startDate && date <= endDate) {
        salesFilteredData.push({
          id: "sale",
          x: moment(date).format("DD-MM-YY"),
          y: item.totalSales,
        })
        unitFilteredData.push({
          id: "unit",
          x: moment(date).format("DD-MM-YY"),
          y: item.totalQty,
        })
      }
    })
    const finalData = [
      {
        id: "sale",
        color: "hsl(236, 70%, 50%)",
        data: salesFilteredData,
      },
      { id: "unit", color: "hsl(26, 70%, 50%)", data: unitFilteredData },
    ]

    return finalData
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, data])

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
          <p className="text-lg uppercase text-gray-500">Daily Sales</p>
          <p className="text-xs text-gray-400">Chart of daily sales</p>
        </div>
        {!isLoading && (
          <div className="flex gap-4">
            <div>
              <p className="text-xs">Start Date</p>
              <DatePicker
                showIcon
                icon={<IoCalendarOutline className="mt-[1px] w-auto" />}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="ml-[2px] w-28 cursor-pointer border-2 outline-blue-400"
                placeholderText="Start Date"
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <div>
              <p className="ml-1  text-xs">End Date</p>
              <DatePicker
                showIcon
                icon={<IoCalendarOutline className="mt-[1px] w-auto" />}
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="ml-[2px] w-28 cursor-pointer border-2 outline-blue-400"
                placeholderText="End Date"
                dateFormat="yyyy-MM-dd"
                maxDate={new Date()}
                minDate={startDate}
              />
            </div>
          </div>
        )}
      </div>
      {!isLoading ? (
        <div className="bg-green-20 thin-scrollbar felx container mx-auto h-[30rem] w-full items-center justify-center overflow-auto bg-gray-50 shadow-md">
          {result[0].data.length > 0 || result[1].data.length > 0 ? (
            <ResponsiveLine
              data={result}
              margin={{ top: 60, right: 50, bottom: 90, left: 74 }}
              xScale={{ type: "point" }}
              xFormat=" >-"
              curve="catmullRom"
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
                          {point.data.id === "sale"
                            ? `₹${point.data.y.toLocaleString("en-IN")}`
                            : point.data.y}
                        </span>
                      </span>
                    </span>
                  </div>
                )
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
                legend: "Date",
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
            <div className="flex  h-[28rem] w-full items-center justify-center bg-white font-medium tracking-wider text-gray-300">
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

export default DailySales
