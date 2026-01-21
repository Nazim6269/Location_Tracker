import { useEffect, useState } from "react";
import AddNew from "../Components/AddNew";
import WeatherInfo from "../Components/WeatherInfo";
import CityInfoModal from "../Components/CityInfoModal";
import { initialClocks, initialWeathers } from "../../data";

import { useTheme } from "../hooks/useTheme";
import AddNewWeather from "../Components/AddNewWeather";

const WorldClocks = () => {
  const [time, setTime] = useState(new Date());
  const [offset, setOffset] = useState(0);
  const [clocks, setClocks] = useState(initialClocks);
  const [cities, setCities] = useState(initialWeathers);
  const [hour24, setHour24] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getOffsetTime = () => {
    const d = new Date(time);
    d.setHours(d.getHours() + offset);
    return d;
  };

  const currentOffsetTime = getOffsetTime();

  const addClock = (newClock) => {
    setClocks((prev) => [...prev, newClock]);
  };
  const addCity = (city) => {
    setCities((prev) =>
      prev.some((c) => c.city === city.city) ? prev : [...prev, city]
    );
  };

  const getTimeInfo = (tz) => {
    const timeInTz = new Date(
      currentOffsetTime.toLocaleString("en-US", { timeZone: tz })
    );
    const hour = timeInTz.getHours();

    let status = "Other";
    let color = isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600";

    if (hour >= 9 && hour < 17) {
      status = "Business";
      color = "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30";
    } else if (hour >= 22 || hour < 6) {
      status = "Sleeping";
      color = "bg-rose-500/20 text-rose-500 border border-rose-500/30";
    }

    return {
      timeStr: currentOffsetTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: !hour24,
        timeZone: tz,
      }),
      dateStr: currentOffsetTime.toLocaleDateString("en-US", { timeZone: tz }),
      status,
      color,
    };
  };

  const removeCity = (id) => {
    setClocks(clocks.filter((c) => c.id !== id));
  };

  return (
    <div
      className={`
    min-h-screen p-8 transition-colors duration-500
    ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
  `}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between gap-6 items-center mb-10">
          <div>
            <h1
              className={`text-4xl font-extrabold mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"
                }`}
            >
              World Clocks
            </h1>
            <p className="opacity-60 text-sm">
              Coordinate global meetings with the time slider
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center w-full md:w-auto">
            {/* Time Slider */}
            <div
              className={`flex flex-col gap-2 p-4 rounded-md w-full md:w-80 border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
                }`}
            >
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider opacity-60">
                <span>Meeting Planner</span>
                <span className={offset !== 0 ? "text-indigo-500" : ""}>
                  {offset > 0 ? `+${offset}h` : offset < 0 ? `${offset}h` : "Live"}
                </span>
              </div>
              <input
                type="range"
                min="-12"
                max="12"
                value={offset}
                onChange={(e) => setOffset(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] opacity-40">
                <span>-12h</span>
                <span>Now</span>
                <span>+12h</span>
              </div>
            </div>

            <button
              onClick={() => setHour24(!hour24)}
              className={`
                px-6 py-3 rounded-md font-bold shadow-md hover:shadow-md transition-all duration-300 whitespace-nowrap
                ${theme === "dark"
                  ? "bg-gray-800 border border-gray-600 text-white hover:bg-gray-700"
                  : "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50"
                }
              `}
            >
              {hour24 ? "12H Format" : "24H Format"}
            </button>
          </div>
        </header>

        {/* Add New Clock */}
        <div className="mb-10">
          <AddNew onAdd={addClock} />
        </div>

        {/* Clock Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {clocks.map((clock) => {
            const info = getTimeInfo(clock.timezone);
            return (
              <div
                key={clock.id}
                onClick={() => setSelectedCity(clock.city)}
                className={`
                  rounded-md p-6 flex flex-col transition-all duration-500 border hover:scale-[1.02] cursor-pointer relative
                  ${isDark
                    ? "bg-gray-800 border-gray-700 shadow-md shadow-black/20"
                    : "bg-white border-gray-100 shadow-md"
                  }
                `}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCity(clock.id);
                  }}
                  className="absolute top-4 right-4 text-gray-400 hover:text-rose-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <h2 className="text-xl font-bold mb-1">{clock.city}</h2>
                <p className="text-xs opacity-50 mb-4">{clock.timezone}</p>

                <div className="flex flex-col mb-4">
                  <span
                    className={`text-3xl font-black tracking-tight ${isDark ? "text-indigo-400" : "text-indigo-600"
                      }`}
                  >
                    {info.timeStr}
                  </span>
                  <span className="text-sm font-medium opacity-60">
                    {info.dateStr}
                  </span>
                </div>

                <div
                  className={`mt-auto inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${info.color}`}
                >
                  {info.status === "Business" && <span className="mr-1">💼</span>}
                  {info.status === "Sleeping" && <span className="mr-1">😴</span>}
                  {info.status} Hours
                </div>
              </div>
            );
          })}
        </div>

        {/* Weather Section */}
        <div className="mt-20 border-t border-gray-100/10 pt-10 text-center">
          <h2
            className={`text-3xl font-black mb-8 ${theme === "dark" ? "text-white" : "text-gray-800"
              }`}
          >
            World Weather Analytics
          </h2>
          <AddNewWeather onAdd={addCity} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {cities.map((city) => (
              <WeatherInfo key={city.id} city={city.city} />
            ))}
          </div>
        </div>

        {/* Detail Modal */}
        <CityInfoModal
          city={selectedCity}
          onClose={() => setSelectedCity(null)}
          isDark={isDark}
        />
      </div>
    </div>
  );
};

export default WorldClocks;
