import { useState, useEffect, useRef } from "react";
import "./App.css";



const endpoint = "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";

function CountryCard({image, name}) {



  return (
    <div className="countryCard">
      <img src={image} alt={`image-of-${name}`} />
      <p style={{
        fontWeight : 700,
      }} >{name}</p>
    </div>
  )
}


function App() {


  const [countryData, setCountryData] = useState([]);
  const [search, setSearch] = useState("");
  const timer = useRef(null);
  const [filteredCountry, setFilteredCountry] = useState([]);


  const filter = (match) => {

    // filter function for countries
    // console.log("filter function started : ", match);

    // if search is empty
    if(match === ""){
      setFilteredCountry(countryData);
    }
    else{
      // if search is not empty
      console.log(typeof(match));
      const data = countryData.filter((country) => country.common.toLowerCase().includes(match.toLowerCase()));
      setFilteredCountry(data);
    }
    

  }

  useEffect(() => {

    fetch(endpoint)
      .then((data) => data.json())
      .then(data => {
        setCountryData(data);
        setFilteredCountry(data);
      })
      .catch(error => console.error("error while fetching : ", error));
      
      
  }, [])

  // console.log("filtered country 1 >>", filteredCountry);

  //for debouncing
  useEffect(() => {

    if(timer.current){
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      // console.log("handler called");
      filter(search);
    }, 500);

    


  }, [search, countryData])

  return (
    <div className="App">
      
      <div style={{
        display : "flex",
        justifyContent : "center"
      }}>
        <input 
        value={search}
        onChange={(e) => {
          // console.log("search >>", e.target.value);
          setSearch(e.target.value);
        }}
        style={{
          width : "60%",
          padding : "10px",
          margin : "10px",
        }}
        type="text" placeholder="Search for countries..." />
      </div>

      <div className="countryContainer" >
        {
          filteredCountry.map((country, index) => <CountryCard key={index} image={country.png} name={country.common} />)
        }
      </div>

    </div>
  );
}

export default App;
