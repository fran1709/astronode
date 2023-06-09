import React, { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithRedirect, signOut, getRedirectResult } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserProvider';
import './screens/Home.css';

const firebaseConfig = {
  apiKey: "AIzaSyBY2df3fNCv8ueDeQrNB-DvAVDXpL4YlP8",
  authDomain: "astronode-f2dd7.firebaseapp.com",
  projectId: "astronode-f2dd7",
  storageBucket: "astronode-f2dd7.appspot.com",
  messagingSenderId: "702406923129",
  appId: "1:702406923129:web:a99c459620f23fb4a255a8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const SignInButton = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const { setUserInfo } = useUser();

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result.user) {
          const name = result.user.displayName;
          const email = result.user.email;
          const picture = result.user.photoURL;
          setUserInfo({ name, picture });
          localStorage.setItem('userData', JSON.stringify({ name, email, picture }));
          navigate('/stack');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, );

  const signInGoogle = () => {
    signInWithRedirect(auth, provider);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserInfo(null);
      localStorage.removeItem('userData');
      navigate('/');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <>
      {!userData && (
        <button className="button" onClick={signInGoogle}>
          Sign in with Google
        </button>
      )}

      {userData && (
        <button className="button" onClick={handleLogout}>
          Log Out
        </button>
      )}
    </>
  );
};

export default SignInButton;