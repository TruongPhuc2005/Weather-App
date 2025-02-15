const apiKey = "a31b0100caad260969034811667ab3ca";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&appid=" + apiKey;

async function fetchWeather(){
    const city = document.getElementById("city").value;
    if(!city){
        aleart("Please enter a city name");
        return;
    }
    try{
        const respone = await fetch(apiUrl + city + "&appid=" + apiKey);
        const data = await respone.json();
        if(data.cod === "404"){
            aleart("City not found");
            return;
        }
        document.getElementById("city-Name").innerText = data.name;
        document.getElementById("temperature").textContent = `Temp: ${data.main.temp}°C`;
        document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;
        document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} km/h`;
    }  catch(error){
        console.log("Error fetching data", error);
    }
   
}

function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
            );
            const data = await response.json();
            document.getElementById("city-name").textContent = data.name;
            document.getElementById("temperature").textContent = `Temp: ${data.main.temp}°C`;
            document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;
            document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
            document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} km/h`;
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

window.onload = getLocationWeather;
async function fetchForecast() {
    const city = document.getElementById("city").value;
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();

    let forecastHTML = "<h3>5-Day Forecast</h3>";
    for (let i = 0; i < data.list.length; i += 8) {
        forecastHTML += `
            <div>
                <p>${data.list[i].dt_txt.split(" ")[0]}</p>
                <p>🌡️ ${data.list[i].main.temp}°C</p>
                <p>${data.list[i].weather[0].description}</p>
            </div>
        `;
    }

    document.getElementById("forecast").innerHTML = forecastHTML;
}

function toggleDarkMode() {
   document.body.classList.toggle("dark-mode");
}
