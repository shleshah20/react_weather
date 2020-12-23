import React, { useState } from 'react'
import './App.css';
const api = {
//   key: "ba05023a2058adbc76a4b970ca4c147",
  url: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [city,setCity] = useState('')
  const [weather,setWeather] = useState({})

  const search = e => {
    if(e.key === 'Enter') {
      fetch(`${api.url}weather?q=${city}&units=metric&appid=${api.key}`)
      .then(r => r.json())
      .then(res => {
        console.log(res)
        setWeather(res)
        setCity('')
      })
      .catch(err => console.log(err))
    }
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Enter city"
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{new Date().toString()}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
