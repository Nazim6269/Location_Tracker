import { useTheme } from "../../hooks/useTheme";

const Timeline = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const items = [
    { time: "10:30", event: "Entered Zone Alpha" },
    { time: "10:45", event: "Speed exceeded limit" },
    { time: "11:00", event: "Signal lost (5s)" },
    { time: "11:10", event: "Reconnected" },
  ];

  return (
    <div
      className={`rounded-md p-6 transition-all duration-300 border
        ${isDark
          ? "bg-gray-800 border-gray-700 text-white"
          : "bg-white border-gray-100 text-gray-800 shadow-md"
        }
      `}
    >
      <h2
        className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"
          }`}
      >
        Zone Activity Timeline
      </h2>

      <div className="space-y-4">
        {items.map((i, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div
              className={`w-3 h-3 mt-1 rounded-full animate-pulse ${isDark ? "bg-darkTextColor" : "bg-lightTextColor"
                }`}
            ></div>
            <div>
              <p
                className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-800"
                  }`}
              >
                {i.event}
              </p>
              <span
                className={`text-xs opacity-60 ${isDark ? "text-gray-400" : "text-gray-500"
                  }`}
              >
                {i.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
