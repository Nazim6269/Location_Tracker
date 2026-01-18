import PropTypes from "prop-types";
import useClock from "../../hooks/useClock";
import { useTheme } from "../../hooks/useTheme";
import useTimer from "../../hooks/useTimer";
import ClockActions from "../shared/clock-actions/ClockActions";
import ClockDisplay from "../shared/clock-display/ClockDisplay";

/**
 * LocalClock component displays the set local clock with its actions.
 */
const LocalClock = ({ clock, updateLocalClock, createNewClock }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Get current time and timezone info
  const { date, timezone, offset } = useClock(clock.timezone, clock.offset);
  const timer = useTimer(date);

  return (
    <div
      className={`
        relative overflow-hidden
        rounded-3xl p-8
        border transition-all duration-500
        ${isDark
          ? "bg-gray-800/40 border-gray-700/50 shadow-2xl backdrop-blur-xl"
          : "bg-white border-gray-200 shadow-xl hover:shadow-2xl"
        }
      `}
    >
      {/* Decorative background element */}
      <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-10 bg-gradient-to-br ${isDark ? "from-blue-500 to-teal-500" : "from-blue-400 to-indigo-400"}`} />

      <div className="relative z-10">
        {timer && (
          <ClockDisplay
            date={timer}
            timezone={timezone}
            offset={offset}
            title={clock.title}
            titleClass="text-2xl font-bold mb-2 tracking-tight"
            timeClass="text-5xl font-mono font-bold tracking-tighter"
          />
        )}

        <div
          className={`mt-8 pt-6 border-t ${isDark ? "border-gray-700/50" : "border-gray-100"
            }`}
        >
          <ClockActions
            local={true}
            clock={clock}
            updateClock={updateLocalClock}
            createNewClock={createNewClock}
          />
        </div>
      </div>
    </div>
  );
};

LocalClock.propTypes = {
  clock: PropTypes.shape({
    title: PropTypes.string,
    offset: PropTypes.number,
    timezone: PropTypes.string,
  }).isRequired,
  updateLocalClock: PropTypes.func.isRequired,
  createNewClock: PropTypes.func.isRequired,
};

export default LocalClock;
