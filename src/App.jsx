import { useState } from 'react';
import SearchBar from './Components/SearchBar';
import WeatherCard from './Components/WeatherCard';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('');

  const APIKEY = import.meta.env.VITE_API_KEY;

  async function fetchWeather(city, country) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIKEY}`);
    const data = await response.json();
    setWeatherData(data);

    // Dynamically change background image based on weather
    const weatherCondition = data.weather[0].main.toLowerCase();
    if (weatherCondition === 'clear') {
      setBackgroundImage('sunny');
    } else if (weatherCondition === 'rain') {
      setBackgroundImage('rainy');
    } else if (weatherCondition === 'clouds') {
      setBackgroundImage('cloudy');
    } else {
      setBackgroundImage('others');
    }
  }

  return (
    <div 
      className={`app flex justify-center items-center min-h-screen ${backgroundImage === 'sunny' ? 'bg-sunny' :
          backgroundImage === 'rainy' ? 'bg-rainy' :
          backgroundImage === 'cloudy' ? 'bg-cloudy' : 'bg-other'}`}
      style={{
        backgroundImage: backgroundImage === 'sunny' ? 'url(images/Sunny.jpg)' :
        backgroundImage === 'rainy' ? 'url(images/Rainy.jpg)' :
        backgroundImage === 'cloudy' ? 'url(images/Cloudy.jpg)' : 'url(images/others.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container p-6 bg-white rounded-xl shadow-lg w-full md:w-2/3 lg:w-1/2">
        <SearchBar fetchWeather={fetchWeather} />
        {weatherData && <WeatherCard data={weatherData} />}
      </div>
    </div>
  );
}

export default App;
