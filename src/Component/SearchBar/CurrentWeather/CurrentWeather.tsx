import React from "react";
import "./CurrentWeather.css";

interface CurrentWeatherProps {
  data: any;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  return (
    <div className="current-weather-card">
      <h2 className="current-city"> {data?.location || "No city selected"}</h2>
      <p className="current-description">
        {" "}
        {data?.weather_description || "No description available"}
      </p>
      <p className="current-temp">{Math.round(data?.temperature)}°C</p>

      <h3 className="details-title">Details</h3>
      <div className="weather-details">
        <div className="detail-row">
          <span>Wind</span>
          <span>{data?.wind_speed} m/s</span>
        </div>
        <div className="detail-row">
          <span>Humidity</span>
          <span>{data?.humidity}%</span>
        </div>
      </div>

      <img
        className="weather-icon"
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt="Weather icon"
      />
    </div>
  );
};

export default CurrentWeather;
