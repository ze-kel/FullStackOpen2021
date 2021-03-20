import axios from 'axios'
import { useEffect, useState } from 'react'


const api_key = process.env.REACT_APP_API_KEY


const RenderWeather = ({weather, courtryName}) =>{
  if(weather.current){
    return(
    <div>
      <h1>Weather in {courtryName}</h1>
      <p>Temperature {weather.current.temperature}C</p>
      <p>Wind: {weather.current.wind_speed} mph Direction: {weather.current.wind_dir} </p>
      <img src={weather.current.weather_icons[0]} width="100"/>
    </div>
    )
  }else{
    return (<p>Loading temperature, please wait...</p>)
  }
}

const RenderDetails = ({ country }) => {
  const [weather, setWeather] = useState([])
  
  const getWeather = () => axios
  .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
  .then((res) => {
    console.log(res.data)
    setWeather(res.data)
  })

  useEffect(getWeather, [])

  return (
    <div>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <p>Languages</p>
      <ul>
        {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
      </ul>
      <img src={country.flag} width="100"></img>
      <RenderWeather weather={weather} courtryName={country.name} />
    </div>
  )
}


const RenderCoutry = ({ country }) => {
  const [detailsVisibility, setVisibility] = useState(true)
  const changeVisibility = (e) =>{
    setVisibility(!detailsVisibility)
  }

  if (detailsVisibility) {
    return(
    <div>
      <p>{country.name}</p>
      <button onClick={changeVisibility}>Show Info</button>
    </div>
    )
  } else {
    return (
      <div>
        <p>{country.name}</p>
        <button onClick={changeVisibility}>Hide Info</button>
        <RenderDetails country={country} />
      </div>
    )
  }
}

const RenderList = ({ data }) => {
  if (data.length > 10) {
    return <p>Too many results</p>
  } else {
    return (
      data.map((country) => <RenderCoutry key={country.numericCode} country={country} />)
    )
  }
}



const App = () => {

  const [data, setData] = useState([])
  const [filterQuery, setFilter] = useState("Swed")

  let FilteredData = data.filter(courtry => courtry.name.toLowerCase().includes(filterQuery.toLowerCase()))


  const onQueryChage = (e) => {
    e.preventDefault()
    setFilter(e.target.value)
  }

  const getData = () => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(resp => {
        setData(resp.data)
      })
  }

  useEffect(getData, [])

  return (
    <div>
      <div>
        Find counties: <input value={filterQuery} onChange={onQueryChage}></input>
      </div>

      <RenderList data={FilteredData} />
    </div>
  );
}

export default App;
