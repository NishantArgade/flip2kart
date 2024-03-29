import L from "leaflet"
import { Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import markerShadowPng from "leaflet/dist/images/marker-shadow.png"
import { Icon } from "leaflet"

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconPng,
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
})

const MapMarker = ({ city }) => {
  const map = useMap()
  return (
    <Marker
      icon={new Icon.Default()}
      eventHandlers={{
        click: () => {
          map.flyTo([city.latitude, city.longitude], 15)
        },
      }}
      position={[city.latitude, city.longitude]}
    >
      <Popup>
        <span>{city.name}</span>
      </Popup>
    </Marker>
  )
}

export default MapMarker
