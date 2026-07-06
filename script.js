document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const WeatherBtn = document.getElementById("weather-btn");
  const Weather = document.getElementById("weather-info");
  const temperature = document.getElementById("temperature");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("wind-speed");
  const pressure = document.getElementById("pressure");
  const visibilityDisplay = document.getElementById("visibility");
  const cityName = document.getElementById("city-name");
  const countryName = document.getElementById("country-name");
  const errorMessage = document.getElementById("error-message");
  const weatherDescription = document.getElementById("weather-description");
  const weatherIcon = document.getElementById("weather-icon");

  
  const API_KEY = "OPENWEATHER_API_KEY";
  
  WeatherBtn.addEventListener("click", async () => {
      const city = cityInput.value.trim();
      if (!city) return;
      
      try {
          const weatherData = await fetchWeatherData(city);
          displayWeatherData(weatherData);
        } catch (error) {
            console.error(error);
            showError();
        }
    });
    
    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("City not found");
        }
        
        const data = await response.json();
        return data;
    }
    
    function displayWeatherData(data) {
        const { name, main, weather, wind, visibility, sys } = data;
        temperature.textContent = `${main.temp}°C`;
        humidity.textContent = `${main.humidity}%`;
        windSpeed.textContent = `${wind.speed} m/s`;
        pressure.textContent = `${main.pressure} hPa`;
        visibilityDisplay.textContent = `${visibility / 1000} km`;
        cityName.textContent = name;
        weatherDescription.textContent = weather[0].description;
        countryName.textContent = sys.country;
        weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
        
        // Unlocking the display
        Weather.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    }
    
    function showError() {
        Weather.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
    
});
