
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
    <div className=" app  container text-center ">
      <input className=' form-control bg-info shadow-lg my-5 w-60  ' value = {city} onChange = {(e) => {setCity(e.target.value)}} onKeyPress={keyHandler} placeholder='Enter the city...' label='enter the city' />
      <div className="weather ">
      {typeof data.main === "undefined" ? (
        <div className='display-2 text-center'>
        {data.cod === "404" ? "City not Found !!" : "Welcome! Enter the city name to check the weather !!"}
      </div>
        )
        :
        (

          
        
          <div className=' card text-white bg-info  text-center border border-info shadow-lg '>
        <div className=' display-1 card-header w-100% mb-3 '>{data.name}, {data.sys.country}</div>
      <div className='date'>({getCurrentDate("-")})</div>
           <div className='card-title display-3'>
           <div className='climate my-4'>{data.weather[0].main}</div>
           <div className={data.main.temp > 10 ? "temp-warm" : "temp-cold"}>{data.main.temp}°C</div>
           </div>
           
           <div className='card-footer d-flex  justify-content-evenly '>
           <div className='min '>Min : {data.main.temp_min}°C    </div>
           <div className='max '>Max : {data.main.temp_max}°C</div>
           </div>
      </div>
      )}
    </div>
    </div>

  );
}

export default App;
