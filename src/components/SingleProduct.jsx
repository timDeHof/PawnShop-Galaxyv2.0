import React from "react";

const SingleProduct = ({ product, i }) => {
  return (
    <div key={i}>
      <h2>{product.name}</h2>
      <img src={product.imageURL} width="200px" />
      <div>{product.price} ₡</div>
      <div>{product.condition ? "New" : "Used"}</div>
      <div>{product.description}</div>
    </div>
  );
};
export default SingleProduct;
