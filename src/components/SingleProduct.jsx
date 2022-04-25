import React from "react";
import { useParams, Link } from "react-router-dom";

const SingleProduct = ({ product, products }) => {
  const { singleProductId } = useParams();
  let productToRender;

  if (singleProductId) {
    const singleProduct = products.find(
      (element) => +singleProductId === +element.id
    );
    productToRender = singleProduct;
  } else {
    productToRender = product;
  }

  if (productToRender) {
    return (
      <div>
        <Link to={`/products/${productToRender.id}`}>
          <h2>{productToRender.name}</h2>
        </Link>
        <img src={productToRender.imageURL} width="200px" />
        <div>{productToRender.price} ₡</div>
        <div>{productToRender.condition ? "New" : "Used"}</div>
        <div>{productToRender.description}</div>
        
      </div>
    );
  }
};
export default SingleProduct;
