import { ResponsivePie } from "@nivo/pie"
import Skeleton from "react-loading-skeleton"

const SalesPieChart = ({ data, isLoading }) => {
  const result = data?.result.map((item) => ({
    id: item.category,
    label: item.category,
    value: item.totalSales,
    color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
  }))

  return (
    <div className="col-span-1 flex flex-col justify-between gap-y-12 rounded-md bg-gray-50 p-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] lg:col-span-4">
      <div className="h-[22rem]">
        <p className="text-sm font-semibold tracking-wide text-slate-500">
          Sales By Category
        </p>
        {!isLoading ? (
          data?.result.length > 0 ? (
            <ResponsivePie
              data={result}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
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
                  },
                },
                legends: {
                  text: {
                    fillOpacity: 1,
                    fontWeight: 700,
                  },
                },
                tooltip: {
                  container: {
                    color: "#4e4e4e",
                    fontSize: "0.70rem",
                  },
                },
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
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  // translateX: -30,
                  translateY: 50,
                  itemsSpacing: 0,
                  itemWidth: 50,
                  itemHeight: 18,
                  itemTextColor: "#999",
                  itemDirection: "top-to-bottom",
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
              ]}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-y-6">
              <p className="text-sm text-gray-400">No sales found</p>
            </div>
          )
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-y-6">
            <Skeleton width={250} height={250} className="rounded-full" />
            <Skeleton width={250} height={30} />
          </div>
        )}
      </div>

      {!isLoading && data?.result.length > 0 && (
        <div className="text-xs text-gray-600">
          A pie chart displaying the proportion of total sales that each
          category contributes
        </div>
      )}
    </div>
  )
}

export default SalesPieChart
