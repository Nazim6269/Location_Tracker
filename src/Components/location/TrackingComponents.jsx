import useDetailsInfo from "../../hooks/useDetailsInfo";
import { useLocation, calculateDistance } from "../../context/location-context";
import { ZONES } from "../../constants/zones";
import { useTheme } from "../../hooks/useTheme";
import LiveTracker from "../LiveTracker";
import Alerts from "./Alerts";
import AnalyticStats from "./AnalyticStats";
import MapComponent from "./Map";
import LocationAnalytics from "./LocationAnalytics";
import Timeline from "./TimeLine";
import Zone from "./Zone";

const TrackingComponents = () => {
  const { position, history, stats, error, loading } = useLocation();
  const { info } = useDetailsInfo();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Find current zone
  let activeZone = null;
  let distanceToClosest = Infinity;

  if (position) {
    for (const zone of ZONES) {
      const dist = calculateDistance(position.lat, position.lng, zone.lat, zone.lng);
      if (dist <= zone.radius) {
        activeZone = zone;
        break;
      }
      if (dist < distanceToClosest) distanceToClosest = dist;
    }
  }

  /* ------------------ ERROR STATE ------------------ */
  if (error && !position)
    return (
      <div
        className={`rounded-md p-5 shadow-md border 
        ${isDark
            ? "bg-red-500/10 text-red-400 border-red-500/20"
            : "bg-red-50 text-red-600 border-red-200"
          }`}
      >
        ⚠️ {error}
      </div>
    );

  /* ------------------ LOADING STATE ------------------ */
  if (!position && loading)
    return (
      <div
        className={`rounded-md p-5 border animate-pulse 
        tracking-widest uppercase text-sm
        ${isDark
            ? "bg-gray-800 text-gray-300 border-gray-700"
            : "bg-white text-gray-600 border-gray-200 shadow-sm"
          }`}
      >
        📡 Fetching live location...
      </div>
    );

  /* ------------------ MAIN UI ------------------ */
  return (
    <div className="w-full transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1
              className={`text-3xl font-extrabold ${isDark ? "text-gray-400" : "text-gray-800"
                }`}
            >
              Your Location
            </h1>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${loading
              ? "bg-amber-500/20 text-amber-500 animate-pulse"
              : "bg-emerald-500/20 text-emerald-500"
              }`}>
              <div className={`w-2 h-2 rounded-full ${loading ? "bg-amber-500" : "bg-emerald-500"}`}></div>
              {loading ? "Updating..." : "Live"}
            </div>
          </div>
          {position?.timestamp && (
            <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              Last updated: {new Date(position.timestamp).toLocaleTimeString()}
            </span>
          )}
        </header>

        {/* TRACKER + MAP */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 mb-8">
          <LiveTracker />
          <MapComponent
            lat={position.lat}
            lng={position.lng}
            zone={activeZone ? activeZone.name : "Outside Signal Zone"}
          />
        </div>

        {/* ZONE */}
        <div className="mb-8">
          <Zone
            zoneName={activeZone ? activeZone.name : "Global Zone"}
            location={info.city || "Unknown"}
            status={activeZone ? "Safe" : "Monitoring"}
            speed={position.speed || 0}
            signal={activeZone ? 100 : Math.max(0, 100 - distanceToClosest * 2).toFixed(0)}
            progress={activeZone ? 100 : Math.max(0, 50 - distanceToClosest).toFixed(0)}
          />
        </div>

        {/* ALERTS */}
        <div className="mb-8">
          <Alerts
            alerts={[
              {
                level: activeZone ? "Safe" : "Warning",
                text: activeZone ? `Secure in ${activeZone.name}` : "Outside primary safe zones",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
              { level: "Info", text: "Location services active", time: "System" },
            ]}
          />
        </div>

        {/* ANALYTICS CHARTS */}
        <div className="mb-8">
          <LocationAnalytics isDark={isDark} />
        </div>

        {/* ANALYTICS */}
        <div className="mb-8">
          <AnalyticStats />
        </div>

        {/* TIMELINE */}
        <div>
          <Timeline />
        </div>
      </div>
    </div>
  );
};

export default TrackingComponents;
