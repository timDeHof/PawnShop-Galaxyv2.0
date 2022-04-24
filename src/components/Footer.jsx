import React from "react";
import "../style/Footer.module.css";
function Footer({ APIHealth }) {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ {year} </p>
      <p>API Status: {APIHealth}</p>
    </footer>
  );
}

export default Footer;
