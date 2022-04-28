import React from "react";
import { NavLink } from "react-router-dom";
import "../style/Navbar.module.css";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { user } = useAuth();

  //console.log("USER FROM APP.JS", user);

  return (
    <>
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
        <li>
          <NavLink activeclassname="active" to="/cart">
           Cart
          </NavLink>
        </li>
      </ul>
      {/* <h1>Welcome, {user.username} !</h1> */}
    </>
  );
}

export default Navbar;
