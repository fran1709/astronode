import React, {useState} from 'react'
import FeedCard from "../components/FeedCard";
import Stack from './Stack';
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
      <Stack/>
     
      <div className="content">
        <h3>International Space Station Position</h3>
          <MapView />
      </div>
    </div>
  );
};

export default Feed;
