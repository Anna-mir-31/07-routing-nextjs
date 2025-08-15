// components/Footer.tsx
import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
      <div className={styles.wrap}>
        <span>Developer: Anna Chernobrovenko</span>
        <span>
          Contact us: {" "}
          <a href="mailto:student@notehub.app">student@notehub.app</a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
