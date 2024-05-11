
const cityInput = "pune"
const cityurl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}&count=1&language=en&format=json`;
// console.log(cityInput)
fetch(cityurl)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Request failed');
        }
    })
    .then(data => {
        // console.log(data);

        if (data.results && data.results.length > 0) {
            const cityData = data.results[0];
            const cityName = cityData.name;

            const stateName = cityData.admin1;
            const countryCode = cityData.country_code;
            const population = cityData.population;
            const latitude = cityData.latitude;
            const longitude = cityData.longitude;

            fetchWeatherData1(latitude, longitude);
        }
    });




function fetchWeatherData1(latitude, longitude) {
    const apiKey = "dbb76c5d98d5dbafcb94441c6a10236e";
    const w_iconUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=7&appid=${apiKey}`;
    // const url = `${queryUrl}q=${city}&appid=${apiKey}`;
    fetch(w_iconUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log("Fetched Daily Weather  Data:", data);
        });
};
