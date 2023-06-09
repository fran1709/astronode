import SignInButton from "../Firebase";
import './Home.css';
import { useUser } from '../UserProvider';

const Profile = () => {
    const { userInfo} = useUser();

    return (
        <div>
          <h1>Profile</h1>
          
        {userInfo ? (
            <div className='container'>
            <img className='image' src={userInfo.picture} alt="UserP" />
            <p className='title'>{userInfo.name}</p>
            <SignInButton/>
            </div>
        ) : (
            <span className="tab-icon">🧑‍🚀</span>
      )}
      
        </div>
      );
};

export default Profile
