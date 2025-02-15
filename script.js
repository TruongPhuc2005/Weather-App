const apiKey = "a31b0100caad260969034811667ab3ca";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&appid=" + apiKey;

async function fetchWeather(){
    const respone = await fetch(apiUrl);
    const data = await respone.json();
    console.log(data);
}

fetchWeather();