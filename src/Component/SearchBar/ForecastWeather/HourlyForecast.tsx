import React from "react";
import "./HourlyForecast.css";

interface HourlyForecastProps {
  data?: {
    list?: any[];
  };
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data }) => {
  return (
    <div className="hourly-forecast">
      <h2 className="hourly-title">Hourly</h2>
      <div className="hourly-list">
        {data?.list?.slice(0, 8).map((item, idx) => (
          <div className="hourly-item" key={`hourly-${idx}`}>
            <label className="hourly-time">{item.date}</label>
            <label className="hourly-temp">
              {Math.round(item.temperature)} °C
            </label>
            <label className="hourly-desc">{item.weather_description}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
