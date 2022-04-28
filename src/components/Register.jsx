import React, { useState } from "react";
import { registerUser } from "../axios-services/users";
import useAuth from "../hooks/useAuth";
import styles from "../style/Register.module.css";
import { useNavigate } from "react-router-dom"

function Register() {
  const { setToken } = useAuth();
  // States for registration
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  const navigate = useNavigate()
  return (
    <div className={styles.register_box}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const result = await registerUser(
              username,
              password,
              name,
              shippingAddress,
              billingAddress
            );

            localStorage.setItem("token", result.token);
            setToken(result.token);

            navigate("/", { replace: true });
          } catch (error) {
            throw error;
          }

        }}
      >
        <div className={styles.user_box}>
          <input
            value={username}
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
            minLength="6"
          />
          <label>Username</label>
        </div>
        <div className={styles.user_box}>
          <input
            value={password}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            minLength="8"
          />
          <label>Password</label>
        </div>
        <div className={styles.user_box}>
          <input
            value={name}
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
          <label>Name</label>
        </div>
        <div className={styles.user_box}>
          <input
            value={shippingAddress}
            type="text"
            onChange={(e) => {
              setShippingAddress(e.target.value);
            }}
            required
          />
          <label>Shipping address</label>
        </div>
        <div className={styles.user_box}>
          <input
            value={billingAddress}
            type="text"
            onChange={(e) => {
              setBillingAddress(e.target.value);
            }}
            required
          />
          <label>Billing address</label>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.submit} type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
