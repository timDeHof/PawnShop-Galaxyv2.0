import React from "react";
import Navbar from "../components/Navbar";
import styles from "../style/Header.module.css";

function Header() {
  return (
    <header className={styles.header_box}>
      <h1 className={styles.header_title}>galactic pawn</h1>
      <Navbar />
    </header>
  );
}

export default Header;
