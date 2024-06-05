import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
// import dotenv from "dotenv";

import "./Weatherdashboard.css";
import DateandTime from "./Components/DateandTime/DateandTime";
import Weather from "./Components/Weather/Weather";
import Dayforecast from "./Components/Dayforecast/Dayforecast";
import Hourforecast from "./Components/Hourforecast/Hourforecast";
import search from "./images/search.svg";
// import logo from "./images/WeatherVibes1.jpg"

const Weatherdashboard = () => {
  const apiKey = "548716f9df6be539f9cc1117a6822bd0";

  const [city, setCity] = useState('delhi');
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchedCity, setSearchedCity] = useState('delhi');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
    setSearchedCity(city);
    
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setCityData(result);
      console.log(cityData);
     
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="App">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <p>Error: {error.message}</p>
      </div>
    );
  }



  return (
    <div className="weatherdashboard">
      <div className="search-bar">
        {/* <div><img src={logo}/></div> */}
        <form>
          <img src={search} />
          <input type="text" placeholder="Search City" onChange={(e)=>{setCity(e.target.value)}}/>
        </form>
        <input type="button" value="Search" onClick={handleSubmit} />
      </div>
      <div className="sec">
        <DateandTime city={searchedCity} />
        <Weather data={cityData.list[0]} />
      </div>
      <div className="sec">
        <Dayforecast data={cityData} />
        <Hourforecast data={cityData} />
      </div>
      <footer>
        <h5> Copyright &copy; 2023 Weather Dekho. Designed and Developed by <a
        href="https://portfolio-amansingh.vercel.app/"> Aman Singh</a></h5>
    </footer>
    </div>
  );
};

export default Weatherdashboard;
