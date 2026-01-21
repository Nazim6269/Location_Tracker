import PropTypes from "prop-types";
import { useState } from "react";
import { useTheme } from "../../../hooks/useTheme";
import ClockForm from "../clock-form/ClockForm";

const ClockActions = ({
  local = false,
  clock,
  updateClock,
  createNewClock,
  deleteClock,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleClock = (value) => {
    createNewClock(value);
  };

  const bgLight = "bg-gray-50/60 border border-gray-200";
  const bgDark = "bg-gray-900 border border-gray-800";

  return (
    <div
      className={`
    ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
    border
    rounded-md px-3 py-3
    max-w-full mx-auto
    transition-all duration-300
  `}
    >
      {/* Action Buttons */}
      <div className="flex gap-2">
        {/* Update */}
        <button
          onClick={() => setIsEdit(!isEdit)}
          className={`
    flex-1 text-sm font-semibold py-2 rounded-md
    transition-all duration-300 select-none
    ${isDark
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
            }
    active:scale-95
  `}
        >
          {isEdit ? "Close" : "Update"}
        </button>

        {/* Add or Delete */}
        {local ? (
          <button
            onClick={() => setIsCreate(!isCreate)}
            className={`
    flex-1 text-sm font-semibold py-2 rounded-md
    transition-all duration-300 select-none
    ${isDark
                ? "bg-teal-600 hover:bg-teal-700 text-white"
                : "bg-teal-500 hover:bg-teal-600 text-white"
              }
    active:scale-95
  `}
          >
            {isCreate ? "Close" : "Add"}
          </button>
        ) : (
          <button
            onClick={() => deleteClock(clock.id)}
            className={`
    flex-1 text-sm font-semibold py-2 rounded-md
    transition-all duration-300 select-none
    ${isDark
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
              }
    active:scale-95
  `}
          >
            Delete
          </button>
        )}
      </div>

      {/* Edit Clock Form */}
      {isEdit && (
        <div
          className={`
        mt-3 p-3 rounded-md
        ${isDark
              ? "bg-gray-900 border border-gray-700"
              : "bg-gray-50 border border-gray-200"
            }
      `}
        >
          <h3
            className={`text-sm font-semibold mb-2 ${isDark ? "text-blue-400" : "text-blue-600"
              }`}
          >
            Edit
          </h3>

          <ClockForm
            handleClock={updateClock}
            title={!local}
            values={clock}
            edit
          />
        </div>
      )}

      {/* Create Clock Form */}
      {isCreate && (
        <div
          className={`
        mt-3 p-3 rounded-md
        ${isDark
              ? "bg-gray-900 border border-gray-700"
              : "bg-gray-50 border border-gray-200"
            }
      `}
        >
          <h3
            className={`text-sm font-semibold mb-2 ${isDark ? "text-teal-400" : "text-teal-600"
              }`}
          >
            Create
          </h3>

          <ClockForm handleClock={handleClock} />
        </div>
      )}
    </div>
  );
};

ClockActions.propTypes = {
  updateClock: PropTypes.func,
  createNewClock: PropTypes.func,
  deleteClock: PropTypes.func,
  clock: PropTypes.shape({
    date: PropTypes.objectOf(PropTypes.object),
    title: PropTypes.string,
    offset: PropTypes.number,
    type: PropTypes.string,
    id: PropTypes.string,
  }),
  local: PropTypes.bool,
};

export default ClockActions;
