import React, { useState ,useEffect} from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import rain_icon from '../Assets/rain.png';

function WeatherApp() {
  const [wicon, setWicon] = useState(cloud_icon);
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
      if (!response.ok) {
        throw new Error('Failed to fetch data. Please try again.');
      }
      let data = await response.json();

      const humidity = document.getElementsByClassName('humidity-percent');
      const wind = document.getElementsByClassName('wind-speed');
      const temperature = document.getElementsByClassName('weather-temp');
      const location = document.getElementsByClassName('weather-location');

      humidity[0].innerHTML = Math.round(data.main.humidity) + '%';
      wind[0].innerHTML =Math.round( data.wind.speed) + 'km/h';
      temperature[0].innerHTML =Math.round( data.main.temp )+ '°C';
      location[0].innerHTML = data.name;

      if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
        setWicon(clear_icon);
      } else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
        setWicon(cloud_icon);
      } else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
        setWicon(drizzle_icon);
      } else if (data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
        setWicon(drizzle_icon);
      } else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
        setWicon(rain_icon);
      } else if (data.weather[0].icon === '10d' || data.weather[0].icon === '10n') {
        setWicon(rain_icon);
      } else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
        setWicon(snow_icon);
      } else {
        setWicon(clear_icon);
      }
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type='text' className='cityInput' placeholder='Search' />
        <div className='search-icon' onClick={search}>
          <img src={search_icon} alt='searchiconhere' />
        </div>
      </div>
      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
      {/* {error && <prompt style={{ color: 'red' }}>{error}</prompt>} */}

      <div className='weather-image'>
        <img src={wicon} alt='' />
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
          <img src={wind_icon} alt='' />
          <div className='data'>
            <div className='wind-speed'>64km/hr</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
