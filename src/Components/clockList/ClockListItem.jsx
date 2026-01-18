import { formatDistance } from "date-fns";
import PropTypes from "prop-types";
import useClock from "../../hooks/useClock";
import { useTheme } from "../../hooks/useTheme";
import useTimer from "../../hooks/useTimer";
import ClockActions from "../shared/clock-actions/ClockActions";
import ClockDisplay from "../shared/clock-display/ClockDisplay";

/**
 * ClockListItem renders a single clock card in the list.
 */
const ClockListItem = ({ clock, updateClock, deleteClock, localClock }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { date } = useClock(clock.timezone, clock.offset);
  const timer = useTimer(date);

  if (!date || !timer) return null;

  return (
    <div
      className={`
        group relative
        rounded-2xl 
        p-6
        transition-all duration-500
        hover:scale-[1.02]
        ${isDark
          ? "bg-gray-800/40 border border-gray-700/50 shadow-xl hover:shadow-2xl hover:bg-gray-800/60"
          : "bg-white border border-gray-100 shadow-lg hover:shadow-xl hover:bg-gray-50/50"
        }
      `}
    >
      <div className="flex flex-col h-full justify-between gap-6">
        <div>
          <ClockDisplay
            date={timer}
            timezone={clock.timezone}
            offset={clock.offset}
            title={clock.title}
            titleClass={`text-xl font-bold mb-1 tracking-tight ${isDark ? "text-white" : "text-gray-800"}`}
            timeClass={`text-3xl font-mono font-semibold ${isDark ? "text-blue-400" : "text-blue-600"}`}
            dateClass={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}
          />

          {localClock && (
            <div className={`mt-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
              }`}>
              <span className="mr-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              {formatDistance(localClock, timer)} relative to local
            </div>
          )}
        </div>

        <div className={`pt-4 border-t ${isDark ? "border-gray-700/50" : "border-gray-100"}`}>
          <ClockActions
            clock={clock}
            updateClock={updateClock}
            deleteClock={deleteClock}
          />
        </div>
      </div>
    </div>
  );
};

ClockListItem.propTypes = {
  clock: PropTypes.shape({
    title: PropTypes.string.isRequired,
    timezone: PropTypes.string,
    offset: PropTypes.number,
    id: PropTypes.string.isRequired,
  }).isRequired,
  updateClock: PropTypes.func.isRequired,
  deleteClock: PropTypes.func.isRequired,
  localClock: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default ClockListItem;
