import { format } from "date-fns";
import PropTypes from "prop-types";
import { useTheme } from "../../../hooks/useTheme";

const ClockDisplay = ({
  date,
  timezone,
  offset,
  title,
  titleClass = "",
  timeClass = "",
  dateClass = ""
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const offsetHr = offset / 60;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1
          className={`font-semibold tracking-tight truncate mr-4
          ${isDark ? "text-white" : "text-gray-900"} 
          ${titleClass || "text-xl md:text-2xl"}`}
        >
          {title}
        </h1>

        <span
          className={`shrink-0 text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-widest
          ${isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-50 text-blue-600"}`}
        >
          {timezone || "UTC"}
        </span>
      </div>

      {/* Time Display */}
      <div className="flex flex-col mb-4">
        <div
          className={`font-mono font-bold tracking-tighter
          ${isDark ? "text-white" : "text-gray-900"} 
          ${timeClass || "text-4xl"}`}
        >
          {format(date, "hh:mm:ss")}
          <span className="text-xl ml-1 font-sans opacity-70 uppercase">
            {format(date, "a")}
          </span>
        </div>

        <p
          className={`mt-1 font-medium
          ${isDark ? "text-gray-500" : "text-gray-400"} 
          ${dateClass || "text-sm"}`}
        >
          {format(date, "EEEE, MMMM do yyyy")}
        </p>
      </div>

      {/* Offset Info */}
      <div className={`flex items-center gap-2 pt-4 border-t ${isDark ? "border-gray-800" : "border-gray-100"}`}>
        <span
          className={`text-[10px] font-bold uppercase tracking-widest
          ${isDark ? "text-gray-600" : "text-gray-400"}`}
        >
          UTC Offset
        </span>

        <span
          className={`text-xs font-mono font-bold px-2 py-0.5 rounded
          ${isDark ? "bg-gray-800 text-teal-400" : "bg-gray-50 text-teal-600"}`}
        >
          {offsetHr >= 0
            ? `+${Math.abs(offsetHr).toFixed(1)}`
            : `-${Math.abs(offsetHr).toFixed(1)}`}
          h
        </span>
      </div>
    </div>
  );
};

ClockDisplay.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  timezone: PropTypes.string,
  offset: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  titleClass: PropTypes.string,
  timeClass: PropTypes.string,
  dateClass: PropTypes.string,
};

export default ClockDisplay;
