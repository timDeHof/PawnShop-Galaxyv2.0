import React, { useState, useEffect } from "react";
import AuthContext from "../AuthContext";
import { fetchUser } from "../axios-services/users";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function getUser() {
      if (localStorage.getItem("token")) {
        // Pretend this from a fetchUser()
        const newUser = await fetchUser(token);
        setUser(newUser);
      } else {
        setUser({});
      }
    }
    getUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
