import React from "react";
import styles from "../style/Footer.module.css";
function Footer({ APIHealth }) {
  const year = new Date().getFullYear();
  return (
    <div className={styles.footer_box}>
      <p>Copyright ⓒ {year} </p>
      {/* <p>API Status: {APIHealth}</p> */}
    </div>
  );
}

export default Footer;
