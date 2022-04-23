import React from "react";
import Navbar from "../components/Navbar";
import styles from "../style/Header.module.css";

function Header() {
  return (
    <div className={styles.header_box}>
      <header>
        <h1>galactic pawn</h1>
        <nav className={styles.navbar}>{<Navbar />}</nav>
      </header>
    </div>
  );
}

export default Header;
