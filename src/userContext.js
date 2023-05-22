// UserContext.js
import React, { createContext, useState, useEffect } from "react";
import { fetch } from "./axiosInstance";
import useSWR from "swr";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const { data: userData, mutate: updateUserData } = useSWR(
    userId ? "/api/users/" + userId : null,
    fetch
  );

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUserId(userId);
    }
  }, []);

  const userContextValue = {
    userData,
    updateUserData,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
