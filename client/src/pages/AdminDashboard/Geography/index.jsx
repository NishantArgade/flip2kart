import { ResponsiveChoropleth } from "@nivo/geo";
import React from "react";
import { geoData } from "./geoData";

const data = [
  {
    id: "AFG",
    value: 10,
  },
  {
    id: "USA",
    value: 50,
  },
  {
    id: "IND",
    value: 90,
  },
  {
    id: "IND",
    value: 190,
  },
];

const Geography = () => {
  return (
    <div className="container mx-auto bg-green-20 h-[33rem] shadow-md overflow-auto w-full thin-scrollbar bg-gray-50 felx justify-center items-center">
      <ResponsiveChoropleth
        data={data}
        height={700}
        width={1200}
        projectionScale={180}
        features={geoData.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="nivo"
        domain={[0, 100]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionTranslation={[0.45, 0.6]}
        projectionRotation={[0, 0, 0]}
        enableGraticule={false}
        //   graticuleLineColor="#dddddd"
        borderWidth={1.3}
        // isInteractive
        // projectionType=""
        borderColor="#666666"
        legends={[
          {
            anchor: "bottom-left",
            direction: "column",
            justify: true,
            translateX: 20,
            translateY: -60,
            itemsSpacing: 0,
            itemWidth: 94,
            itemHeight: 18,
            itemDirection: "left-to-right",
            itemTextColor: "#444444",
            itemOpacity: 0.85,
            symbolSize: 18,
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000000",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default Geography;
