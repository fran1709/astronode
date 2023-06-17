import { useNavigate } from 'react-router-dom';
import './Home.css';
import SignInButton from "../Firebase";
import { useUser } from '../UserProvider';

const Home = () => {
    const navigate = useNavigate();
    const { userInfo} = useUser();

    return (
        <div className="container">
          {userInfo === null ? (
            <>
              <img className="stretch" src={require('../media/appLogo.png')} alt="App Logo1" />
              <h1 className="title">Welcome</h1>
              <p className="description">Please login</p>
              <SignInButton/>
            </>
          ) : (
            <>
              <img className="stretch" src={require('../media/appLogo.png')} alt="App Logo2" />
              <h1 className="title">Welcome</h1>
              <p className="description">{userInfo.name}</p>
              <img className="image" src={userInfo.picture} alt="UserH" />
              <button className="button" onClick={() => navigate('/stack')}>
                Continue
              </button>
            </>
          )}
        </div>
      );
};

export default Home;
