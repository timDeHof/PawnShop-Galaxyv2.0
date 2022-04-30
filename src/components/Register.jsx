import React, { useState, useRef, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { registerUser } from "../axios-services/users";
import useAuth from "../hooks/useAuth";
import styles from "../style/Register.module.css";
import { useNavigate } from "react-router-dom";

/*  
  validates userName and password. The username must start with a lower or uppercase letter after that it must follow by any six or 23 characters that can be lower or upper case letters, digits, hyphens or underscores.The password requires at least one lower case letter, one uppercase letter, one digit, and one special character and it can be anywhere from eight to twenty four characters.
*/
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{6,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
  // allows us to set the focus on the user input when the component loads
  const userRef = useRef();
  // allows us to set the focus on if we get an error
  const errRef = useRef();

  const { setToken } = useAuth();
  // States for username registration
  const [username, setUsername] = useState("");
  const [validUserName, setValidUserName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);
  // States for password registration
  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  // States for password confirmation
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  // state for an error message
  const [errMsg, setErrMsg] = useState("");
  // state for a successful form submission
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  const navigate = useNavigate();

  // hook that sets the focus on the username input when the component loads
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // hook where we validate the username
  useEffect(() => {
    const result = USER_REGEX.test(username);
    console.log(result);
    console.log(username);
    setValidUserName(result);
  }, [username]);

  // hook where we validate the password
  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    const match = password === matchPwd;
    setValidMatch(match);
  }, [password, matchPwd]);

  // hook for displaying an error message
  useEffect(() => {
    setErrMsg("");
  }, [username, password, matchPwd]);

  return (
    <section className={styles.register_box}>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Register</h1>
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
            type="text"
            value={username}
            ref={userRef}
            autoComplete="off"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
            //minLength="6"
            aria-invalid={validUserName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserNameFocus(true)}
            onBlur={() => setUserNameFocus(false)}
          />
          <label htmlFor="username">
            Username:
            <span className={validUserName ? styles.valid : styles.hide}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span
              className={
                validUserName || !username ? styles.hide : styles.invalid
              }
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <p
            id="uidnote"
            className={
              userNameFocus && username && !validUserName
                ? styles.instruction
                : styles.offscreen
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            6 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
        </div>
        <div className={styles.user_box}>
          <input
            value={password}
            id="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            //minLength="8"
          />
          <label htmlFor="password">
            Password:
            <span className={validPwd ? styles.valid : styles.hide}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span
              className={validPwd || !password ? styles.hide : styles.invalid}
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <p
            id="pwdnote"
            className={
              pwdFocus && !validPwd ? styles.instruction : styles.offscreen
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Letters, numbers, underscores, hyphens allowed.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>
        </div>
        <div className={styles.user_box}></div>
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
    </section>
  );
}

export default Register;
