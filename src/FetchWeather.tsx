import axios from "axios";
import { WEATHER_API_KEY } from "./api";

export const fetchWeather = async (searchData: string | null) => {
  if (!searchData) return null;

  try {
    const geoResponse = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${searchData}&limit=1&appid=${WEATHER_API_KEY}`
    );
    const geoResult = geoResponse.data?.[0];
    if (!geoResult) throw new Error("Location not found");

    const { lat, lon, name } = geoResult;

    const forecastFetch = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastData = forecastFetch.data?.list;
    if (!forecastData?.length) throw new Error("No forecast data");

    const currentWeatherData = forecastData[0];
    const current = {
      location: name,
      temperature: currentWeatherData.main.temp,
      temperature_min: currentWeatherData.main.temp_min,
      temperature_max: currentWeatherData.main.temp_max,
      wind_speed: currentWeatherData.wind.speed,
      weather_description: currentWeatherData.weather?.[0]?.description,
      icon: currentWeatherData.weather?.[0]?.icon,
      date: new Date(currentWeatherData.dt * 1000).toLocaleString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        day: "numeric",
        month: "short",
      }),
      humidity: currentWeatherData.main.humidity,
    };

    const hourlyWeather = forecastData.slice(1, 9).map((weather: any) => ({
      temperature: weather.main.temp,
      temperature_min: weather.main.temp_min,
      temperature_max: weather.main.temp_max,
      wind_speed: weather.wind.speed,
      weather_description: weather.weather?.[0]?.description,
      icon: weather.weather?.[0]?.icon,
      date: new Date(weather.dt * 1000).toLocaleString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      humidity: weather.main.humidity,
    }));

    const daily: Record<string, any> = {};
    forecastData.forEach((weather: any) => {
      const day = new Date(weather.dt * 1000).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      });
      if (!daily[day]) {
        daily[day] = {
          date: day,
          temperature: weather.main.temp,
          wind_speed: weather.wind.speed,
          weather_description: weather.weather?.[0]?.description,
          icon: weather.weather?.[0]?.icon,
          humidity: weather.main.humidity,
        };
      }
    });
    const dailyTemp = Object.values(daily).slice(0, 5);

    return { current, hourlyWeather, dailyTemp };
  } catch (err) {
    console.error(err);
    return null;
  }
};
