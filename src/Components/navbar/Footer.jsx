import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import { useTheme } from "../../hooks/useTheme";

const Footer = () => {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  // THEME BASED STYLES
  const footerClasses = `
    ${isDark
      ? "bg-gray-950 text-white border-gray-700 shadow-md"
      : "bg-white text-gray-800 border-gray-300 shadow-md"
    }
    pt-10 pb-6 border-t transition-colors duration-500
  `;

  const textClass = isDark ? "text-gray-400" : "text-gray-600";
  const hoverClass = isDark ? "hover:text-teal-500" : "hover:text-indigo-500";

  return (
    <footer className={footerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP SECTION */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b ${isDark ? "border-gray-800" : "border-gray-200"
            }`}
        >
          {/* BRAND */}
          <div className="flex flex-col space-y-2 md:items-start items-center">
            <div
              className={`${isDark ? "text-blue-400" : "text-blue-600"} text-3xl font-extrabold`}
            >
              Zentra
            </div>
            <p className={`text-sm ${textClass}`}>Your world, synchronized.</p>
          </div>

          {/* LINKS */}
          <div className="flex justify-center">
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 text-lg font-medium">
              {[
                { label: "Home", to: "/" },
                { label: "My Clocks", to: "/my-clock" },
                { label: "World Clocks", to: "/world-clocks" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`${textClass} ${hoverClass} transition`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL */}
          <div
            className={`flex justify-center md:justify-end space-x-6 text-2xl ${textClass}`}
          >
            {[faGithub, faLinkedin, faTwitter].map((icon, i) => (
              <Link key={i} to="#" className={hoverClass}>
                <FontAwesomeIcon icon={icon} />
              </Link>
            ))}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-6 text-center">
          <p className={`text-sm ${textClass}`}>
            © {new Date().getFullYear()} TrackingApp. All Rights Reserved.
            Designed & Developed by NazimUddin.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
