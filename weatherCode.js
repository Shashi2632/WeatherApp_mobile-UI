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

// Export the weatherCodes dictionary

export {weatherCodes};
// // Accessing values by key
// console.log(weatherCodes["51"]); // Output: { main: 'Drizzle', description: 'Light intensity' }
// console.log(weatherCodes["77"]); // Output: { main: 'Snow grains', description: 'undefined' }

// // Import the weatherCodes dictionary from the other file
// import weatherCodes from './weatherCodes';

// // Access and use the values from the dictionary
// const code = "51"; // Example code
// const weatherInfo = weatherCodes[code];

// if (weatherInfo) {
//     console.log("Main:", weatherInfo.main); // Output: "Drizzle"
//     console.log("Description:", weatherInfo.description); // Output: "Light intensity"
// } else {
//     console.log("Code not found in dictionary");
// }
