import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../axios-services/products";
import useAuth from "../hooks/useAuth";
import styles from "../style/Register.module.css";

function AdminEditForm() {
  const [productToEdit, setProductToEdit] = useState({});

  const { user } = useAuth();

  const { productId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductById(productId);
      setProductToEdit(product);
    };
    fetchProduct();
  }, []);
  return (
    <div>
      {user.isAdmin ? (
        <div className={styles.register_box}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await updateProduct(
                productId,
                productToEdit.name,
                +productToEdit.price,
                productToEdit.description,
                productToEdit.condition,
                productToEdit.imageURL
              );

              navigate("/products", { replace: true });
            }}
          >
            <div className={styles.user_box}>
              <input
                id="name"
                value={productToEdit.name}
                type="text"
                onChange={(e) => {
                  setProductToEdit({
                    ...productToEdit,
                    name: e.target.value,
                  });
                }}
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className={styles.user_box}>
              <input
                value={productToEdit.price}
                id="price"
                type="text"
                onChange={(e) => {
                  setProductToEdit({
                    ...productToEdit,
                    price: e.target.value,
                  });
                }}
              />
              <label htmlFor="price">Price</label>
            </div>
            <div className={styles.user_box}>
              <input
                id="description"
                value={productToEdit.description}
                type="text"
                onChange={(e) => {
                  setProductToEdit({
                    ...productToEdit,
                    description: e.target.value,
                  });
                }}
              />
              <label htmlFor="description">Description</label>
            </div>
            <div className={styles.user_box}>
              <p>Condition</p>
              <div className={styles.condition_box}>
                <label htmlFor="new">New</label>
                <input
                  value
                  type="radio"
                  id="new"
                  name="condition"
                  checked={productToEdit.condition}
                  onChange={() => {
                    setProductToEdit({ ...productToEdit, condition: true });
                  }}
                />
              </div>
              {/* <br></br> */}
              <div className={styles.condition_box}>
                <label htmlFor="used">Used</label>
                <input
                  value={false}
                  type="radio"
                  id="used"
                  name="condition"
                  checked={!productToEdit.condition}
                  onChange={() => {
                    setProductToEdit({ ...productToEdit, condition: false });
                  }}
                />
              </div>
            </div>
            <hr />
            <div className={styles.user_box}>
              <input
                id="imageURL"
                value={productToEdit.imageURL}
                type="url"
                onChange={(e) => {
                  setProductToEdit({
                    ...productToEdit,
                    imageURL: e.target.value,
                  });
                }}
              />
              <label htmlFor="imageURL">Image URL</label>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.submit} type="submit">
                <span />
                <span />
                <span />
                <span />
                Update Product
              </button>
            </div>
          </form>
        </div>
      ) : (
        <h2>You&apos;re not authorized to view this page :/</h2>
      )}
    </div>
  );
}

export default AdminEditForm;
