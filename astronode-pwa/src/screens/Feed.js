import React, {useState} from 'react'
import FeedCard from "../components/FeedCard";
import "./Feed.css";
import MapView from "../components/MapView";
import { API } from '../Api_Astronode';

const Feed = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [planetInfo, setPlanetInfo] = useState([]);
  

  async function getData() {
    try {
      const jsonData = {"name": searchTerm}
      const queryParams = new URLSearchParams(jsonData).toString();
      const response = await API.get("/astroApi/planet" + {queryParams});
      setPlanetInfo(response.data);
      console.log(planetInfo);
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div className="header">
        <img
          className="logo"
          src={require("../media/appLogoS.png")}
          alt="LogoS"
        />
      </div>
      <div className="content">
        <div className="feed-content">
          <MapView />
        </div>
        <div className="feed-content">
          <input value={searchTerm} className="search-input" type="text" placeholder="Search for a planet" onChange={handleInputChange}>

          </input>
          <button className="search-button">Search</button>
        </div>
      </div>
    </div>
  );
};

export default Feed;
