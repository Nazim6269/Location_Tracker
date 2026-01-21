import PropTypes from "prop-types";
import { useTheme } from "../hooks/useTheme";

export const Info = ({ label, value }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`
    rounded-md p-2 text-center border
    ${isDark
          ? "bg-gray-700 border-gray-600 text-white"
          : "bg-gray-50 border-gray-100 text-gray-900 shadow-sm"
        }
    transition-colors duration-300
  `}
    >
      <p className="text-xs opacity-70">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
};

Info.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};
