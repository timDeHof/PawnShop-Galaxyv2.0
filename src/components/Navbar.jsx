import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import "../style/Navbar.module.css";
import useAuth from "../hooks/useAuth";
import "../style/Login.module.css";

function Navbar() {
  const { token, setToken, setUser, user } = useAuth();

  return (
    <ul>
      <li>
        <NavLink activeclassname="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeclassname="active" to="/products">
          Products
        </NavLink>
      </li>
      {token ? (
        <li>
          <NavLink
            activeclassname="active"
            to="/login"
            onClick={() => {
              localStorage.removeItem("token");
              setToken(localStorage.getItem("token"));
              setUser({});
            }}
          >
            Logout
          </NavLink>
        </li>
      ) : (
        <>
          <li>
            <NavLink activeclassname="active" to="/login">
              Log In
            </NavLink>
          </li>
          <li>
            <NavLink activeclassname="active" to="/register">
              Register
            </NavLink>
          </li>
        </>
      )}

      {!user.isAdmin ? (
        <li>
          <NavLink activeclassname="active" to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} />
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink activeclassname="active" to="/admin/dashboard">
            Dashboard
          </NavLink>
        </li>
      )}
    </ul>
  );
}

export default Navbar;
