import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import "./MapView.css";
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  return (
    <MapContainer center={{ lat: "51.52437", lng: "13.41053" }} zoom={1} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default MapView;