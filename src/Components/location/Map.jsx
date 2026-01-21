import L from "leaflet";
import PropTypes from "prop-types";
import { MapContainer, Marker, Polyline, Popup, TileLayer, Circle } from "react-leaflet";
import { useLocation } from "../../context/location-context";
import { useTheme } from "../../hooks/useTheme";
import { ZONES } from "../../constants/zones";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapComponent = ({ lat, lng, zone }) => {
  const { theme } = useTheme();
  const { history } = useLocation();
  const isDark = theme === "dark";

  // Convert history to array of lat/lng pairs for Polyline
  const path = history.map(p => [p.lat, p.lng]);

  return (
    <div
      className={`
        h-[650px] rounded-md overflow-hidden transition-colors duration-500 border
        ${isDark
          ? "bg-gray-800 border-gray-700 shadow-md"
          : "bg-white border-gray-100 shadow-md"
        }
      `}
    >
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom
        className="h-full w-full rounded-md"
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url={
            isDark
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        />

        {/* Breadcrumb Path */}
        <Polyline
          positions={path}
          color={isDark ? "#6366f1" : "#4f46e5"}
          weight={4}
          opacity={0.6}
          dashArray="10, 10"
        />

        {/* Zones */}
        {ZONES.map((zone) => (
          <Circle
            key={zone.id}
            center={[zone.lat, zone.lng]}
            radius={zone.radius * 1000} // Circle radius is in meters
            pathOptions={{
              color: isDark ? "#10b981" : "#059669",
              fillColor: isDark ? "#10b981" : "#059669",
              fillOpacity: 0.2,
            }}
          >
            <Popup>
              <div className="text-center font-bold">
                {zone.name}
                <br />
                <span className="text-xs font-normal">Active Monitoring Zone</span>
              </div>
            </Popup>
          </Circle>
        ))}

        <Marker position={[lat, lng]} icon={icon}>
          <Popup>
            <div className="text-center p-1">
              <b className="text-indigo-600 block mb-1">{zone}</b>
              <span className="text-xs text-gray-500">You are here</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

MapComponent.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  zone: PropTypes.string,
};

export default MapComponent;
