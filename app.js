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
      const currentTempFahrenheit = currentTempCelsius * 9 / 5 + 32;

      const isTemperatureAbove55 = currentTempFahrenheit > 1;
      const backgroundImg = isTemperatureAbove55 ?
        "assets/photo-1447601932606-2b63e2e64331.jpeg" // hot
        :
        "assets/photo-1519937010618-f8c8b7e135b7.jpeg";
      const hoodieIcon = isTemperatureAbove55 ?
        "assets/no-hoodie.svg" //hot
        :
        "assets/yes-hoodie.svg";
      const hoodieText = isTemperatureAbove55 ? "You don’t need a hoodie!" : "Put a hoodie on!";
      const hoodiePromo = isTemperatureAbove55 ?
        "No, you don’t need a hoodie. But that’s never stopped you from <a class='underline' href='https://hardshoppes.com/products/the-hard-times-logo-hoodie' target='_blank'> buying one. Go for it!</a>" //hot
        :
        "Yes, you need a hoodie, preferably a vintage Bane hoodie that someone on eBay tricked you into spending $2,500 on. <a class='underline' href='https://hardshoppes.com/products/the-hard-times-logo-hoodie'  target='_blank'>Or maybe this one</a>.";


      const htmlContent = `
              <div class="bg-cover bg-gray-50 fixed z-10 left-0 top-0 w-full p-4 text-center text-black"
                style="height:100vh; background-image:url(${backgroundImg});">
                <h1 class="text-4xl py-8 font-bold">${hoodieText}</h1>
                <div class="button-1 p-8 max-w-md mx-auto">
                  <img src="${hoodieIcon}" class="w-42 h-42"/>
                </div>
                <div class="my-8 px-6 py-4 text-sm bg-white rounded-xl max-w-md mx-auto">
                ${hoodiePromo}
              </div>
                <p><small>Current Temperature: ${currentTempFahrenheit.toFixed(2)}°F / ${currentTempCelsius.toFixed(2)}°C</small></p>

              </div>
            `;

      document.getElementById('weather').innerHTML = htmlContent;
    })
    .catch(error => {
      document.getElementById('weather').innerHTML = "Unable to retrieve weather data.";
    });
}


function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      document.getElementById('weather-message').innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      document.getElementById('weather-message').innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      document.getElementById('weather-message').innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      document.getElementById('weather-message').innerHTML = "An unknown error occurred."
      break;
  }
}
