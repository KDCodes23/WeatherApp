🌤️ Simple Weather App Project
Welcome to the Simple Weather App! This project is part of a journey to build practical web applications with core web technologies. This app is built using HTML5, CSS3, and JavaScript, along with the Open-Meteo API to display live weather information.

📅 Project Log
Day X - Project: Weather App (HTML, CSS, JavaScript)
For today’s project, I created a weather app that lets users search for the current weather in any city, showing details like temperature, humidity, and wind speed.

Project Overview
Description:
The Weather App is a simple, interactive application that fetches and displays current weather data based on the user’s input city. It’s built with HTML5 for the layout, CSS3 for a clean and responsive design, and JavaScript to handle data fetching and UI updates.

Key Features
City Search: Users can type a city name to get real-time weather data.
Display Weather Details: Shows temperature, humidity, wind speed, and more for the searched city.
Hourly Forecast: Provides a quick 3-hour forecast for temperature, wind speed, and humidity.

Key Learnings
JavaScript Fetch API: Practiced using fetch to call the Open-Meteo API and handle asynchronous data.
DOM Manipulation: Dynamically updated the HTML to display weather data.
Responsive Design: Used CSS Flexbox to create a layout that adapts to different screen sizes and maintains usability on mobile devices.

Code Highlights
Here’s a snippet of JavaScript used to fetch and display the current weather data


```javascript
// Function to fetch and display weather data from Open-Meteo
async function getWeatherData(lat, lon) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const data = await response.json();
    displayWeather(data);
}

// Display weather information in the DOM
function displayWeather(data) {
    const currentWeather = data.current_weather;
    document.getElementById("weather-result").innerHTML = `
        <p><strong>Temperature:</strong> ${currentWeather.temperature} °C</p>
        <p><strong>Wind Speed:</strong> ${currentWeather.windspeed} m/s</p>
    `;
}

```

Challenges
Handling invalid city names and displaying appropriate error messages.
Ensuring responsive and consistent styling across different devices and screen sizes.
