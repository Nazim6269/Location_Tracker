import { useLocation } from "../../context/location-context";
import { useTheme } from "../../hooks/useTheme";

const AnalyticStats = () => {
  const { theme } = useTheme();
  const { stats: realStats, history } = useLocation();
  const isDark = theme === "dark";

  const stats = [
    { label: "Distance Today", value: `${realStats.distanceTraveled} km` },
    { label: "Avg Speed", value: `${realStats.averageSpeed} m/s` },
    { label: "Data Points", value: history.length },
    { label: "Active Zones", value: 4 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((item, i) => (
        <div
          key={i}
          className={`rounded-md p-4 text-center transition-all duration-300 border hover:scale-105
            ${isDark
              ? "bg-gray-800 border-gray-700 text-white shadow-md shadow-black/20"
              : "bg-white border-gray-100 text-gray-800 shadow-md"
            }
          `}
        >
          <p
            className={`text-xs uppercase font-bold tracking-wider mb-2 ${isDark ? "text-gray-400" : "text-gray-500"
              }`}
          >
            {item.label}
          </p>
          <h2
            className={`text-2xl font-black ${isDark ? "text-indigo-400" : "text-indigo-600"
              }`}
          >
            {item.value || 0}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default AnalyticStats;
