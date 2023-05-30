import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [token, setToken] = useState("");
    const [userInfo, setUserInfo] = useState(null);
  
    return (
      <UserContext.Provider value={{ token, setToken, userInfo, setUserInfo }}>
        {children}
      </UserContext.Provider>
    );
  }