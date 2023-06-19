import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "./MapView.css";
import "leaflet/dist/leaflet.css";
import { API } from "../Api_Astronode";
import { useState, useEffect} from "react";
import L from "leaflet";

const MapView = () => {
  const [latitude, setLat] = useState("");
  const [longitude, setLong] = useState("");


  async function getData() {
    try {
      const response = await API.get("/astroApi/isspos");
      setLat(response.data.iss_position.latitude);
      setLong(response.data.iss_position.longitude);
      console.log(response.data.iss_position);
    } catch (error) {
      console.log(error);
    }
  }

  function getIcon(iconSize) {
    return L.icon({
      iconUrl: require("../media/ISSIcon.png"),
      iconSize: [iconSize],
    });
  }


  // Llamada cosntante para obtener los datos
  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <MapContainer
      center={{ lat: "0", lng: "0" }}
      zoom={3}
      scrollWheelZoom={true}
      maxZoom={5}
      minZoom={2}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={{ lat: latitude, lng: longitude }}
        icon={getIcon(50)}
      ></Marker>
    </MapContainer>
  );
};

export default MapView;
