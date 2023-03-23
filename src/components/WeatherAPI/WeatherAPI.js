import React, { useState, useEffect } from 'react';


// fetch('https://api.open-meteo.com/v1/forecast?latitude=-33.79&longitude=150.83&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m')
//   .then((res) => res.json())
//   .then((data) => console.log(data));

const WeatherAPI = () => {
  const [temp, setTemp] = useState('');
  const [latitude, setLatitude] = useState('-33.79');
  const [longitude, setLongitude] = useState('150.83');
  
  useEffect(() => {
    //setLatitude('-33.79');
    //setLongitude('150.83');
    
    testfunction();    
  },[]);

  const testfunction = async () => {
    var res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`)
    var resData = await res.json();

    console.log('----------')
    console.log(resData['current_weather'])
    console.log('----------')
    setTemp(resData['current_weather'].temperature);
  }

  const GetWeatherForecast = () => {

  }

  return (
    <div className='component'>
      <p>Your suburb: </p>
      <input id='suburbInput' name='suburbInput' /><br/>
      <button type='button' onClick={GetWeatherForecast}>Get weather forecast</button>
      <p>Temperature: {temp}</p>
    </div>
  );
}

export default WeatherAPI;