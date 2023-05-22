import React from "react";
import Navigation from "./Navigation";
import { UserProvider } from './components/UserProvider';

export default function App() {
  return (
    <UserProvider>
      <Navigation/> 
    </UserProvider>
  );
}
