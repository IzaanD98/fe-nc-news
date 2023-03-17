import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "Guest",
    name: "Guest",
    avatar_url:
      "https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max",
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
