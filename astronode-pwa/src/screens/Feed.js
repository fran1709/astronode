import FeedCard from "../components/FeedCard";
import "./Feed.css";
import MapView from "../components/MapView";

const Feed = () => {
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
        <FeedCard>
          <MapView>
          </MapView>
        </FeedCard>
      </div>
    </div>
  );
};

export default Feed;
