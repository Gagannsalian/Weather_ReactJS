import PropTypes from "prop-types";

function WeatherCard({ data }) {
  const weatherCondition = data.weather[0].main;
  const temperature = Math.floor(data.main.temp - 273.15); // Convert to Celsius
  
  // Dynamically select the background image based on weather condition
  const getWeatherImage = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return '/images/Sunny.jpg';
      case 'rain':
        return '/images/Rainy.jpg';
      case 'clouds':
        return '/images/Cloudy.jpg';
      default:
        return '/images/Other.jpg'; // A default image if no match
    }
  };

  return (
    <div
      className="relative z-10 p-4 rounded-lg shadow-md mt-4 bg-cover bg-center"
      style={{
        backgroundImage: `url(${getWeatherImage(weatherCondition)})`,
        backgroundSize: 'cover',
      }}
    >
      <h2 className="text-xl font-bold text-white mb-2">{data.name}, {data.sys.country}</h2>
      <p className="text-gray-200">As of {new Date().toLocaleTimeString()}</p>
      
      <div className="flex items-center">
        <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="weather icon" className="w-16 h-16 mr-4" />
        <h1 className="text-4xl font-bold text-white">{temperature}°C</h1>
      </div>
      
      <p className="text-white">{data.weather[0].main} - {data.weather[0].description}</p>
      
      <div className="grid grid-cols-2 gap-4 mt-4 text-white">
        <div className="bg-white/20 backdrop-blur-lg p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <h4 className="text-lg">High/Low</h4>
          <p>{Math.floor(data.main.temp_max - 273.15)}°C / {Math.floor(data.main.temp_min - 273.15)}°C</p>
        </div>

        <div className="bg-white/20 backdrop-blur-lg p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <h4 className="text-lg">Humidity</h4>
          <p>{data.main.humidity}%</p>
        </div>

        <div className="bg-white/20 backdrop-blur-lg p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <h4 className="text-lg">Pressure</h4>
          <p>{data.main.pressure} hPa</p>
        </div>

        <div className="bg-white/20 backdrop-blur-lg p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <h4 className="text-lg">Wind</h4>
          <p>{Math.floor((data.wind.speed * 18) / 5)} km/hr</p>
        </div>
      </div>
    </div>
  );
}

WeatherCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sys: PropTypes.shape({
      country: PropTypes.string.isRequired,
    }).isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
        main: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      temp_max: PropTypes.number.isRequired,
      temp_min: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
    }).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default WeatherCard;
