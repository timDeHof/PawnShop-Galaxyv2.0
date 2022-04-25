import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  return (
    <div className="postcard">
      <h1 className="title"> Products</h1>
      {products
        ? products.map((product, i) => {
            return (
              <SingleProduct
                product={product}
                i={i}
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
