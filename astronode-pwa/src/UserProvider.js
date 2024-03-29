import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [userInfo, setUserInfo] = useState(null);
  
    return (
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        {children}
      </UserContext.Provider>
    );
  }