import './App.css';
import { useState, useEffect } from 'react';

// fetch('https://api.open-meteo.com/v1/forecast?latitude=-33.79&longitude=150.83&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m')
//   .then((res) => res.json())
//   .then((data) => console.log(data));

function App() {
  const [temp, setTemp] = useState('');

  useEffect(() => {
    testfunction();
  },[]);

  const testfunction = async () => {
    var res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-33.79&longitude=150.83&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m')
    var resData = await res.json();

    console.log('----------')
    console.log(resData['current_weather'])
    console.log('----------')
    setTemp(resData['current_weather'].temperature);
  }

  return (
    <div className="App">

      <p>Temperature: {temp}</p>
    </div>
  );
}

export default App;
