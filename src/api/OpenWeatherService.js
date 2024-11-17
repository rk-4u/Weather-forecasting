const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = '8d1309f432ff0267a654df2803d95597';

const GEO_API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '69a9de089bmsh30c39891996a320p1e2661jsn85eb14f48695',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

// Fetch weather and forecast data
export async function fetchWeatherData(lat, lon) {
  try {
    // Fetch current weather
    const weatherResponse = await fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    if (!weatherResponse.ok) {
      throw new Error(`Weather API error: ${weatherResponse.statusText}`);
    }

    const weatherData = await weatherResponse.json();

    // Fetch forecast data
    const forecastResponse = await fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    if (!forecastResponse.ok) {
      throw new Error(`Forecast API error: ${forecastResponse.statusText}`);
    }

    const forecastData = await forecastResponse.json();

    // Log the responses to check if data is fetched correctly
    console.log('Weather Data:', weatherData);
    console.log('Forecast Data:', forecastData);

    return [weatherData, forecastData];
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}


export async function fetchCities(input) {
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}
