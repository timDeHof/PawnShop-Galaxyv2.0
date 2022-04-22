import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { fetchUser, getUsers } from "../axios-services/users";

import { getAPIHealth } from "../axios-services";
import "../style/App.css";
import Login from "./Login";
import Navbar from "./Navbar";
import Signin from "./Signin";
import Products from "./Products";
import SingleProduct from "./SingleProduct";
import useAuth from "../hooks/useAuth";


const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const { user, token } = useAuth();



  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();

    // fetchUser(localStorage.getItem("token"));
  }, []);

  return (
    <div className="app-container">
      {!token ? (
        <h1>Please log in or register</h1>
      ) : (
        <h1>Hello, {user ? user.username : null}</h1>
      )}

      <p>API Status: {APIHealth}</p>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:singleproductid" element={<SingleProduct />} />

        <Route path="/" element={<Products />} />
      </Routes>

    </div>
  );
};

export default App;
