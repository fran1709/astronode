import SignInButton from "../Firebase";
import "./Profile.css";
import { useUser } from "../UserProvider";

const Profile = () => {
  const { userInfo } = useUser();

  return (
    <div>
      {userInfo ? (
        <div className="container">
          <img
            className="stretch"
            src={require("../media/appLogo.png")}
            alt="App Logo1"
          />
          <img className="image" src={userInfo.picture} alt="UserP" />
          <h1>Logged in as:</h1>
          <p className="description">{userInfo.name}</p>
          <SignInButton />
        </div>
      ) : (
        <span className="tab-icon">🧑‍🚀</span>
      )}
    </div>
  );
};

export default Profile;
