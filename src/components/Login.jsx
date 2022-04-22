import React, { useState } from "react";
import { loginUser } from "../axios-services/users";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setToken, setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="login">
      <h1>This is the login page</h1>
      <form
        className="form"
        onSubmit={async (ev) => {
          ev.preventDefault();

          const result = await loginUser(username, password);

          localStorage.setItem("token", result.token);
          setToken(result.token);

          setUsername("");
          setPassword("");

          navigate("/Home", { replace: true });
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
          setToken(null);
          setUser({});
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Login;
