
import './App.css';
import { useState } from 'react';

function App() {

  const [city, setCity] = useState("")
  const [data, setData] = useState({})
  
  const API = "acce0dd877a50f0ea34d58a35fa44d2f"


  function getCurrentDate(separator=''){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
    }

    const keyHandler = (e) => {
      if(e.key === "Enter"){
        fetch(`https://api.openweathermap.org/data/2.5/weather?&q=${city}&units=metric&appid=${API}`).then(res => res.json()).then(data => {
          setData(data)
          console.log(data)
        })
      }
    }
  return (
    <div className="App">
      <input className='search' value = {city} onChange = {(e) => {setCity(e.target.value)}} onKeyPress={keyHandler} />
      {typeof data.main === "undefined" ? (
        <div className='start'>
        Welcome! Enter the city name to check the weather.
      </div>
        )
        :
        (

          
        <div className='container'>
        <div className='address'>{data.name}, {data.sys.country}</div>
      <div className='date'>{getCurrentDate("-")}</div>

           <div className='climate'>{data.weather[0].main}</div>
           <div className='temp'>{data.main.temp}°C</div>
           <div className='minmax'>
           <div className='min'>Min : {data.main.temp_min}</div>
           <div className='min'>Max : {data.main.temp_max}</div>
           </div>
      </div>
      )}
    </div>
  );
}

export default App;
