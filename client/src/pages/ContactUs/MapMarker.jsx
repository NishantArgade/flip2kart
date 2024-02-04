/* eslint-disable react/prop-types */
import { Marker, Popup, useMap } from "react-leaflet";

const MapMarker = ({ city }) => {
  const map = useMap();
  return (
    <Marker
      eventHandlers={{
        click: () => {
          map.flyTo([city.latitude, city.longitude], 15);
        },
      }}
      position={[city.latitude, city.longitude]}
    >
      <Popup>
        <span>{city.name}</span>
      </Popup>
    </Marker>
  );
};

export default MapMarker;
