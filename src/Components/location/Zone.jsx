import PropTypes from "prop-types";
import { useTheme } from "../../hooks/useTheme";
import Stat from "./Stat";

const Zone = ({ zoneName, status, location, speed, signal, progress }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const statusColors = {
    Safe: isDark ? "bg-teal-900 border-teal-700 text-teal-100" : "bg-teal-50 border-teal-200 text-teal-800",
    Monitoring: isDark ? "bg-yellow-900 border-yellow-700 text-yellow-100" : "bg-yellow-50 border-yellow-200 text-yellow-800",
    Alert: isDark ? "bg-red-900 border-red-700 text-red-100" : "bg-red-50 border-red-200 text-red-800",
  };

  const containerStyle = isDark
    ? "bg-gray-800 border-gray-700 text-white"
    : "bg-white border-gray-200 text-gray-900 shadow-md";

  return (
    <div
      className={`relative rounded-md p-6 transition-all duration-300 border ${containerStyle}`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold tracking-tight">{zoneName}</h2>

        <span
          className={`px-3 py-1 text-xs rounded-full font-bold uppercase tracking-wider border
            ${statusColors[status] || "bg-gray-100 border-gray-200 text-gray-700"}
          `}
        >
          {status}
        </span>
      </div>

      {/* LOCATION */}
      <p className={`text-sm mb-6 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        📍 {location}
      </p>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">
        <Stat label="Speed" value={`${speed} km/h`} dark={isDark} />
        <Stat label="Signal" value={`${signal}%`} dark={isDark} />
        <Stat label="Zone" value={status} dark={isDark} />
      </div>

      {/* PROGRESS */}
      <div className="mt-8">
        <div className="flex justify-between items-end mb-2">
          <p className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            Zone Progress
          </p>
          <p className="text-xs font-mono font-bold">{progress}%</p>
        </div>

        <div
          className={`
            w-full h-2 rounded-full overflow-hidden
            ${isDark ? "bg-gray-700" : "bg-gray-100"}
          `}
        >
          <div
            className={`h-full transition-all duration-1000
              ${isDark ? "bg-blue-500" : "bg-blue-600"}
            `}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

Zone.propTypes = {
  zoneName: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["Safe", "Monitoring", "Alert"]).isRequired,
  location: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
  signal: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
};

export default Zone;
