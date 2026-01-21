import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useTheme } from "../../hooks/useTheme";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  const navClasses = `
    ${isDark ? "bg-gray-950 border-gray-700" : "bg-white border-gray-200"}
    border-b shadow transition-colors duration-300
  `;

  const textColor = isDark ? "text-gray-300" : "text-gray-800";
  const hoverColor = isDark ? "hover:text-teal-500" : "hover:text-indigo-500";

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <h1
            className={`${isDark ? "text-blue-400" : "text-blue-600"
              } text-3xl font-extrabold`}
          >
            <NavLink to="/">Zentra</NavLink>
          </h1>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex space-x-8 items-center text-lg font-medium">
            {/* THEME TOGGLE */}
            <li
              onClick={toggleTheme}
              className="cursor-pointer text-xl"
              title="Toggle Theme"
            >
              {isDark ? (
                <FontAwesomeIcon icon={faSun} className="text-yellow-400" />
              ) : (
                <FontAwesomeIcon icon={faMoon} className="text-gray-700" />
              )}
            </li>

            {/* LINKS */}
            <li>
              <NavLink
                to="/world-clocks"
                className={`${textColor} ${hoverColor} transition`}
              >
                World Clocks
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/earthquake"
                className={`${textColor} ${hoverColor} transition`}
              >
                Earthquake
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/my-clock"
                className={`${textColor} ${hoverColor} transition`}
              >
                My Clock
              </NavLink>
            </li>
          </ul>

          {/* MOBILE BUTTON */}
          <button
            className={`md:hidden p-2 rounded-md ${textColor} focus:ring-2 focus:ring-teal-400`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? "max-h-56" : "max-h-0"
          }`}
      >
        <ul
          className={`${isDark ? "bg-gray-900" : "bg-white"} border-t ${isDark ? "border-gray-700" : "border-gray-200"
            } space-y-2 p-4`}
        >
          {["/", "/my-clock", "/contact"].map((path, i) => {
            const labels = ["Home", "My Clocks", "Contact"];
            return (
              <li key={i}>
                <Link
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`block p-2 rounded ${textColor} hover:bg-teal-100 dark:hover:bg-gray-800`}
                >
                  {labels[i]}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
