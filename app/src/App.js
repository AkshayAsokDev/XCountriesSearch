import { useState, useEffect } from "react";
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




  useState(() => {

    const data = fetch(endpoint)
      .then((data) => data.json())
      .then(data => setCountryData(data))
      .catch(error => console.error("error while fetching : ", error));
      
      
  }, [])

  // console.log("countryData >>", countryData);

  return (
    <div className="App">
      
      <div style={{
        display : "flex",
        justifyContent : "center"
      }}>
        <input 
        style={{
          width : "60%",
          padding : "10px",
          margin : "10px",
        }}
        type="text" placeholder="Search for countries..." />
      </div>

      <div className="countryContainer" >
        {
          countryData.map((country, index) => <CountryCard key={index} image={country.png} name={country.common} />)
        }
      </div>

    </div>
  );
}

export default App;
