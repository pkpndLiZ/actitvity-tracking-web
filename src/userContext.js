// UserContext.js
import React, { createContext, useState, useEffect } from "react";
import { fetch } from "./axiosInstance";
import useSWR from "swr";
import { useSWRConfig } from "swr";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const { cache } = useSWRConfig();
  const { data: userData, mutate: updateUserData } = useSWR(
    userId ? "/api/users/" + userId : null,
    fetch
  );

  useEffect(() => {
    // console.log("userId:", userId);
    const userIdCache = localStorage.getItem("userId");
    // console.log("userIdCache:", userIdCache);
    if (userIdCache) {
      setUserId(userIdCache);
    }
  });

  const clearUserData = () => {
    cache.delete("/api/users/" + userId);
  };

  const userContextValue = {
    userData,
    updateUserData,
    clearUserData,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
