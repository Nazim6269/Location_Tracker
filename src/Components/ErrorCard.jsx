import PropTypes from "prop-types";
import { useTheme } from "../hooks/useTheme";

const ErrorCard = ({ message }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div
      className={`rounded-md p-5 shadow-md border 
        ${isDark
          ? "bg-red-500/10 text-red-400 border-red-500/20"
          : "bg-red-50 text-red-600 border-red-200"
        }`}
    >
      <h3 className="font-semibold mb-2">⚠️ Error</h3>
      <p className="text-sm">{message}</p>
    </div>
  );
};

// defining prop types
ErrorCard.propTypes = {
  message: PropTypes.string,
};

export default ErrorCard;
