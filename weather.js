// Weather CODES
const weatherCodes = {
    "0": { "main": "Clear sky", "description": "Haze" },
    "1": { "main": "Mainly clear", "description": "No clouds" },
    "2": { "main": "Partly cloudy", "description": "Sunny" },
    "3": { "main": "Overcast", "description": "Gloomy" },
    "45": { "main": "Fog", "description": "Mist" },
    "48": { "main": "Depositing rime fog", "description": "Frozen fog" },
    "51": { "main": "Drizzle", "description": "Light intensity" },
    "53": { "main": "Drizzle", "description": "Moderate intensity" },
    "55": { "main": "Drizzle", "description": "Dense intensity" },
    "56": { "main": "Freezing Drizzle", "description": "Light intensity" },
    "57": { "main": "Freezing Drizzle", "description": "Dense intensity" },
    "61": { "main": "Rain", "description": "Slight intensity" },
    "63": { "main": "Rain", "description": "Moderate intensity" },
    "65": { "main": "Rain", "description": "Heavy intensity" },
    "66": { "main": "Freezing Rain", "description": "Light intensity" },
    "67": { "main": "Freezing Rain", "description": "Dense intensity" },
    "71": { "main": "Snow fall", "description": "Slight intensity" },
    "73": { "main": "Snow fall", "description": "Moderate intensity" },
    "75": { "main": "Snow fall", "description": "Heavy intensity" },
    "77": { "main": "Snow grains", "description": "Snow pellets" },
    "80": { "main": "Rain showers", "description": "Slight intensity" },
    "81": { "main": "Rain showers", "description": "Moderate intensity" },
    "82": { "main": "Rain showers", "description": "Violent intensity" },
    "85": { "main": "Snow showers", "description": "Slight intensity" },
    "86": { "main": "Snow showers", "description": "Heavy intensity" },
    "95*": { "main": "Thunderstorm", "description": "Slight or moderate" },
    "96": { "main": "Thunderstorm", "description": "Slight hail" },
    "99*": { "main": "Thunderstorm", "description": "Heavy hail" }
};

// Define a mapping of weather main titles to corresponding image URLs
const weatherIcons = {
    "clear sky": "/images/weatheremoji/mainly-clear-48.png",
    "mainly clear": "/images/weatheremoji/mainly-clear-48.png",
    "partly cloudy": "/images/weatheremoji/partly-cloudy-48.png",
    "overcast": "/images/weatheremoji/overcast-48.png",
    "fog": "/images/weatheremoji/fog-64.png",
    "depositing rime fog": "/images/weatheremoji/frozen-fog-64.png",
    "drizzle": "/images/weatheremoji/rain-64.png",
    "freezing drizzle": "/images/weatheremoji/freezing-rain-64.png",
    "rain": "/images/weatheremoji/rain-64.png",
    "freezing rain": "/images/weatheremoji/freezing-rain-64.png",
    "snow fall": "/images/weatheremoji/snow-64.png",
    "snow grains": "/images/weatheremoji/snow-pellets-64.png",
    "rain showers": "/images/weatheremoji/rain-shower-64.png",
    "snow showers": "/images/weatheremoji/snow-shower-64.png",
    "thunderstorm": "/images/weatheremoji/thunderstorm-64.png"
    // Add more mappings as needed for other weather conditions
};



// Function to fetch geocoding and weather data
function fetchData(cityname) {
    const cityInput = cityname
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


                // Update HTML elements with the fetched data
                document.getElementById("cityName").textContent = cityName;
                document.getElementById("stateName").textContent = stateName;
                document.getElementById("countryCode").textContent = countryCode;

                const visbilityUrl = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=visibility,uv_index,temperature_2m,weathercode&forecast_days=1`;

                fetch(visbilityUrl)
                    .then(response => response.json())
                    .then(hourlyvisibiltyData => {
                        // console.log("VisibiltyData: ", hourlyvisibiltyData);



                        const uvIndexData = hourlyvisibiltyData.hourly.uv_index;

                        const interval = 3; // Define the interval in hours
                        const dataPerInterval = [];

                        for (let i = 0; i < uvIndexData.length; i += interval) {
                            const intervalData = uvIndexData.slice(i, i + interval);
                            dataPerInterval.push(intervalData);
                        }

                        console.log("dataPerInterval:  ", dataPerInterval);

                        const UV_averages = dataPerInterval.map(intervalData => {
                            const sum = intervalData.reduce((acc, value) => acc + value, 0);
                            return sum / intervalData.length;
                        });



                        // console.log("Averages for each interval:", UV_averages);
                        function UV_range(deg) {
                            if (range(1, 2).includes(deg)) {
                                document.getElementById("directions").textContent = "Low";
                            }
                            else if (range(3, 5).includes(deg)) {
                                document.getElementById("directions").textContent = "Moderate";
                            }
                            else if (range(6, 7).includes(deg)) {
                                document.getElementById("directions").textContent = "High";
                            }
                            else if (range(8, 10).includes(deg)) {
                                document.getElementById("directions").textContent = "Very high";
                            }
                            else if (range(10, 11).includes(deg)) {
                                document.getElementById("directions").textContent = "Extreme";
                            }

                        }

                        const currentHour = getCurrentVisibility(); // Get the current hour
                        const check = hourlyvisibiltyData.hourly.visibility[currentHour];
                        const visibility_km = customRoundoff(check / 1000);
                        // console.log("visibiltyhour: ", visibility_km);
                        document.getElementById("visibilityvalue").textContent = visibility_km;
                        // console.log("visibiltyhour: ", visibility_km);

                        function getCurrentVisibility() {
                            const currentTime = new Date(); // Get the current time
                            const currentHour = currentTime.getHours(); // Get the current hour (0-23)

                            return currentHour;
                        }
                        // console.log("testhour: ", currentHour);

                        getCurrentVisibility(); // Define visibility_km here

                        function customRoundoff(number) {
                            const decimalPart = number - Math.floor(number);
                            if (decimalPart > 0.5) {
                                return Math.round(number);
                            } else {
                                return Math.floor(number);
                            }
                        }
                    });


                const queryUrl = "api.openweathermap.org/data/2.5/forecast?";
                const w_iconUrl = `api.openweathermap.org/data/2.5/weather?q=${cityName}`;

                const apiKey = "dbb76c5d98d5dbafcb94441c6a10236e";
                function fetchWeatherData1(w_iconUrl) {
                    // const url = `${queryUrl}q=${city}&appid=${apiKey}`;
                    fetch(w_iconUrl)
                        .then((response) => response.json())
                        .then((data) => {
                            // console.log("Fetched Weather icon Data:", data);
                        });
                };

                fetchWeatherData1(w_iconUrl);

                const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relativehumidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weathercode,cloudcover,pressure_msl,surface_pressure,windspeed_10m,winddirection_10m,windgusts_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto`;
                // const wiconUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
                const dwUrl = `api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=7&appid=${apiKey}`;
                fetch(apiUrl)
                    .then(response => response.json())

                    .then(weatherData => {
                        // console.log("weather data display: ", weatherData);
                        // You can handle and display weather data here
                        // Inside your fetch callback, after receiving the weather data
                        const weatherCode = weatherData.current.weathercode;

                        // Check if the weather code exists in the dictionary
                        if (weatherCodes[weatherCode]) {
                            const weatherInfo = weatherCodes[weatherCode];
                            const weatherInfotitle = weatherInfo.main;
                            document.getElementById("maintitle").textContent = weatherInfotitle;
                            document.getElementById("destitle").textContent = weatherInfo.description;


                            fetch(dwUrl)
                                .then(response => response.json())
                                .then(weathericonData => {
                                    // const wIconCode = weathericonData.weather[0].icon;
                                    // const imageCodeUrl = `https://openweathermap.org/img/wn/${wIconCode}.png`
                                    // const weather_icn = document.getElementById("weather_icn");
                                    // weather_icn.src = imageCodeUrl;
                                    // console.log("weathericonData: ",imageCodeUrl )
                                    console.log("dailyweatherData: ", weathericonData)
                                });
                            q1
                        } else {
                            // console.log("Code not found in dictionary");
                        }

                        function customRound(number) {
                            const decimalPart = number - Math.floor(number);
                            if (decimalPart > 0.5) {
                                return Math.round(number);
                            } else {
                                return Math.floor(number);
                            }
                        }

                        const currentTemperature = customRound(weatherData.current.temperature_2m);
                        const feelsLikeTemperature = customRound(weatherData.current.apparent_temperature);
                        document.getElementById("temptitle").textContent = currentTemperature;
                        document.getElementById("feels_deg").textContent = feelsLikeTemperature;
                        const relativeHumidity = weatherData.current.relativehumidity_2m;
                        document.getElementById("humidityvalue").textContent = relativeHumidity;
                        const windspeed = customRound(weatherData.current.windspeed_10m);
                        document.getElementById("windspeedvalue").textContent = windspeed;
                        const winddirection = weatherData.current.winddirection_10m;
                        w_directions(winddirection)
                        function w_directions(deg) {
                            if (deg === 0) {
                                document.getElementById("directions").textContent = "North";
                            }
                            else if (range(0, 45).includes(deg)) {
                                document.getElementById("directions").textContent = "North-East";
                            }
                            else if (range(45, 90).includes(deg)) {
                                document.getElementById("directions").textContent = "North-East";
                            }
                            else if (deg === 90) {
                                document.getElementById("directions").textContent = "East";
                            }
                            else if (range(90, 135).includes(deg)) {
                                document.getElementById("directions").textContent = "South-East";
                            }
                            else if (range(135, 180).includes(deg)) {
                                document.getElementById("directions").textContent = "South-East";
                            }
                            else if (deg === 180) {
                                document.getElementById("directions").textContent = "South";
                            }
                            else if (range(180, 225).includes(deg)) {
                                document.getElementById("directions").textContent = "South-West";
                            }
                            else if (range(225, 270).includes(deg)) {
                                document.getElementById("directions").textContent = "South-West";
                            }
                            else if (deg === 270) {
                                document.getElementById("directions").textContent = "West";
                            }
                            else if (range(270, 315).includes(deg)) {
                                document.getElementById("directions").textContent = "North-West";
                            }
                            else if (range(315, 360).includes(deg)) {
                                document.getElementById("directions").textContent = "North-West";
                            }
                        }
                        const isDay = weatherData.current.is_day;
                        const riseTime = weatherData.daily.sunrise[0];
                        const setTime = weatherData.daily.sunset[0];

                        // console.log("cuurenttemp: ", currentTemperature)


                        // Split date and time for sunrise
                        const riseDateTimeParts = riseTime.split('T'); // Split at the 'T' character
                        const r_Date = riseDateTimeParts[0];
                        const r_Time = riseDateTimeParts[1];

                        // Split date and time for sunset
                        const setDateTimeParts = setTime.split('T');
                        const s_Date = setDateTimeParts[0];
                        const s_Time = setDateTimeParts[1];

                        function convertToAMPM(timeString) {
                            // Split the time into hours and minutes
                            const [hours, minutes] = timeString.split(':').map(Number);

                            // Determine AM or PM
                            const period = hours >= 12 ? 'pm' : 'am';

                            // Convert hours to 12-hour format
                            const hours12 = hours % 12 || 12;

                            // Create the formatted time string
                            const formattedTime = `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;

                            return formattedTime;
                        }

                        const formattedRiseTime = convertToAMPM(r_Time);
                        const formattedSetTime = convertToAMPM(s_Time);

                        // Data passing to html

                        document.getElementById("r_time").textContent = formattedRiseTime;
                        document.getElementById("s_time").textContent = formattedSetTime;

                        const pressure = customRound(weatherData.current.pressure_msl);
                        document.getElementById("pressurevalue").textContent = pressure;


                        // range function
                        function range(start, end, step = 1) {
                            if (step === 0) {
                                throw new Error("Step cannot be zero.");
                            }

                            if (start > end && step > 0) {
                                return [];
                            }

                            const result = [];
                            for (let i = start; i < end; i += step) {
                                result.push(i);
                            }

                            return result;
                        }

                    })
                    .catch(error => {
                        // console.error('Error fetching weather data:', error);
                    });



                // Display geocoding information in the console or on the webpage
                // console.log(`location: ${cityName}, ${stateName}, ${countryCode}`);
                // console.log(`Population: ${population}`);
                // console.log(`Timezone: ${timezone}`);
                // console.log(`Coordinates: ${latitude}, ${longitude}`);
            } else {
                console.log('No results found.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Event listener for form submission
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form');
    const cityInput = document.getElementById('cityInput');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form submission
        const cityname = cityInput.value.trim();
        fetchData(cityname); // Fetch data with the entered city name
    });

    cityInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            const cityname = cityInput.value.trim();
            fetchData(cityname); // Fetch data with the entered city name when Enter key is pressed
        }
    });
});
// Add an event listener to trigger data fetching when the form is submitted
// fetchData("bhusaval");
// document.getElementById("searchicon").addEventListener("click", fetchData);