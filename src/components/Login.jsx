import React, { useState, useRef, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loginUser } from "../axios-services/users";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import styles from "../style/Login.module.css";
import "../style/App.css";
/*  
  validates userName and password. The username must start with a lower or uppercase letter after that it must follow by any six or 23 characters that can be lower or upper case letters, digits, hyphens or underscores.The password requires at least one lower case letter, one uppercase letter, one digit, and one special character and it can be anywhere from eight to twenty four characters.
*/
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{6,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Login() {
  const { setToken, setUser, token, user } = useAuth();
  // States for login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className={styles.login_box}>
      <h2>Log in</h2>
      {!token ? (
        <h2>Please log in or register</h2>
      ) : (
        <h2>Hello, {user ? user.name : "Guest!"}</h2>
      )}

      <form
        onSubmit={async (ev) => {
          ev.preventDefault();
          console.log(
            "%cusername",
            `background:linear-gradient(#E66465, #9198E5);padding: .3rem;color: white;border-radius: .5em`,
            username
          );
          console.log(
            "%cpassword",
            `background:linear-gradient(#E66465, #9198E5);padding: .3rem;color: white;border-radius: .5em`,
            password
          );
          const result = await loginUser(username, password);

          localStorage.setItem("token", result.token);
          setToken(result.token);

          setUsername("");
          setPassword("");

          navigate("/", { replace: true });
        }}
      >
        <div className={styles.user_box}>
          <input
            value={username}
            type="text"
            required
            min="6"
            onChange={(ev) => {
              setUsername(ev.target.value);
            }}
          />
          <label>Username</label>
        </div>
        <div className={styles.user_box}>
          <input
            value={password}
            type="password"
            min="8"
            required
            onChange={(ev) => {
              setPassword(ev.target.value);
            }}
          />
          <label>Password</label>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.submit} type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Log in
          </button>
        </div>
        <div className={styles.buttonContainer}>
          <Link to="/register">
            <button className={styles.submit} type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Create Account
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
