import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../axios-services/products";
import useAuth from "../hooks/useAuth";
import SingleProduct from "./SingleProduct";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth()

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);
    };
    getAllProducts();
  }, []);

  return (
    <div className="postcard">
      <h1 className="title"> Products</h1>
      {user.isAdmin ? 
        <Link to="/admin/product-form">
          <h3>Add a New Product</h3>
        </Link>
      : null}
      {products
        ? products.map((product, i) => {
            return (
              <SingleProduct
                key={`product${i}`}
                product={product}
                products={products}
                productId={products.id}
              />
            );
          })
        : null}
    </div>
  );
};

export default Products;
