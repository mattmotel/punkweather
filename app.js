

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
            if (currentTempFahrenheit > 55  ) {
                // HTML block for temperature greater than 55°F
                htmlContent = `

                <div
                class="bg-cover fixed z-10 top-0 w-full p-4 text-center"
                style="
                height:100vh;
                background-image:url(assets/photo-1447601932606-2b63e2e64331.jpeg);
                ">
                <div class="shadow-lg rounded-full bg-white p-16 max-w-md mx-auto">
                <img src="assets/no-noun-hoodie-3400189.svg"/>
                </div>

                        <h1 class="text-4xl py-8 font-bold">No hoodie needed!</h1>
                        <small>Current Temperature: ${currentTempFahrenheit.toFixed(2)}°F / ${currentTempCelsius.toFixed(2)}°C</small><br/>
                        <small class="opacity-50">Hoodie icon by Hongoram from Noun Project (CC BY 3.0)</small>
                    </div>`;
            } else {
                // HTML block for temperature 55°F or less
                htmlContent = `


                <div
                class="bg-cover fixed z-10 top-0 w-full p-4 text-center"
                style="
                height:100vh;
                background-image:url(assets/photo-1519937010618-f8c8b7e135b7.jpeg);
                ">
                <div class="shadow-lg rounded-full bg-white p-16 max-w-md mx-auto">
                <img src="assets/noun-hoodie-3400189.svg"/>
                </div>

                        <h1 class="text-4xl py-8 font-bold">Put a hoodie on!</h1>
                        <small>Current Temperature: ${currentTempFahrenheit.toFixed(2)}°F / ${currentTempCelsius.toFixed(2)}°C</small><br/>
                        <small class="opacity-50">Hoodie icon by Hongoram from Noun Project (CC BY 3.0)</small>
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
