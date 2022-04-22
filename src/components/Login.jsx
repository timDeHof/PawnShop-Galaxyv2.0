import React, { useState } from "react";
import { loginUser } from "../axios-services/users";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setToken, setUser, token } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="login">
      <form
        className="form"
        onSubmit={async (ev) => {
          ev.preventDefault();
          console.log("username password:", username, password);
          const result = await loginUser(username, password);

          localStorage.setItem("token", result.token);
          setToken(result.token);
          console.log("token:", token);

          setUsername("");
          setPassword("");

          // navigate("/", { replace: true });
        }}
      >
        <input
          value={username}
          type="text"
          placeholder="username"
          onChange={(ev) => {
            setUsername(ev.target.value);
          }}
          min="10"
          required
        />
        <input
          value={password}
          type="password"
          placeholder="password"
          onChange={(ev) => {
            setPassword(ev.target.value);
          }}
          min="10"
          required
        />
        <button type="submit">Log in</button>
      </form>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          setToken(localStorage.getItem("token"));
          setUser({});
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Login;
