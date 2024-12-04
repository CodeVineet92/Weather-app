import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState(""); // To store user input
  const [weather, setWeather] = useState(null); // To store weather data
  const [error, setError] = useState(""); // To store error messages

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    setError(""); // Clear previous errors
    try {
      const apiKey = "4a120748a49018c2099cf74067339f08"; // Replace with your OpenWeatherMap API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found or invalid API key");
      }
      const data = await response.json();
      setWeather({
        name: data.name,
        temp: data.main.temp,
        description: data.weather[0].description,
      });
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <h1>Simple Weather App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.temp}°C</p>
          <p>Condition: {weather.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
