import React, { useState, useEffect } from "react";
import { getProducts } from "../axios-services/products";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);
    };
    getAllProducts();
  }, []);
console.log(products, "after use effect")
  return (
    <div className="postcard">
      <h1 className="title"> Products</h1>
      {products
        ? products.map((product, i) => {
            <div key={i}>
              <div>{product.name}</div>
              <div>{product.imageURL}</div>
              <div>{product.price}</div>
              <div>{product.condition}</div>
              <div>{product.description}</div>
            </div>;
          })
        : null}
    </div>
  );
};

export default Products;
