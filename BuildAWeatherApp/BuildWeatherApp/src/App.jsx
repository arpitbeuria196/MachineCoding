import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const API_KEY = "52e00cb5328d27bb1115e08357f0e340";
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    const t = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(t);
  }, [city]);

  const fetchData = async () => {
    if (!city) {
      console.log("City is empty");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod !== 200) {
        console.error("API Error:", data.message);
        setWeatherData(null);
        return;
      }

      setWeatherData(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-sky-300 to-cyan-300 px-4 py-10 text-white font-sans">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">🌤️ Weather App</h1>
        <p className="text-lg text-white/80">Search your city to see the current weather!</p>
      </div>

      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="px-4 py-2 text-black text-lg rounded-xl w-full max-w-md border-2 border-white shadow-md outline-none focus:ring-4 focus:ring-white/30 transition-all"
      />

      {weatherData && (
        <div className="mt-10 bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-3">{weatherData.name}</h2>
          <p className="text-xl mb-2">🌡️ Temperature: <span className="font-medium">{weatherData.main.temp}°C</span></p>
          <p className="text-lg">🌥️ Condition: <span className="capitalize">{weatherData.weather[0].description}</span></p>
        </div>
      )}
    </div>
  );
}

export default App;
