import React, { useState } from "react";
import { registerUser } from "../axios-services/users";
import useAuth from "../hooks/useAuth";

function Register() {
  const { setToken } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  return (
    <div>
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

            // history.push("/");
          } catch (error) {
            throw error;
          }
        }}
      >
        <input
          value={username}
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
          minLength="10"
        />
        <input
          value={password}
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          minLength="10"
        />
        <input
          value={name}
          type="text"
          placeholder="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
        <input
          value={shippingAddress}
          type="text"
          placeholder="shipping address"
          onChange={(e) => {
            setShippingAddress(e.target.value);
          }}
          required
        />
        <input
          value={billingAddress}
          type="text"
          placeholder="Billing Address"
          onChange={(e) => {
            setBillingAddress(e.target.value);
          }}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
