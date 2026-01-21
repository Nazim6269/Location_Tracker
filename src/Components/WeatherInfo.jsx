import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "../hooks/useTheme";
import ErrorCard from "./ErrorCard";
import { Info } from "./Info";
import LoadingCard from "./LoadingCard";

const weatherApi = import.meta.env.VITE_WEATHER_API_KEY;

const WeatherInfo = ({ city }) => {
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    async function getWeatherData() {
      try {
        setLoading(true);
        setError("");

        // 1. Fetch Current Weather
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApi}`
        );
        if (!weatherRes.ok) throw new Error("Failed to fetch current weather");
        const weatherJson = await weatherRes.json();

        // 2. Fetch Forecast for Trend (5 days / 3 hours)
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${weatherApi}`
        );
        if (!forecastRes.ok) throw new Error("Failed to fetch forecast");
        const forecastJson = await forecastRes.json();

        setData({
          temp: Math.round(weatherJson.main.temp),
          feels_like: Math.round(weatherJson.main.feels_like),
          humidity: weatherJson.main.humidity,
          pressure: weatherJson.main.pressure,
          wind: weatherJson.wind.speed,
          visibility: Math.round(weatherJson.visibility / 1000),
          sunrise: weatherJson.sys.sunrise,
          sunset: weatherJson.sys.sunset,
          condition: weatherJson.weather[0].main,
          icon: weatherJson.weather[0].icon,
        });

        // Take the next 8 points (approx 24 hours) for the trend
        const trendData = forecastJson.list.slice(0, 8).map((item) => ({
          time: new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          temp: Math.round(item.main.temp),
        }));
        setForecast(trendData);
      } catch (err) {
        console.error(err);
        setError("Unable to load weather data");
      } finally {
        setLoading(false);
      }
    }

    if (city) getWeatherData();
  }, [city]);

  const formatTime = (unix) =>
    new Date(unix * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) return <LoadingCard />;
  if (error) return <ErrorCard message={error} />;
  if (!data) return null;

  return (
    <div
      className={`
    rounded-md p-6 w-full max-w-md space-y-4 transition-all duration-300 border
    ${isDark
          ? "bg-gray-800 border-gray-700 text-white shadow-md"
          : "bg-white border-gray-100 text-gray-800 shadow-md"
        }
  `}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">{city}</h2>
          <p className="text-sm opacity-60">24h Temperature Trend</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt="weather icon"
          className="w-16 h-16"
        />
      </div>

      {/* Main Info */}
      <div className="flex items-baseline gap-4">
        <p
          className={`${isDark ? "text-darkTextColor" : "text-lightTextColor"
            } text-5xl font-extrabold`}
        >
          {data.temp}°
        </p>
        <div className="flex flex-col">
          <span className="text-sm font-semibold opacity-80">{data.condition}</span>
          <p className="text-xs opacity-60">Feels like {data.feels_like}°</p>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="h-32 w-full mt-4 -mx-2">
        <ResponsiveContainer width="105%" height="100%">
          <AreaChart data={forecast}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1e293b" : "#ffffff",
                borderColor: "transparent",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              itemStyle={{ color: "#6366f1" }}
            />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#6366f1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTemp)"
            />
            <XAxis dataKey="time" hide />
            <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-4 text-sm mt-4">
        <div className={`p-3 rounded-md ${isDark ? "bg-gray-900/50" : "bg-gray-50"}`}>
          <p className="text-[10px] uppercase tracking-wider opacity-60 mb-1">Humidity</p>
          <p className="font-bold">{data.humidity}%</p>
        </div>
        <div className={`p-3 rounded-md ${isDark ? "bg-gray-900/50" : "bg-gray-50"}`}>
          <p className="text-[10px] uppercase tracking-wider opacity-60 mb-1">Wind</p>
          <p className="font-bold">{data.wind} m/s</p>
        </div>
        <div className={`p-3 rounded-md ${isDark ? "bg-gray-900/50" : "bg-gray-50"}`}>
          <p className="text-[10px] uppercase tracking-wider opacity-60 mb-1">Pressure</p>
          <p className="font-bold">{data.pressure} hPa</p>
        </div>
        <div className={`p-3 rounded-md ${isDark ? "bg-gray-900/50" : "bg-gray-50"}`}>
          <p className="text-[10px] uppercase tracking-wider opacity-60 mb-1">Visibility</p>
          <p className="font-bold">{data.visibility} km</p>
        </div>
      </div>

      {/* Sunrise / Sunset */}
      <div className="flex justify-between items-center text-xs px-2 pt-2 border-t border-gray-100/10 opacity-70">
        <div className="flex items-center gap-2">
          <span>🌅</span>
          <span>{formatTime(data.sunrise)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🌇</span>
          <span>{formatTime(data.sunset)}</span>
        </div>
      </div>
    </div>
  );
};

WeatherInfo.propTypes = {
  city: PropTypes.string,
};

export default WeatherInfo;
