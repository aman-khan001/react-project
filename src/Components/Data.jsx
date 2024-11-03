import axios from "axios";
import React, { useRef, useState } from "react";
import logo from '../assets/img/logo.gif'
import clearIcon from '../assets/img/clear.png'
import DrizzleIcon from '../assets/img/drizzle.png'
import cloudIcon from '../assets/img/cloud.png'
import RainIcon from '../assets/img/rain.png'
import SnowIconn from '../assets/img/snow.png'
import clearNight from '../assets/img/clearNight.png'
import sunset from '../assets/img/sunset-cool.gif'
import sunrise from '../assets/img/sunrise-cool.gif'
import loader from '../assets/img/loader.gif'

import { TiWeatherWindy } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";

const Data = () => {
  const city = useRef();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const allIcons = {
    "01d": clearIcon,
    "01n": clearNight,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":cloudIcon,
    "03n":cloudIcon,
    "04d":DrizzleIcon,
    "04n":DrizzleIcon,
    "09d": RainIcon,
    "09n": RainIcon,
    "10d": RainIcon,
    "10n": RainIcon,
    "13d": SnowIconn,
    "13n": SnowIconn,

  }
  const fetchweather = async () => {
    const cityEle = city.current.value;
    if(cityEle === ""){
      alert("enter city naame")
    }
    setLoading(true)
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityEle}&units=metric&appid=${"ce5324a286c846d879e89ee6fbc5448f"}`
      );
     
      console.log(response.data)
       const icon = allIcons[response.data.weather[0].icon]|| clearIcon
       // Convert sunrise time to a 12-hour format string

      const sunriseTime = new Date(response.data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
      // Convert sunset time to a 12-hour format string
      const sunsetTime = new Date(response.data.sys.sunset * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
      
      setWeather({
        humidity: response.data.main.humidity,
        windspeed: response.data.wind.speed,
        temp: Math.floor( response.data.main.temp),
        city: response.data.name,
        country:response.data.sys.country,
        main: response.data.weather[0].main,
        icon :icon,
        sunrise:sunriseTime,
        sunset: sunsetTime
      })
    } catch (error) {
      console.log("error got", error);
    }
    finally{
      setLoading(false)
    }
  };
  const clickHandler = () => {
    fetchweather();
    
  };
  return (
    <div className="weather_data">
      <h2 className="text-light my-4 text-center ms-3 d-flex align-items-center justify-content-center">
        City Weather <img className="mx-0 px-0" src={logo} alt="" />
      </h2>

      <div className="searchBar">
        <input type="text" placeholder="Enter City Name" ref={city} />
        <button className="btns" type="submit" onClick={clickHandler}>
          Get Weather
        </button>
      </div>

      {loading ? ( // Show loader while fetching data
        <div className="text-center my-3">
          <img src={loader} alt="Loading..." height="150px" />
        </div>
      ) : (
        weather && (
          <div className="Weather_info">
            <div className="rise_set">
              <div>
                <img src={sunrise} alt="" height="50px" className="rounded" />
                <h5 className="text-start mt-3">{weather.sunrise}</h5>
              </div>
              <div className="text-end">
                <img src={sunset} alt="" height="50px" className="rounded" />
                <h5 className="text-end mt-3">{weather.sunset}</h5>
              </div>
            </div>

            <div className="weather_icon">
              <img src={weather.icon} alt="" />
            </div>

            <h1>{weather.temp}°C</h1>
            <h5>{weather.main}</h5>
            <h2>
              {weather.city}
              <span className="fs-5 mx-2">{weather.country}</span>
            </h2>

            <div className="locals">
              <div className="locals1">
                <p className="m-0 p-0">Humidity</p>
                <p className="humidity">
                  <WiHumidity className="fs-2 mb-1" />
                  {weather.humidity}%
                </p>
              </div>
              <div className="locals2">
                <p className="m-0 p-0">Wind speed</p>
                <p className="humidity">
                  <TiWeatherWindy className="fs-2 mb-1" />
                  {weather.windspeed} km/h
                </p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );

};

export default Data;
