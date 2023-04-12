import React, { useState } from 'react';
import jsonData from './suburbs.json';
//import jsonData from './suburbsmine.json';

const WeatherAPI = () => {
  const [userInput, setUserInput] = useState('');
  const [temp, setTemp] = useState('');
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

    for (var i = 0; i < jsonData.data.length; i++) {
      if (jsonData.data[i][searchBy] == userInput) {
        //searchResults = jsonData.data[i];
        console.log('Search found!!!')
        searchForLatitude = jsonData.data[i].lat;
        searchForLongitude = jsonData.data[i].long;
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