import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom"
import WeatherAPI from './components/WeatherAPI/WeatherAPI'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <WeatherAPI /> } />
      </Routes>
    </div>
  );
}

export default App;
