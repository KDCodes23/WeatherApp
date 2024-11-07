const apiKey = "YOUR_OPENWEATHER_API_KEY";  // Replace with your OpenWeather API key
const getWeatherBtn = document.getElementById("get-weather-btn");
const cityInput = document.getElementById("city-input");
const weatherResult = document.getElementById("weather-result");

// Function to fetch weather data from Open-Meteo API
async function getWeatherData(lat, lon) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherResult.innerHTML = `<p class="weather-item error">Failed to fetch weather data: ${error.message}</p>`;
    }
}

// Function to get city coordinates from OpenWeather API
async function getCoordinates(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        if (!response.ok) throw new Error("City not found");
        
        const data = await response.json();
        const { lat, lon } = data.coord;
        getWeatherData(lat, lon);  // Fetch weather data using the coordinates
    } catch (error) {
        weatherResult.innerHTML = `<p class="weather-item error">${error.message}</p>`;
    }
}

// Function to display weather data from Open-Meteo API
function displayWeather(data) {
    const currentWeather = data.current_weather;
    const hourly = data.hourly;

    // Display current weather
    weatherResult.innerHTML = `
        <p class="weather-item"><strong>Temperature:</strong> ${currentWeather.temperature} °C</p>
        <p class="weather-item"><strong>Wind Speed:</strong> ${currentWeather.windspeed} m/s</p>
        <p class="weather-item"><strong>Time:</strong> ${currentWeather.time}</p>
    `;

    // Display hourly forecast (showing the first 3 hours as an example)
    const hourlyData = hourly.time.slice(0, 3).map((time, index) => `
        <div class="hourly-forecast">
            <p><strong>Hour:</strong> ${time}</p>
            <p>Temperature: ${hourly.temperature_2m[index]} °C</p>
            <p>Humidity: ${hourly.relative_humidity_2m[index]}%</p>
            <p>Wind Speed: ${hourly.wind_speed_10m[index]} m/s</p>
        </div>
    `).join("");
    
    weatherResult.innerHTML += `<h3>Hourly Forecast (Next 3 Hours):</h3>${hourlyData}`;
}

// Event listener for button click
getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getCoordinates(city);  // Fetch coordinates for the city
    } else {
        weatherResult.innerHTML = `<p class="weather-item error">Please enter a city name.</p>`;
    }
});
