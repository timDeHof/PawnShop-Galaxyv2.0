import React from "react";
import { useLocation } from "react-router-dom";
import styles from "../style/Footer.module.css";

function Footer() {
  const { pathname } = useLocation();

  const year = new Date().getFullYear();
  return (
    <footer
      className={styles.footer_box}
      style={{ position: pathname === "/login" ? "absolute" : "initial" }}
    >
      <p>Copyright ⓒ {year} </p>
      {/* <p>API Status: {APIHealth}</p> */}
    </footer>
  );
}

export default Footer;
