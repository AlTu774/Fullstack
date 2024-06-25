import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [text, setText] = useState('')
  const [countries, setCountries] = useState([])
  const [list, setList] = useState([])

  const handleChange = (event) => {
    setText(event.target.value)
  }

  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setList(response.data)
    })
  }, [])

  useEffect(() => {
    if (list.length == 0) {
      return
    }
    const letters = text.length
    const list2 = list.filter(country =>
      JSON.stringify(country.name.common.slice(0,letters).toLowerCase()) === JSON.stringify(text.toLowerCase()))
    setCountries(list2)
  }
  ,[text])

  const CountryInfo = (country) => {
    const languages = country.languages
    let languageList = Object.values(languages)
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h3>langueages:</h3>
        {languageList.map(language => {
          return(
          <li key={language}>{language}</li>
        )
        })}
        <br/>
        <img src={country.flags.png}/>
      </div>
    )
  }

  const CountryList = () => {
    if (list.length == 0) {
      return(
        <p>Loading data...</p>
      )
    }
    if (countries.length == 1) {
      const country = countries[0]
      return(CountryInfo(country))
    }
    if (countries.length > 10) {
      return(
        <p>Too many matches, specify another filter</p>
      )
    }
    return(
      <div>
      {countries.map(country =>
      <p key={country.name.common}> {country.name.common} </p>)}
      </div>
    )
  }

  return (
    <div>
      <form>
        find countries 
        <input
        value={text}
        onChange={handleChange}
        />
      </form>
      <CountryList/>
    </div>
  )
}

export default App
