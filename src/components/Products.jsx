import React, { useState, useEffect } from "react";
import { getProducts } from "../axios-services/products";
import SingleProduct from "./SingleProduct";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);
    };
    getAllProducts();
  }, []);
  console.log(products, "after use effect");
  return (
    <div className="postcard">
      <h1 className="title"> Products</h1>
      {products.map((product, i) => {
        return <SingleProduct product={product} i={i} products={products} />;
      })}
    </div>
  );
};

export default Products;
