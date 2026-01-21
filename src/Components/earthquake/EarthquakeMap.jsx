import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";

const EarthquakeMap = ({ quakes }) => {
  const getColor = (mag) => {
    if (mag >= 6) return "red";
    if (mag >= 4.5) return "orange";
    return "lime";
  };

  const strongest = quakes.sort(
    (a, b) => b.properties.mag - a.properties.mag
  )[0];
  const center = strongest
    ? [strongest.geometry.coordinates[1], strongest.geometry.coordinates[0]]
    : [20, 0]; // fallback world center

  return (
    <div className="h-[700px] rounded-md overflow-hidden border border-white/10 shadow-md">
      <MapContainer
        center={center}
        zoom={2}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {quakes.map((q) => {
          const { mag, place, time } = q.properties;
          const [lng, lat, depth] = q.geometry.coordinates;

          return (
            <CircleMarker
              key={q.id}
              center={[lat, lng]}
              radius={mag * 2}
              color={getColor(mag)}
              fillOpacity={0.6}
            >
              <Popup>
                <p>
                  <b>Location:</b> {place}
                </p>
                <p>
                  <b>Magnitude:</b> {mag}
                </p>
                <p>
                  <b>Depth:</b> {depth.toFixed(1)} km
                </p>
                <p>
                  <b>Time:</b> {new Date(time).toLocaleString()}
                </p>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

//Defining proptypes
EarthquakeMap.propTypes = {
  quakes: PropTypes.array,
};

export default EarthquakeMap;
