import React, { useState } from 'react';
import jsonData from './suburbs.json';

const WeatherAPI = () => {
  const [userInput, setUserInput] = useState('');
  const [resTemp, setResTemp] = useState('');
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  var searchBy = "suburb"; // make configurable later

  const APICall = async (long, lat) => {
    var res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`)
    var resData = await res.json();
    //console.log(resData)
    setResTemp(resData['current_weather'].temperature);
  }

  const APICallDaily = async (long, lat) => {
    //var res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min&timezone=Australia%2FSydney`);
    var res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=-33.87&longitude=151.21&&daily=temperature_2m_max,temperature_2m_min&timezone=Australia%2FSydney`);
    var resData = await res.json();
    var tempArr = [];

    for (var i = 0; i < resData['daily']['time'].length; i++) {
      var dailyResult = {};
      dailyResult.date = resData['daily']['time'][i];
      dailyResult.tempMax = resData['daily']['temperature_2m_max'][i];
      dailyResult.tempMin = resData['daily']['temperature_2m_min'][i];
      tempArr.push(dailyResult);
    }

    setWeeklyForecast(tempArr);
  }
  
  const GetWeatherForecast = () => {
    var searchForLatitude = '';
    var searchForLongitude = '';

    for (var i = 0; i < jsonData.data.length; i++) {
      if (jsonData.data[i][searchBy] == userInput) {
        //searchResults = jsonData.data[i];
        searchForLatitude = jsonData.data[i].lat;
        searchForLongitude = jsonData.data[i].long;
      }
    }
    
    APICall(searchForLongitude, searchForLatitude);
    APICallDaily(searchForLongitude, searchForLatitude);
  }

  return (
    <div className='component'>
      <p>Your suburb: </p>
      <input id='suburbInput' type='text' name='suburbInput' onChange={e => setUserInput(e.target.value)} /><br/>
      <button type='button' onClick={GetWeatherForecast}>Get weather forecast</button>
      <p>Current Temperature: {resTemp}</p>
      <div>
        <h1>Weekly forecast</h1>
        {weeklyForecast.map((data) => (
          <>
            <p>{data.date} - {data.tempMax} / {data.tempMin}</p>
          </>
        ))}
      </div>
    </div>
  );
}

export default WeatherAPI;