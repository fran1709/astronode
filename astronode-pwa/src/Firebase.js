import React from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserProvider';
import './screens/Home.css';

const firebaseConfig = {
  apiKey: "AIzaSyBXaTkxG2bKgSFarWUvaeGV2ja2tWfv5Uw",
  authDomain: "meally-meaty.firebaseapp.com",
  projectId: "meally-meaty",
  storageBucket: "meally-meaty.appspot.com",
  messagingSenderId: "685170813467",
  appId: "1:685170813467:web:c99c524db2ee5766dba6be",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const SignInButton = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'))
  const { setUserInfo } = useUser();

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const picture = result.user.photoURL;

        setUserInfo({ name, picture });
        
        localStorage.setItem('userData', JSON.stringify({ name, email, picture }));
        navigate('/stack');
        
      })
      .catch((error) => {
        console.log(error);
      });
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
        <button className="button" onClick={handleLogout}>Log Out</button>
      )}
    </>
  );
};

export default SignInButton;

