import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import styles from "../style/Header.module.css";

function Header() {
  return (
    <header className={styles.header_box}>
      <Link className={styles.header_title} to="/">
        galactic pawn
      </Link>
      <Navbar />
    </header>
  );
}

export default Header;
