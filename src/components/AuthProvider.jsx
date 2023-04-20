import React, { useState, useEffect, useMemo } from "react";
import AuthContext from "../AuthContext";
import { fetchUser } from "../axios-services/users";

function AuthProvider({ children }) {
  const [user, setUser] = useState({ username: "guest" });
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    async function getUser() {
      if (token) {
        // Pretend this from a fetchUser()
        const newUser = await fetchUser(token);
        setUser(newUser);
      } else {
        setUser({ username: "guest" });
      }
    }
    getUser();
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);
  const contextValue = useMemo(
    () => ({ user, setUser, token, setToken }),
    [user, setUser, token, setToken]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
