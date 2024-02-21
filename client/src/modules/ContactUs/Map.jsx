import { City, Country } from "country-state-city"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer } from "react-leaflet"
import MapMarker from "./components/MapMarker"

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

  const data = officeLocations.map((location) =>
    City.getCitiesOfCountry(location.country, location.state).filter((city) =>
      location.city.includes(city.name)
    )
  )

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
      {data.map((country) =>
        country.map((city) => (
          <MapMarker
            key={`${city.name}${city.latitude}${city.longitude}`}
            city={city}
          />
        ))
      )}
    </MapContainer>
  )
}

export default Map