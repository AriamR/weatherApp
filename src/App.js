import React, {useState} from "react"
import axios from "axios"
import  {dateactually} from "../src/components/dateactually"

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState("")

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=ad9f136612231145452d18c185b79ab5`

  const searchLocation = (event) => {

    if(event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data)
        
        console.log(response.data)
      })

      setLocation('')
    } 
   
  }


  return (
    <div 
      className={
        typeof data.main != 'undefined'
          ? data.weather[0].main === 'Clouds'
            ? 'App clouds'
            : 'App'
            ? data.weather[0].main === 'Clear'
              ? 'App clear'
              : 'App'
              ? data.weather[0].main === 'Rain'
                ? 'App rain'
                : 'App'
              : 'App'
            : 'App'
          : 'App'
      }
      >
      <h1 className="content-h1">Weather App</h1>

      <div className="search">
        <input value={location}
                onChange={event => setLocation(event.target.value)}
                placeholder='Enter Location'
                onKeyPress={searchLocation}
               type="text"/>
      </div>

      {typeof data.main != 'undefined' ? (
        <div className="container">

        <div className="top">
          <div className="location">
            <p>{data.name},{data.sys.country}</p>
            <p>{dateactually(new Date())}</p>
          </div>

          <div className="temp">
            <h1>{Math.round(data.main.temp)}ºC</h1>
            <p>{data.weather[0].main}</p>
          </div>

          <div className="feels">
            <p>humedad:{data.main.humidity}%</p>
          </div>
          </div>
      
        </div>
      ) : (
          ''
        )}

    </div>
  );
}

export default App;
