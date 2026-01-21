import PropTypes from "prop-types";
import { useTheme } from "../../hooks/useTheme";
import ClockListItem from "./ClockListItem";

/**
 * ClockList component renders the list of created clocks.
 */
const ClockList = ({ clocks, updateClock, deleteClock, localClock }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`
        w-full
        transition-colors duration-500
      `}
    >
      {clocks.length === 0 ? (
        <div
          className={`
            flex flex-col items-center justify-center
            p-12 rounded-md border-2 border-dashed
            transition-all duration-300
            ${isDark
              ? "bg-gray-800 border-gray-700 text-gray-400"
              : "bg-gray-50 border-gray-200 text-gray-500 shadow-sm"
            }
          `}
        >
          <div className={`p-4 rounded-full mb-4 ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
            <svg className="w-12 h-12 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xl font-medium mb-2">No Other Clocks Added</p>
          <p className="text-sm opacity-70 text-center max-w-xs">
            Start tracking global timezones by using the 'Add' button on your local clock.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {clocks.map((clock) => (
            <ClockListItem
              key={clock.id}
              clock={clock}
              updateClock={updateClock}
              deleteClock={deleteClock}
              localClock={localClock.date}
            />
          ))}
        </div>
      )}
    </div>
  );
};

ClockList.propTypes = {
  clocks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string,
      timezone: PropTypes.string,
      offset: PropTypes.number,
    })
  ).isRequired,
  updateClock: PropTypes.func.isRequired,
  deleteClock: PropTypes.func.isRequired,
  localClock: PropTypes.shape({
    date: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
};

export default ClockList;
