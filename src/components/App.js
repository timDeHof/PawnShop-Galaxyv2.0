import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getProducts } from '../axios-services/products';
import '../style/App.css';
import Login from './Login';
import Header from './Header';
import Register from './Register';
import Products from './Products';
import SingleProduct from './SingleProduct';
import Home from './Home';
import Footer from './Footer';
import Cart from './Cart';
import AdminProductForm from './AdminProductForm';
import AdminDashboard from './AdminDashboard';
import AdminEditForm from './AdminEditForm';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);
    };
    getAllProducts();
  }, []);

  return (
    <main className="app-container">
      <Header />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/products/:singleProductId"
          element={<SingleProduct products={products} setproducts={setProducts} />}
        />
        <Route
          path="/products"
          element={<Products products={products} setProducts={setProducts} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/product-form" element={<AdminProductForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/edit-form/:productId" element={<AdminEditForm />} />
        <Route path="/" element={<Home products={products} />} />
      </Routes>

      <Footer />
    </main>
  );
}

export default App;
