// src/components/AddNewWeather.jsx
import { useState, useMemo } from "react";
import Select from "react-select";
import { getTimeZones } from "@vvo/tzdb";
import { useTheme } from "../hooks/useTheme";
const AddNewWeather = ({ onAdd }) => {
  const [selected, setSelected] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Reuse timezone DB to extract cities
  const cityOptions = useMemo(() => {
    const seen = new Set();

    return getTimeZones({ includeUtc: false })
      .flatMap((tz) =>
        (tz.mainCities || []).map((city) => ({
          value: city,
          label: city,
        }))
      )
      .filter((opt) => {
        if (seen.has(opt.value)) return false;
        seen.add(opt.value);
        return true;
      })
      .sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const handleAdd = () => {
    if (!selected) return;

    onAdd({
      id: Date.now() + Math.random(),
      city: selected.value,
    });

    setSelected(null);
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: isDark ? "#1f2937" : "#f9fafb",
      borderColor: isDark ? "#4b5563" : "#d1d5db",
      color: isDark ? "#f3f4f6" : "#111827",
      boxShadow: "none",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDark ? "#1f2937" : "#ffffff",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? isDark
          ? "#4f46e5"
          : "#6366f1"
        : state.isFocused
          ? isDark
            ? "#374151"
            : "#f3f4f6"
          : "transparent",
      color: isDark ? "#f3f4f6" : "#111827",
    }),
    singleValue: (base) => ({
      ...base,
      color: isDark ? "#f3f4f6" : "#111827",
    }),
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end mb-6">
      <div className="flex-1 min-w-[280px] md:min-w-[360px]">
        <label
          className={`block mb-1.5 text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"
            }`}
        >
          Add city for weather
        </label>

        <Select
          value={selected}
          onChange={setSelected}
          options={cityOptions}
          placeholder="Search city..."
          isSearchable
          styles={customStyles}
          noOptionsMessage={() => "No city found"}
        />
      </div>

      <button
        onClick={handleAdd}
        disabled={!selected}
        className={`
          px-6 py-3 rounded-md font-semibold text-white
          transition-all min-w-[120px]
          disabled:opacity-50 disabled:cursor-not-allowed
          ${isDark
            ? "bg-blue-600 hover:bg-blue-700 shadow-md"
            : "bg-blue-600 hover:bg-blue-700 shadow-md"
          }
        `}
      >
        Add City
      </button>
    </div>
  );
};


export default AddNewWeather;