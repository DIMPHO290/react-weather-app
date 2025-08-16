import React from "react";
import "./DailyForecast.css";

interface DailyForecastProps {
  data?: {
    list?: any[];
  };
}

const WEEK_DAY = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DailyForecast: React.FC<DailyForecastProps> = ({ data }) => {
  const dayInWeek = new Date().getDay();
  const forecastDays = WEEK_DAY.slice(dayInWeek).concat(
    WEEK_DAY.slice(0, dayInWeek)
  );

  return (
    <div className="daily-forecast">
      <h2 className="daily-title">Daily</h2>
      <div className="daily-list">
        {(data?.list ?? []).map((item, idx) => (
          <div className="daily-item" key={`daily-${idx}`}>
            <img
              src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
              alt="Weather icon"
              className="daily-icon"
            />
            <label className="daily-day">{forecastDays[idx]}</label>
            <label className="daily-desc">{item.weather_description}</label>
            <label className="daily-temp">
              {Math.round(item?.temperature)} °C{" "}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;
