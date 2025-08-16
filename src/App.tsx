import React, { useState } from "react";
import "../src/App.css";
import DailyForecast from "./Component/SearchBar/ForecastWeather/DailyForecast";
import HourlyForecast from "./Component/SearchBar/ForecastWeather/HourlyForecast";
import SearchBar from "./Component/SearchBar/SearchBar/SearchBar";
import { fetchWeather } from "./FetchWeather";

const App: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [location, setLocation] = useState("Polokwane");
  console.log(weather);
  const getWeather = async (loc: string) => {
    const data = await fetchWeather(loc);
    setWeather(data);
  };

  React.useEffect(() => {
    getWeather(location);
  }, []);

  return (
    <>
      <h1>Weather App</h1>
      <p className="subtitle">Real-time forecasts & global weather updates</p>
      <SearchBar
        text="Search"
        onChange={(e) => setLocation(e.target.value)}
        onClick={() => getWeather(location)}
        value={location}
      />

      {weather?.dailyTemp && weather?.hourlyWeather && (
        <div className="forecast-row">
          <DailyForecast data={{ list: weather.dailyTemp }} />
          <HourlyForecast data={{ list: weather.hourlyWeather }} />
        </div>
      )}
    </>
  );
};

export default App;
