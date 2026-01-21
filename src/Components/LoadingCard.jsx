import PropTypes from "prop-types";
import { useTheme } from "../hooks/useTheme";

const LoadingCard = ({ text }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`rounded-md p-5 border animate-pulse 
        tracking-widest uppercase text-sm
        ${isDark
          ? "bg-gray-800 text-gray-300 border-gray-700"
          : "bg-white text-gray-600 border-gray-200 shadow-sm"
        }`}
    >
      {text}
    </div>
  );
};

LoadingCard.propTypes = {
  text: PropTypes.string,
};

export default LoadingCard;
