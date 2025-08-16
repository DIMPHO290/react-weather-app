import React from "react";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";

interface ForecastProps {
  data?: {
    list?: any[];
  };
}

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  return (
    <>
      <div>Forecast</div>
      <DailyForecast data={data} />
      <HourlyForecast data={data} />
    </>
  );
};

export default Forecast;
