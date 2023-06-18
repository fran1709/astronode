import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./screens/Home";
import Stack from "./screens/Stack";
import  Navigation  from './Navigation';
import Profile from './screens/Profile';
import { UserProvider } from './UserProvider';
import Forum from './screens/Forum';
import Calendar from './screens/Calendar';
import Feed from './screens/Feed';
/* import logo from './logo.svg';
import './App.css'; */

function App() {
  return (
    <UserProvider>
      <Router>
      <Navigation/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/forum" element={<Forum/>} />
        <Route path="/stack" element={<Stack/>} />
        <Route path="/calendar" element={<Calendar/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>  
    </Router>

    </UserProvider>
  );
}

export default App;
