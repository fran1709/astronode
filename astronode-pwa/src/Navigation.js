import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';
import {useEffect} from 'react';
import { useUser } from './UserProvider';

const Navigation = () => {
  const { userInfo} = useUser();
  const location = useLocation();

  const isHomeScreen = location.pathname === '/';

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userData', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userData');
    }
  }, [userInfo]);

  return (
    <div>
      {!isHomeScreen && (
      <div className="tab-bar">
        
      <Link to="/feed" className="tab">
        <span className="tab-icon">💻</span>
        <span className="tab-label">Feed</span>
      </Link>
      <Link to="/forum" className="tab">
        <span className="tab-icon">👥</span>
        <span className="tab-label">Forum</span>
      </Link>
      <Link to="/calendar" className="tab">
        <span className="tab-icon">🗓️</span>
        <span className="tab-label">Astro Calendar</span>
      </Link>
      <Link to="/profile" className="tab">
        {userInfo ? (
          <img className="profile-icon" src={userInfo.picture} alt="User" />
        ) : (
          <span className="tab-icon">🧑‍🚀</span>
        )}
        <span className="tab-label">Profile</span>
      </Link>
      <Link to="/rover" className='tab'>
        <span className='tab-label'>Rover Pics</span>
      </Link>
      </div>
    )}
    </div>
  );
};

export default Navigation;
