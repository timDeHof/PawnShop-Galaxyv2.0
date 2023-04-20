import React, { useState } from "react";
import { createProduct } from "../axios-services/products";
import useAuth from "../hooks/useAuth";
import styles from "../style/Register.module.css";

function AdminProductForm() {
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    description: "",
    condition: false,
    imageURL: "",
  });
  const { user } = useAuth();
  return (
    <div>
      {user.isAdmin ? (
        <div className={styles.register_box}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await createProduct(
                formState.name,
                +formState.price,
                formState.description,
                formState.condition,
                formState.imageURL
              );
              console.log(
                "%cNew Product Created",
                `background:linear-gradient(#E66465, #9198E5);padding: .3rem;color: white;border-radius: .5em`
              );
            }}
          >
            <div className={styles.user_box}>
              <input
                id="name"
                value={formState.name}
                type="text"
                onChange={(e) => {
                  setFormState({ ...formState, name: e.target.value });
                }}
                required
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className={styles.user_box}>
              <input
                id="price"
                value={formState.price}
                type="text"
                onChange={(e) => {
                  setFormState({ ...formState, price: e.target.value });
                }}
                required
              />
              <label htmlFor="price">Price</label>
            </div>
            <div className={styles.user_box}>
              <input
                id="description"
                value={formState.description}
                type="text"
                onChange={(e) => {
                  setFormState({ ...formState, description: e.target.value });
                }}
                required
              />
              <label htmlFor="description">Description</label>
            </div>
            <div>Condition</div>
            <input
              value
              type="radio"
              id="new"
              name="condition"
              onChange={() => {
                setFormState({ ...formState, condition: true });
              }}
              required
            />
            <label htmlFor="new">New</label>
            <br />
            <input
              value={false}
              type="radio"
              id="used"
              name="condition"
              onChange={() => {
                setFormState({ ...formState, condition: false });
              }}
              required
            />
            <label htmlFor="used">Used</label>
            <hr />
            <div className={styles.user_box}>
              <input
                id="imageURL"
                value={formState.imageURL}
                type="url"
                onChange={(e) => {
                  setFormState({ ...formState, imageURL: e.target.value });
                }}
                required
              />
              <label htmlFor="imageURL">Image URL</label>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.submit} type="submit">
                <span />
                <span />
                <span />
                <span />
                Add new product
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

export default AdminProductForm;
