import { useEffect, useState } from "react";
import EarthquakeMap from "../Components/earthquake/EarthquakeMap";
import EarthquakeCharts from "../Components/earthquake/EarthquakeCharts";
import InfoRow from "../Components/earthquake/Info";
import ErrorCard from "../Components/ErrorCard";
import LoadingCard from "../Components/LoadingCard";
import { useTheme } from "../hooks/useTheme";
import { getQuackSeverity } from "../utils/getQuackSeverity";
import fetchQuakesData from "../utils/getQuakesData";
const quackApi = import.meta.env.VITE_EARTHQUAKES_API;

const EarthquakeDashboard = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [quakes, setQuakes] = useState([]);
  const [minMag, setMinMag] = useState(4.0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Auto Refresh every 60s
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchQuakesData(quackApi);
        setQuakes(data || []);
        setError("");
      } catch (error) {
        console.error("Error fetching quake data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchQuakesData, 60000);
    return () => clearInterval(interval);
  }, []);

  const filtered = quakes
    .filter((q) => q.properties.mag >= minMag)
    .sort((a, b) => b.properties.mag - a.properties.mag);
  const strongest = filtered[0];

  if (loading) return <LoadingCard text={" 🌐 Loading earthquake data..."} />;
  if (error) return <ErrorCard message={error} />;

  return (
    <div
      className={`
      min-h-screen p-8 transition-colors duration-500
      ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
    `}
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1
            className={`${isDark ? "text-darkTextColor" : "text-lightPrimaryTextColor"
              } text-2xl font-bold`}
          >
            Earthquake Dashboard
          </h1>

          <span
            className={`
            px-4 py-2 rounded-full text-sm font-semibold
            ${isDark
                ? "border border-gray-500 text-darkTextColor"
                : "border border-purple-500 text-lightTextColor"
              }
          `}
          >
            LIVE MONITORING
          </span>
        </header>

        {/* GRID LAYOUT */}
        {filtered.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* LEFT = DATA PANEL */}
              <div
                className={`
                rounded-md shadow-md p-6 transition-all duration-300
                ${isDark
                    ? "bg-gray-800 shadow-md shadow-black/40"
                    : "bg-white text-gray-800 shadow-md border border-gray-100"
                  }
              `}
              >
                {/* Filter */}
                <div className="mb-6">
                  <label className="text-sm opacity-70">Minimum Magnitude</label>
                  <select
                    value={minMag}
                    onChange={(e) => setMinMag(+e.target.value)}
                    className={`
                    w-full mt-2 rounded-md p-3
                    ${isDark
                        ? "bg-gray-900 border border-gray-600 text-white"
                        : "bg-white border border-gray-300"
                      }
                  `}
                  >
                    <option value={2.5}>2.5+</option>
                    <option value={4}>4.0+</option>
                    <option value={5}>5.0+</option>
                    <option value={6}>6.0+</option>
                  </select>
                </div>

                {/* STRONGEST */}
                {strongest &&
                  (() => {
                    const { mag, place, time } = strongest.properties;
                    const [lng, lat, depth] = strongest.geometry.coordinates;
                    const severity = getQuackSeverity(mag);

                    return (
                      <div
                        className={`
                      rounded-md p-5 mb-6
                      ${isDark ? "bg-gray-900" : "bg-gray-50"}
                    `}
                      >
                        <div className="flex justify-between mb-3">
                          <h3
                            className={`${isDark ? "text-white" : "text-gray-900"
                              } font-bold`}
                          >
                            Strongest Today
                          </h3>
                          <span
                            className={`text-xs px-3 py-1 rounded-full ${severity.color}`}
                          >
                            {severity.label}
                          </span>
                        </div>

                        <div className="space-y-2 text-sm">
                          <InfoRow
                            label="Magnitude"
                            value={mag}
                            highlight="text-red-400"
                          />
                          <InfoRow label="Location" value={place} />
                          <InfoRow label="Depth" value={`${depth.toFixed(1)} km`} />
                          <InfoRow label="Latitude" value={lat.toFixed(3)} mono />
                          <InfoRow label="Longitude" value={lng.toFixed(3)} mono />
                          <InfoRow
                            label="Time"
                            value={new Date(time).toLocaleString()}
                          />
                        </div>
                      </div>
                    );
                  })()}

                {/* LIST */}
                <p className="opacity-70 text-sm mb-2">Recent Earthquakes</p>
                <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
                  {filtered.slice(0, 10).map((q) => {
                    const sev = getQuackSeverity(q.properties.mag);

                    return (
                      <div
                        key={q.id}
                        className={`
                        rounded-md p-4 transition
                        ${isDark
                            ? "bg-gray-900 hover:bg-gray-700"
                            : "bg-gray-50 hover:bg-gray-100"
                          }
                      `}
                      >
                        <div className="flex justify-between">
                          <span
                            className={`${isDark ? "text-white" : "text-gray-900"
                              } font-semibold`}
                          >
                            {q.properties.place}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${sev.color}`}
                          >
                            {q.properties.mag}
                          </span>
                        </div>
                        <p className="text-xs opacity-70">
                          {new Date(q.properties.time).toLocaleTimeString()}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT = MAP PANEL */}
              <div
                className={`
                rounded-md overflow-hidden shadow-md transition
                ${isDark
                    ? "bg-gray-800 shadow-black/40"
                    : "bg-white shadow-md border border-gray-100"
                  }
              `}
              >
                <EarthquakeMap quakes={filtered} />
              </div>
            </div>

            {/* ANALYTICS CHARTS */}
            <EarthquakeCharts quakes={filtered.slice(0, 50)} isDark={isDark} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-700">
            <div className={`w-24 h-24 mb-6 rounded-full flex items-center justify-center text-4xl ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
              🌍
            </div>
            <h2 className="text-2xl font-bold mb-2">No High Magnitude Events</h2>
            <p className="opacity-60 max-w-md mb-8">
              We couldn't find any earthquakes matching a magnitude of <b>{minMag}+</b> today.
              This is usually good news! Try lowering the filter to see more data.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              {[2.5, 4, 5].map(v => (
                <button
                  key={v}
                  onClick={() => setMinMag(v)}
                  className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${isDark
                    ? "bg-gray-800 hover:bg-gray-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    } ${v === minMag ? "hidden" : ""}`}
                >
                  See {v}+ Mag
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EarthquakeDashboard;
