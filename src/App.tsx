import React, { useEffect, useState } from "react";
import "./App.css";
import CurrentWeather from "./Component/SearchBar/CurrentWeather/CurrentWeather";
import DailyForecast from "./Component/SearchBar/ForecastWeather/DailyForecast";
import HourlyForecast from "./Component/SearchBar/ForecastWeather/HourlyForecast";
import SearchBar from "./Component/SearchBar/SearchBar/SearchBar";
import { fetchWeather } from "./FetchWeather";

interface SavedLocation {
  id: string;
  name: string;
}

const App: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [location, setLocation] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const getWeather = async (loc: string) => {
    if (!loc) return;
    const data = await fetchWeather(loc);
    if (data) {
      setWeather(data);
      setLocation(data.current.location);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const coords = `${latitude},${longitude}`;
          await getWeather(coords);
        },
        async () => {
          const fallback = "Polokwane";
          await getWeather(fallback);
        }
      );
    } else {
      const fallback = "Polokwane";
      getWeather(fallback);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("savedLocations");
    if (stored) {
      setSavedLocations(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
  }, [savedLocations]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSaveLocation = () => {
    if (!location) return;

    const newLocation: SavedLocation = {
      id: Date.now().toString(),
      name: location,
    };

    if (!savedLocations.some((loc) => loc.name === location)) {
      setSavedLocations([...savedLocations, newLocation]);
    }
  };

  const handleSelectLocation = (loc: SavedLocation) => {
    setSelectedLocationId(loc.id);
    getWeather(loc.name);
  };

  return (
    <div className="app-container">
      <div className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </div>

      <h1>Weather App</h1>
      <p className="subtitle">Real-time forecasts & global weather updates</p>

      <SearchBar
        text="Search"
        onChange={(e) => setLocation(e.target.value)}
        onClick={() => getWeather(location)}
        value={location}
      />

      <button className="save-location-btn" onClick={handleSaveLocation}>
        ⭐ Save Location
      </button>

      {savedLocations.length > 0 && (
        <div className="saved-locations">
          <h3>Saved Locations</h3>
          <ul>
            {savedLocations.map((loc) => (
              <li
                key={loc.id}
                className={`saved-location-item ${
                  selectedLocationId === loc.id ? "active" : ""
                }`}
                onClick={() => handleSelectLocation(loc)}
              >
                {loc.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {weather && <CurrentWeather data={weather.current} />}

      {weather?.dailyTemp && weather?.hourlyWeather && (
        <div className="forecast-row">
          <DailyForecast data={{ list: weather.dailyTemp }} />
          <HourlyForecast data={{ list: weather.hourlyWeather }} />
        </div>
      )}
    </div>
  );
};

export default App;
