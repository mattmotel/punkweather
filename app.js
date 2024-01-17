

document.getElementById('getWeather').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather, showError);
    } else {
        document.getElementById('weather').innerHTML = "Geolocation is not supported by this browser.";
    }
});
function showWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Open-Meteo API URL for hourly temperature forecast
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Assuming you want the current temperature
            // Open-Meteo provides an array of hourly temperatures, so we take the first one for current temperature
            const currentTempCelsius = data.hourly.temperature_2m[0];
            const currentTempFahrenheit = currentTempCelsius * 9/5 + 32;

            let htmlContent;
            if (currentTempFahrenheit > 55) {
                // HTML block for temperature greater than 55°F
                htmlContent = `

                <div
                class="bg-cover"
                style="
                height:100vh;
                background:url(assets/photo-1447601932606-2b63e2e64331.jpeg);
                ">
                <div class="rounded-full bg-white p-24 max-w-lg mx-auto">
                <img src="assets/no-noun-hoodie-3400189.svg"/>
                </div>
                        <p>Current Temperature: ${currentTempFahrenheit.toFixed(2)}°F / ${currentTempCelsius.toFixed(2)}°C</p>
                        <p style="color: green;">It's warm outside, no hoodie needed!</p>
                    </div>`;
            } else {
                // HTML block for temperature 55°F or less
                htmlContent = `


                <div
                class="bg-cover"
                style="
                height:100vh;
                background:url(assets/photo-1519937010618-f8c8b7e135b7.jpeg);
                ">
                <div class="rounded-full bg-white p-24 max-w-lg mx-auto">
                <img src="assets/noun-hoodie-3400189.svg"/>
                </div>
                        <p>Current Temperature: ${currentTempFahrenheit.toFixed(2)}°F / ${currentTempCelsius.toFixed(2)}°C</p>
                        <p style="color: blue;">It's cool outside, consider a hoodie.</p>
                    </div>`;
            }

            document.getElementById('weather').innerHTML = htmlContent;
        })
        .catch(error => {
            document.getElementById('weather').innerHTML = "Unable to retrieve weather data.";
        });
}



function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('weather').innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('weather').innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            document.getElementById('weather').innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('weather').innerHTML = "An unknown error occurred."
            break;
    }
}
