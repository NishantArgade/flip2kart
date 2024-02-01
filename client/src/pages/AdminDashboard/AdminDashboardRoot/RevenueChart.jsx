// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import { ResponsiveLine } from "@nivo/line";
``;
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const data = [
  {
    id: "japan",
    color: "hsl(161, 70%, 50%)",
    data: [
      {
        x: "product1",
        y: 10,
      },
      {
        x: "product2",
        y: 50,
      },
      {
        x: "boat",
        y: 70,
      },
      {
        x: "train",
        y: 80,
      },
      {
        x: "subway",
        y: 70,
      },
      {
        x: "bus",
        y: 75,
      },
      {
        x: "car",
        y: 90,
      },
      {
        x: "moto",
        y: 120,
      },
      {
        x: "bicycle",
        y: 150,
      },
      {
        x: "horse",
        y: 180,
      },
      {
        x: "skateboard",
        y: 200,
      },
      {
        x: "others",
        y: 250,
      },
    ],
  },
];
const RevenueChart = () => {
  let isDashboard = true;
  return (
    <div className=" col-span-1 lg:col-span-7 h-[15rem] rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-sm text-gray-700 p-3 bg-gray-50">
      <div className="text-sm font-semibold text-slate-500 tracking-wide pb-2">
        Revenue
      </div>
      <ResponsiveLine
        colors={"#93e0deec"}
        data={data}
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
        margin={{ top: 15, right: 10, bottom: 72, left: 50 }}
        yFormat=" >-.2f"
        curve="catmullRom"
        enableArea={isDashboard}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: (v) => {
            if (isDashboard) return v.slice(0, 3);
            return v;
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
          legend: "count",
          legendOffset: -40,
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
      />
    </div>
  );
};

export default RevenueChart;
