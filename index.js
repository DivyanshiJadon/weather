// Select the necessary DOM elements
var inputvalue = document.querySelector('#cityinput');
var btn = document.querySelector('.search button');
var city = document.querySelector('.city');
var temp = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');
var weatherIcon = document.querySelector('.weather-icon');

// OpenWeatherMap API key
var apik = "9d3727b59e84b12d870d02c1c4c6f68a";

// Function to convert temperature from Kelvin to Celsius
function conversion(val){
    return (val - 273.15).toFixed(2); // Corrected to 2 decimal places
}

// Event listener for the search button
btn.addEventListener('click', function(){
    // Fetch weather data from OpenWeatherMap API
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputvalue.value+'&appid='+apik)
    .then(res => res.json())
    .then(data => {
        // Extract data from API response
        var nameval = data['name'];
        var descrip = data['weather'][0]['description'];
        var temperature = data['main']['temp'];
        var windspeed = data['wind']['speed'];
        var humidityval = data['main']['humidity'];
        var icon = data['weather'][0]['icon'];

        // Update the DOM with fetched data
        city.textContent = nameval;
        temp.textContent = `${conversion(temperature)}°C`;
        wind.textContent = `${windspeed} km/h`;
        humidity.textContent = `${humidityval}%`;

        // Update the weather icon
        weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

        // Optionally update the description if needed
        // document.querySelector('#description').textContent = descrip;
    })
    .catch(err => {
        console.error('Error:', err);
        alert('You entered an incorrect city name');
    });
});
