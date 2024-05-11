const queryUrl = "https://api.openweathermap.org/data/2.5/forecast?";
const apiKey = "dbb76c5d98d5dbafcb94441c6a10236e"; // Replace with your actual API key

// Function to fetch weather data
function fetchWeatherData(city) {
    const url = `${queryUrl}q=${city}&appid=${apiKey}&cnt=8`;

    // Make the API request
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log("Fetched Weather Data:", data);
            const formattedDataList = data.list.map(item => {
                // Extract the date-time string
                const dt_txt = item.dt_txt;

                // Parse the date-time string into a Date object
                const dateTime = new Date(dt_txt);

                // Extract hours
                const hours = dateTime.getHours();

                // Determine AM or PM
                const amPm = hours >= 12 ? 'pm' : 'am';

                // Convert to 12-hour format
                const formattedHours = hours % 12 || 12; // Ensure 12:00 PM instead of 0:00 PM

                // Create the formatted time string
                const formattedTime = `${formattedHours} ${amPm}`;

                // Extract other data
                const temp = customRound(item.main.temp - 273.15);
                const icon = item.weather[0].icon;

                // Create a dictionary for this item
                const dataDict = {
                    temp: temp,
                    icon: icon,
                    time: formattedTime,
                };

                return dataDict;
            });

            console.log("hourlyData: ", formattedDataList);

            // Determine the current hour
            const currentTime = new Date();
            const currentHour = currentTime.getHours();
            const container = document.querySelector(".row1");

            let closestDiv = null;
            let closestTimeDifference = Infinity;
            formattedDataList.forEach(dataDict => {
                // Extract data from the dictionary
                const temp = dataDict.temp;
                const icon = dataDict.icon;
                const time = dataDict.time;

                // Split the time format into hours and AM/PM
                const [hour, ampm] = time.split(' ');

                // Map AM/PM to a 24-hour clock equivalent
                const ampmTo24Hour = { 'am': 0, 'pm': 12 };
                const divHour = parseInt(hour) + ampmTo24Hour[ampm];

                // Calculate the time difference in hours
                const timeDifference = divHour - currentHour;

                // Create the div elements
                const div = document.createElement("div");
                div.className = "col1";
                div.style.width = "12%";

                const timeSpan = document.createElement("span");
                timeSpan.className = "nowtxt";
                timeSpan.id = "todays_time";
                timeSpan.textContent = time;

                const imageUrl = `https://openweathermap.org/img/wn/${icon}.png`;
                const img = document.createElement("img");
                img.src = imageUrl;

                const tempSpan = document.createElement("span");
                tempSpan.className = "nowtxt";
                tempSpan.id = "todays_temp";
                tempSpan.innerHTML = `${temp}&deg;`;

                // Check if the time of the div is closer to the current hour
                if (timeDifference >= 0 && timeDifference < closestTimeDifference) {
                    // Update the closest div
                    closestDiv = div;
                    closestTimeDifference = timeDifference;
                }

                // Append elements to the div
                div.appendChild(timeSpan);
                div.appendChild(img);
                div.appendChild(tempSpan);

                // Add a span element for separation
                const separationSpan = document.createElement("span");
                separationSpan.style.border = "1px solid rgba(225, 225, 225, 0.3)";
                separationSpan.style.marginInline = "1rem";

                // Append the div to the container
                container.appendChild(div);
                container.appendChild(separationSpan);
            });
            // Highlight the closest div
            if (closestDiv) {
                closestDiv.classList.add("current-hour");
            }

        });

    function customRound(number) {
        const decimalPart = number - Math.floor(number);
        if (decimalPart > 0.5) {
            return Math.round(number);
        } else {
            return Math.floor(number);
        }
    }
}

fetchWeatherData("pune");