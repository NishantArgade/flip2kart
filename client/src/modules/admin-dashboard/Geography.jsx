import { ResponsiveChoropleth } from "@nivo/geo"
import React, { useEffect, useMemo, useState } from "react"
import ClientFacingHeader from "./components/ClientFacingHeader"
import { geoData } from "./utils/geoData"
import { useQuery } from "@tanstack/react-query"
import { getUserLocationGeoData } from "../../api/userApi"
import countries from "i18n-iso-countries"
import english from "i18n-iso-countries/langs/en.json"
import Spinner from "../../components/Spinner"

const Geography = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["userLocationGeoData"],
    queryFn: getUserLocationGeoData,
  })

  const result = useMemo(() => {
    let maxCount = 0
    countries.registerLocale(english)
    const result = data?.locations?.map((loc) => {
      if (loc.count > maxCount) maxCount = loc.count

      return {
        id: countries.getAlpha3Code(loc.country, "en"),
        value: loc.count,
      }
    })

    return { data: result, maxCount }
  }, [data])

  return (
    <>
      <ClientFacingHeader
        heading={"Geography Map"}
        subHeading={"Map to see where our users are located"}
      />

      {!isLoading ? (
        result?.data?.length > 0 ? (
          <div className="bg-green-20 thin-scrollbar felx container mx-auto h-[30rem] w-full items-center justify-center overflow-auto bg-gray-50 shadow-md">
            <ResponsiveChoropleth
              data={result?.data}
              height={600}
              width={1200}
              projectionScale={180}
              features={geoData.features}
              margin={{ top: 70, right: 0, bottom: 0, left: 10 }}
              colors="nivo"
              domain={[0, result?.maxCount < 10 ? 10 : result?.maxCount]}
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
        ) : (
          <div className="flex h-[28rem] w-full items-center justify-center font-medium tracking-wider text-gray-300">
            No Data Available
          </div>
        )
      ) : (
        <div className="flex h-[30rem] items-center justify-center bg-white">
          <Spinner />
        </div>
      )}
    </>
  )
}

export default Geography
