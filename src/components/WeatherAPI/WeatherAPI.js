import React, { useState } from 'react';
import jsonData from './suburbs.json';

const WeatherAPI = () => {
  const [userInput, setUserInput] = useState('');
  const [temp, setTemp] = useState('');  
  var testingUserInput = "sydney";
  // maybe configurable later on for the user to search via different criteria
  var searchBy = "suburb";
  //var searchResults = [];

  const APICall = async (long, lat) => {
    var res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`)
    var resData = await res.json();
    setTemp(resData['current_weather'].temperature);
  }

  const GetWeatherForecast = () => {
    var searchForLatitude = '';
    var searchForLongitude = '';

    for (var i = 0; i < jsonData.suburbs.length; i++) {
      if (jsonData.suburbs[i][searchBy] == userInput) {
        //searchResults = jsonData.suburbs[i];
        searchForLatitude = jsonData.suburbs[i].lat;
        searchForLongitude = jsonData.suburbs[i].long;
      }
    }
    
    APICall(searchForLongitude, searchForLatitude);
  }

  return (
    <div className='component'>
      <p>Your suburb: </p>
      <input id='suburbInput' type='text' name='suburbInput' onChange={e => setUserInput(e.target.value)} /><br/>
      <button type='button' onClick={GetWeatherForecast}>Get weather forecast</button>
      <p>Temperature: {temp}</p>
    </div>
  );
}

export default WeatherAPI;