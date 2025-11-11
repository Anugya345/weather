const apikey = "c971f9a90e269b5960f5330b98842bdf";

const weatherDataEle = document.querySelector(".weather-data");
const cityNameEle = document.querySelector("#city-name");
const formEle = document.querySelector("form");
const imgIcon = document.querySelector(".icon");

formEle.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityNameEle.value.trim();
    if (cityValue) {
        getWeatherData(cityValue);
    } else {
        alert("Please enter a city name");
    }
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);
        console.log(`API Response Status: ${response.status} ${response.statusText}`);
        if (!response.ok) {
            throw new Error(`City not found or API error (${response.status})`);
        }
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert(error.message);
    }
}

function displayWeatherData(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, feels_like } = data.main;
    const { speed } = data.wind;

    document.querySelector(".temp").innerText = Math.floor(temp) + "°C";
    document.querySelector(".desc").innerText = description;
    document.querySelector(".details div:nth-child(1)").innerText = `Feels like: ${Math.floor(feels_like)}°C`;
    document.querySelector(".details div:nth-child(2)").innerText = `Humidity: ${humidity}%`;
    document.querySelector(".details div:nth-child(3)").innerText = `Wind speed: ${speed} m/s`;
    imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">`;
}

