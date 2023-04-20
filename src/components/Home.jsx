import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../style/Products.module.css";
import { deleteProduct } from "../axios-services/products";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

function Home({ products }) {
  const { user } = useAuth();
  const { addToCart, cart } = useCart();
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    setDisplayedProducts(products?.slice(7, 10));
  }, [products]);

  function handleDeleteProduct(product) {
    console.log(
      "%cDeleted Product",
      `background:linear-gradient(#E66465, #9198E5);
                                  padding: .3rem;
                                  color: white;
                                  border-radius: .5em`
    );
    deleteProduct(product.id).then(() => {
      const filteredProducts = products.filter((p) => {
        if (p.id !== product.id) {
          return true;
        }
        return false;
      });
      setDisplayedProducts(filteredProducts?.slice(7, 10));
    });
  }
  function handleAddingProductToCart(product) {
    addToCart(cart.id, product.id, 1);
  }

  function renderProduct(product) {
    return (
      <div key={`p${product.id}`} className={styles.product}>
        <Link
          to={`/products/${product.id}`}
          style={{
            textDecoration: "none",
            textAlign: "center",
            color: "white",
          }}
        >
          <h2 className={styles.productTitle}>{product.name}</h2>
          <img
            className={styles.productImg}
            src={product.imageURL}
            alt={product.name}
          />
        </Link>

        <div className={styles.productPrice}>
          <span className={styles.contentLabel}>PRICE:</span> $ {product.price}
        </div>
        <div className={styles.productCondition}>
          <span className={styles.contentLabel}>Condition:</span>{" "}
          {product.condition ? " New" : " Used"}
        </div>
        <div className={styles.productDescription}>
          <span className={styles.contentLabel}>Description:</span>{" "}
          {product.description}
        </div>
        {user.isAdmin ? (
          <>
            <Link
              to={`/admin/edit-form/${product.id}`}
              className={styles.deleteProduct}
            >
              Edit
            </Link>
            <button
              type="button"
              className={styles.deleteProduct}
              onClick={handleDeleteProduct}
            >
              Delete
            </button>
          </>
        ) : (
          <button
            type="button"
            className={styles.addToCart}
            onClick={handleAddingProductToCart}
          >
            Add to Cart
          </button>
        )}
      </div>
    );
  }
  return (
    <div
      style={{
        backgroundImage: `url("https://res.cloudinary.com/fullstack-academy-student/image/upload/v1651532410/0x0_gcyvwp.jpg")`,
        width: "100vw",
        height: "100%",
        paddingBottom: "10rem",
      }}
    >
      <div className="home">
        <h1>Welcome, {user.username}</h1>
        <p> We Buy From Anywhere In The Galaxy </p>
        <p>We Buy And Sell Used/New products</p>
        <p>The Last PawnShop Left In The Milky Way</p>
        <p>Free Shipping!</p>
      </div>
      <h1 className="title"> Featured Products</h1>
      <div className={styles.postcard}>
        {displayedProducts.map((product) => renderProduct(product))}
      </div>
    </div>
  );
}
export default Home;
