const apiKey = "a31b0100caad260969034811667ab3ca";

async function fetchWeather() {
    const cityInput = document.getElementById("city");
    const city = cityInput.value.trim();

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === "404") {
            alert("City not found. Try again.");
            return;
        }

        document.getElementById("city-name").textContent = data.name;
        document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;
        document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} km/h`;

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Could not fetch weather data. Please try again.");
    }
}

document.getElementById("search-button").addEventListener("click", fetchWeather);

async function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
                );
                const data = await response.json();

                document.getElementById("city-name").textContent = data.name;
                document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
                document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;
                document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
                document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} km/h`;

            } catch (error) {
                console.error("Error fetching location weather", error);
                alert("Could not fetch location weather.");
            }
        }, (error) => {
            console.error("Geolocation error", error);
            alert("Geolocation is not enabled. Please allow location access.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

window.onload = getLocationWeather;

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

