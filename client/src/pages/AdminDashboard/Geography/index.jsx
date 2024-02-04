import { ResponsiveChoropleth } from "@nivo/geo"
import React from "react"
import ClientFacingHeader from "../ClientFacingHeader"
import { geoData } from "./geoData"

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
]

const Geography = () => {
  return (
    <>
      <ClientFacingHeader
        heading={"Geography Map"}
        subHeading={"Map to see where our users are located"}
      />

      <div className="bg-green-20 thin-scrollbar felx container mx-auto h-[33rem] w-full items-center justify-center overflow-auto bg-gray-50 shadow-md">
        <ResponsiveChoropleth
          data={data}
          // height={600}
          projectionScale={180}
          features={geoData.features}
          margin={{ top: 70, right: 0, bottom: 0, left: 10 }}
          colors="nivo"
          domain={[0, 100]}
          unknownColor="#666666"
          label="properties.name"
          valueFormat=".2s"
          projectionTranslation={[0.45, 0.6]}
          projectionRotation={[0, 0, 0]}
          enableGraticule={false}
          borderWidth={1.3}
          theme={{
            tooltip: {
              container: {
                color: "#4e4e4e",
                fontSize: "0.70rem",
              },
            },
          }}
          borderColor="#666666"
          legends={[
            {
              anchor: "bottom-left",
              direction: "column",
              justify: true,
              translateX: 20,
              translateY: -110,
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
    </>
  )
}

export default Geography
