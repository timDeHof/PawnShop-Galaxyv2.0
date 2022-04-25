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
          <NavLink activeclassname="active" to="/Products">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink activeclassname="active" to="/Login">
            Log In
          </NavLink>
        </li>
        <li>
          <NavLink activeclassname="active" to="/Register">
            Register
          </NavLink>
        </li>
        <li>
          <NavLink activeclassname="active" to="/Cart">
           Cart
          </NavLink>
        </li>
      </ul>
      {/* <h1>Welcome, {user.username} !</h1> */}
    </>
  );
}

export default Navbar;
