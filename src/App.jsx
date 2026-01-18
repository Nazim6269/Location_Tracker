import "leaflet/dist/leaflet.css";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Footer from "./Components/navbar/Footer";
import Navbar from "./Components/navbar/Navbar";
import { ThemeProvider } from "./context/theme-context";
import CustomClock from "./screens/CustomClock";
import EarthquakeDashboard from "./screens/EarthquakeDashboard";
import Home from "./screens/Home";
import WorldClocks from "./screens/WorldClocks";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="flex flex-col min-h-screen text-gray-900 dark:text-white transition-colors duration-500">
          {/* Navbar */}
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/my-clock" element={<CustomClock />} />
            <Route path="/world-clocks" element={<WorldClocks />} />
            <Route path="/earthquake" element={<EarthquakeDashboard />} />
          </Routes>

          {/* Footer */}
        </div>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
