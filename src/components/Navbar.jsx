import React from "react";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

function Navbar() {
  const { user } = useAuth();

  //console.log("USER FROM APP.JS", user);

  return (
    <div className="navbar">
      <nav>
        {/* <h1>Welcome, {user.username} !</h1> */}
        <Link to="/">Home </Link>

        <Link to="/Login">Log In </Link>
      </nav>
    </div>
  );
}

export default Navbar;
