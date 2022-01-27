
import './App.css';

function App() {

  function getCurrentDate(separator=''){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
    }

  return (
    <div className="App">
      <input className='search'/>
      <div className='address'>City, Country</div>
      <div className='date'>{getCurrentDate("-")}</div>

           <div className='climate'>Clouds</div>
           <div className='temp'>33  C</div>
           <div className='minmax'>
           <div className='min'>Min : XX</div>
           <div className='min'>Max : XX</div>
           </div>
    </div>
  );
}

export default App;
