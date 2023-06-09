import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Stack from "./screens/Stack";
import  Navigation  from './Navigation';
import Profile from './screens/Profile';
import { UserProvider } from './UserProvider';
/* import logo from './logo.svg';
import './App.css'; */

function App() {
  return (
    <UserProvider>
      <Router>
      <Navigation/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/stack" element={<Stack/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>  
    </Router>

    </UserProvider>
  );
}

export default App;
