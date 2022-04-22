import React from "react";
import {useParams, Link} from "react-router-dom"


const SingleProduct = ({ product, i, products }) => {
  const { singleProductId } = useParams();
  let productToRender
  
  if (singleProductId) {
    const singleProduct = products.find(
      (element) => +singleProductId === +element.id
    );
    productToRender = singleProduct;
  } else {
    productToRender = product;
  }

  return (
    <Link to ={`/products/${productToRender.id}`}>
    <div key={i}>
      <h2>{productToRender.name}</h2>
      <img src={productToRender.imageURL} width="200px" />
      <div>{productToRender.price} ₡</div>
      <div>{productToRender.condition ? "New" : "Used"}</div>
      <div>{productToRender.description}</div>
    </div>
    </Link>
  );
};
export default SingleProduct;
