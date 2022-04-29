import React from "react";
import { useParams, Link } from "react-router-dom";
import { deleteProduct } from "../axios-services/products";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import styles from "../style/Products.module.css";

const SingleProduct = ({ product, products, setProducts }) => {
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
      <div className={styles.product}>
        <Link to={`/products/${productToRender.id}`}>
          <h2 className={styles.productTitle}>{productToRender.name}</h2>
          <img className={styles.productImg} src={productToRender.imageURL} />
        </Link>
        <div className={styles.productPrice}>{productToRender.price} ₡</div>
        <div className={styles.productCondition}>
          {productToRender.condition ? "New" : "Used"}
        </div>
        <div className={styles.productDescription}>
          {productToRender.description}
        </div>
        {user.isAdmin ? (
          <>
            <Link
              to={`/admin/edit-form/${productToRender.id}`}
              className={styles.deleteProduct}
            >
              Edit
            </Link>
            <button
              className={styles.deleteProduct}
              onClick={async () => {
                console.log(
                  "%cDeleted Product",
                  `background:linear-gradient(#E66465, #9198E5);
                padding: .3rem;
                color: white;
                border-radius: .5em`
                );
                await deleteProduct(productToRender.id);
                const filteredProducts = products.filter(product => {
                  if (product.id !== productToRender.id) return true
                })
                setProducts(filteredProducts)

              }}
            >
              Delete
            </button>
          </>
        ) : (
          <button
            className={styles.addToCart}
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
