import ClockList from "../Components/clockList/ClockList";
import LocalClock from "../Components/localClock/LocalClock";
import { useClocksManager } from "../hooks/useClocksManager";
import { useTheme } from "../hooks/useTheme";

const CustomClock = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const {
    localClock,
    clocks,
    updateLocalClock,
    createClock,
    updateClock,
    deleteClock,
  } = useClocksManager();

  return (
    <div
      className={`
        flex flex-col flex-grow items-center gap-12 
        p-6 md:p-10 lg:p-16
        transition-colors duration-500
        ${isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-950 to-black"
          : "bg-gray-50 text-gray-900"
        }
      `}
    >
      <header className="max-w-7xl w-full text-center space-y-4">
        <h1 className={`${isDark
          ? "from-blue-500 to-teal-500"
          : "from-indigo-500 to-purple-500"
          } text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r `}
        >
          Personal Clock Dashboard
        </h1>
        <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
          Manage your local time and track multiple timezones across the globe with precision.
        </p>
      </header>

      <main className="flex flex-col lg:flex-row max-w-7xl w-full gap-10 items-start">
        {/* Local Clock Section */}
        <section className="w-full lg:w-1/3 sticky top-24">
          <div className="space-y-4">
            <h2 className={`text-xl font-bold uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              Local Time
            </h2>
            <LocalClock
              clock={localClock}
              updateLocalClock={updateLocalClock}
              createNewClock={createClock}
            />
          </div>
        </section>

        {/* World Clocks Section */}
        <section className="w-full lg:w-2/3">
          <div className="space-y-4">
            <h2 className={`text-xl font-bold uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              Tracked Timezones
            </h2>
            <ClockList
              clocks={clocks}
              updateClock={updateClock}
              deleteClock={deleteClock}
              localClock={localClock}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default CustomClock;
