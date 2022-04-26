import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { fetchUser, getUsers } from "../axios-services/users";
import { getProducts } from "../axios-services/products";
import { getAPIHealth } from "../axios-services";
import "../style/App.css";
import Login from "./Login";
import Header from "./Header";
import Register from "./Register";
import Products from "./Products";
import SingleProduct from "./SingleProduct";
import useAuth from "../hooks/useAuth";
import Footer from "./Footer";
import Cart from "./Cart";


const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const { user, token } = useAuth();
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);
    };
    getAllProducts();
  }, []);
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
      <Header />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/products/:singleProductId" element={<SingleProduct products ={products} setproducts={setProducts}/>} />
        <Route path="/products" element={<Products products={products} setProducts={setProducts} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/" element={<Products />} />
      </Routes>
      <Footer APIHealth={APIHealth} />
    </div>
  );
};

export default App;
