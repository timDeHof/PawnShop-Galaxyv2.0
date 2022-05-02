import React from "react";
import styles from "../style/Footer.module.css";
function Footer({ APIHealth }) {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer_box}>
      <p>Copyright ⓒ {year} </p>
      {/* <p>API Status: {APIHealth}</p> */}
    </footer>
  );
}

export default Footer;
