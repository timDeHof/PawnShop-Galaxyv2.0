import React from "react";
import { useParams, Link } from "react-router-dom";
import { deleteProduct } from "../axios-services/products";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

const SingleProduct = ({ product, products }) => {
  const { singleProductId } = useParams();
  const { addToCart, cart } = useCart();
  const { user } = useAuth();

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
          <img src={productToRender.imageURL} width="200px" />
        </Link>
        <div>{productToRender.price} ₡</div>
        <div>{productToRender.condition ? "New" : "Used"}</div>
        <div>{productToRender.description}</div>
        {user.isAdmin ? (
          <button
            onClick={async () => {
              console.log(
                "%cDeleted Product",
                `background:linear-gradient(#E66465, #9198E5);
                padding: .3rem;
                color: white;
                border-radius: .5em`
              );
              await deleteProduct(productToRender.id);
            }}
          >
            Delete
          </button>
        ) : (
          <button
            onClick={() => {
              addToCart(cart.id, productToRender.id, 1);
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
    );
  }
};
export default SingleProduct;
