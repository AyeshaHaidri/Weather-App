import React, { useState,useEffect} from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import rain_icon from '../Assets/rain.png';
import Cloudy from '../Assets/CloudyImage.jpg';
import Clear from '../Assets/Sunny.jpg';
import Rainy from '../Assets/RainyBack.avif';
import Snowy from '../Assets/Snow.jpeg';
import NightClear from '../Assets/NightClear.jpg';
import NightCloudy from '../Assets/NightCloudy.jpg';
import NightRainy from '../Assets/NightRain.webp';
import NightSnowy from '../Assets/NightSnowy.jpg';
import NightRainyIcon from '../Assets/Nightrain.png';
import NightSnowyIcon from '../Assets/Nightsnow.png';
import NightCloudyIcon from '../Assets/NightCloudy.png';
import NightClearIcon from '../Assets/NIghtClear.png';

function WeatherApp() {
  const [weatherData, setWeatherData] = useState({icon: clear_icon, bg: Clear});
  const [error, setError] = useState('');

    useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);
  const search = async () => {
    const element = document.getElementsByClassName('cityInput');
    try {
      if (element[0].value === '') {
        throw new Error('Input cannot be empty');
      }
      let apikey = 'c71b66eeef0634a2f7b982fd9816bff3';
      let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apikey}`;

      let response = await fetch(apiurl);
      if (!response.ok) 
      {
        throw new Error('Failed to fetch data. Please try again.');
      }
      let data = await response.json();
      console.log('Weather Data:', data);
      console.log('Weather Icon Code from API:', data.weather[0].icon);

      const humidity = document.getElementsByClassName('humidity-percent');
      const wind = document.getElementsByClassName('wind-speed');
      const temperature = document.getElementsByClassName('weather-temp');
      const location = document.getElementsByClassName('weather-location');
      const feelslike = document.getElementsByClassName('feels-like');

      humidity[0].innerHTML = Math.round(data.main.humidity) + '%';
      wind[0].innerHTML = Math.round(data.wind.speed) + ' km/h';
      temperature[0].innerHTML = Math.round(data.main.temp) + '°C';
      location[0].innerHTML = data.name;
      feelslike[0].innerHTML = Math.round(data.main.feels_like) + '°C';

      const timezoneOffset = data.timezone;
      const utcTimestamp = data.dt;
      const localTimestamp = utcTimestamp + timezoneOffset;

      const sunriseTimestamp = data.sys.sunrise + timezoneOffset;
      const sunsetTimestamp = data.sys.sunset + timezoneOffset;

      const isDaytime = localTimestamp >= sunriseTimestamp && localTimestamp <= sunsetTimestamp;

      const updatedWeatherData = mapIconToWeatherData(data.weather[0].icon, isDaytime);
      setWeatherData(updatedWeatherData);

      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const mapIconToWeatherData = (iconCode, isDaytime) => {
    const dayIcons = {
      '01d': { icon: clear_icon, bg: Clear },
      '02d': { icon: cloud_icon, bg: Cloudy },
      '03d': { icon: cloud_icon, bg: Cloudy },
      '04d': { icon: cloud_icon, bg: Cloudy },
      '09d': { icon: drizzle_icon, bg: Rainy },
      '10d': { icon: rain_icon, bg: Rainy },
      '11d': { icon: rain_icon, bg: Rainy },
      '13d': { icon: snow_icon, bg: Snowy },
      '50d': { icon: cloud_icon, bg: Cloudy },
    };

    const nightIcons = {
      '01n': { icon: NightClearIcon, bg: NightClear },
      '02n': { icon: NightCloudyIcon, bg: NightCloudy },
      '03n': { icon: NightCloudyIcon, bg: NightCloudy },
      '04n': { icon: NightCloudyIcon, bg: NightCloudy },
      '09n': { icon: NightRainyIcon, bg: NightRainy },
      '10n': { icon: NightRainyIcon, bg: NightRainy },
      '11n': { icon: NightRainyIcon, bg: NightRainy },
      '13n': { icon: NightSnowyIcon, bg: NightSnowy },
      '50n': { icon: NightCloudyIcon, bg: NightCloudy},
    };

    const iconMap = isDaytime ? dayIcons : nightIcons;
    return iconMap[iconCode] || dayIcons['01d']; 
    
  };
  return (
    <div
      style={{
        backgroundImage: `url(${weatherData.bg})`,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='top-bar'>
        <input type='text' className='cityInput' placeholder='Search' />
        <div className='search-icon' onClick={search}>
          <img src={search_icon} alt='searchiconhere' />
        </div>
      </div>

      <div className='weather-image'>
        <img src={weatherData.icon} alt='weather icon' />
      </div>
      <div className='weather-temp'>24°C</div>
      <div className='weather-location'>Dehradun</div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidity_icon} alt='' />
          <div className='data'>
            <div className='humidity-percent'>64%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <div className='data'>
            <div className='feels-like'>24°C</div>
            <div className='text'>Feels Like</div>
          </div>
        </div>
        <div className='element'>
          <img src={wind_icon} alt='' />
          <div className='data'>
            <div className='wind-speed'>64 km/hr</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;