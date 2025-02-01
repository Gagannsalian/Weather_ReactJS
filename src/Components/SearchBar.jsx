import  { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
function SearchBar({ fetchWeather }) {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city && country) {
      fetchWeather(city, country);
    } else {
      alert('Please enter both city and country');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mb-4">
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out">
        Get Weather
      </button>
    </form>
  );
}

// Import PropTypes
// PropTypes validation
SearchBar.propTypes = {
    fetchWeather: PropTypes.func.isRequired, // Validate that fetchWeather is a function and is required
  };
  
export default SearchBar;

