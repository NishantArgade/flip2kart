import { City, Country, State } from "country-state-city"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer } from "react-leaflet"
import MapMarker from "./components/MapMarker"
import { getAllOffices } from "../../api/officeApi"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

const Map = () => {
  const officeLocations = [
    {
      country: "IN",
      state: "MH",
      city: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    },
    {
      country: "US",
      state: "CA",
      city: ["San Francisco", "Los Angeles", "San Diego", "San Jose"],
    },
    {
      country: "UK",
      state: "ENG",
      city: ["London", "Manchester", "Birmingham", "Liverpool"],
    },
  ]
  const { data, isLoading } = useQuery({
    queryKey: ["allOffices"],
    queryFn: getAllOffices,
  })
  let allCountries = Country.getAllCountries() // Get all countries

  const result = useMemo(() => {
    return data?.offices.map((location) => {
      let country = allCountries.find(
        (c) => c.name.toLowerCase() === location.country.toLowerCase()
      )
      let state = State.getAllStates(country?.isoCode).find(
        (s) => s.name.toLowerCase() === location.state.toLowerCase()
      )
      return City.getCitiesOfState(country?.isoCode, state?.isoCode).filter(
        (city) => city.name.toLowerCase() === location.city.toLowerCase()
      )
    })
  }, [data])

  console.log(result)
  return (
    <MapContainer
      center={[18.52043, 73.856743]}
      zoom={2}
      className="h-72 w-full"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // zIndex={-100}
      />
      {result?.length > 0
        ? result.map((country) =>
            country.map((city) => (
              <MapMarker
                key={`${city.name}${city.latitude}${city.longitude}`}
                city={city}
              />
            ))
          )
        : null}
    </MapContainer>
  )
}

export default Map
