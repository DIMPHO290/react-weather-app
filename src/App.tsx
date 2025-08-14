// import { useState } from "react";
// import WeatherCard from "./Component/DisplayingWeather/WeatherCard";
// import SearchBar from "./Component/SearchBar/SearchBar";
// import { WeatherData } from "./weather";

// function App() {
//   const [weather, setWeather] = useState<WeatherData | null>(null);
//   const [unit, setUnit] = useState<"celsius" | "fahrenheit">("celsius");
//   const [theme, setTheme] = useState<"light" | "dark">("light");

//   const handleSearch = (location: string) => {
//     setWeather({
//       temperature: unit === "celsius" ? 13 : 55.4,
//       humidity: 64,
//       windSpeed: 2.57,
//       condition: "Clouds",
//       location: location,
//     });
//   };

//   return (
//     <div
//       className={`min-h-screen ${
//         theme === "dark" ? "bg-gray-900 text-white" : "bg-blue-50 text-gray-900"
//       }`}
//     >
//       <div className="container mx-auto p-4">
//         <h1 className="text-3xl font-bold text-center my-6">🌤️ Weather App</h1>

//         <SearchBar onSearch={handleSearch} />

//         {weather && <WeatherCard weather={weather} unit={unit} />}

//         <div className="flex justify-center gap-4 mt-8">
//           <button
//             onClick={() =>
//               setUnit((u) => (u === "celsius" ? "fahrenheit" : "celsius"))
//             }
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             °{unit === "celsius" ? "F" : "C"}
//           </button>

//           <button
//             onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
//             className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
//           >
//             {theme === "light" ? "🌙 Dark" : "☀️ Light"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import SearchBar from "./Component/SearchBar/SearchBar";

// Replace with your actual API key
// const API_KEY = "3248c0f9efd413ef87dc41c8cdd37a6b";
// const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=Polokwane&appid=3248c0f9efd413ef87dc41c8cdd37a6b`;
import React from "react";

const App: React.FC = () => {
  const handleSearchChange = (
    searchData: { label: string; value: string } | null
  ) => {
    console.log("Selected city:", searchData);
  };

  return (
    <>
      <h1>Weather App</h1>
      <SearchBar onSearchChange={handleSearchChange} />
    </>
  );
};

export default App;
