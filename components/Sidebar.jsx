/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import styles from "../styles/Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar__inner}>
        <header className={styles.header}>
          <h2>About me</h2>
          <img
            src="/images/profile.jpg"
            alt="profile"
            className={styles.profile}
          />
          <p>
            I am a software engineer based in the Nigeria. I am a self-taught
            developer and I am passionate about building things that people love
            to use.
          </p>
        </header>
        <div className={styles.sidebar__item}>
          <h3>Categories</h3>
          <ul>
            <li>
              <a href="#">Life</a>
            </li>
            <li>
              <a href="#">Music</a>
            </li>
            <li>
              <a href="#">Style</a>
            </li>
            <li>
              <a href="#">Sport</a>
            </li>
            <li>
              <a href="#">Tech</a>
            </li>
            <li>
              <a href="#">Cinema</a>
            </li>
          </ul>
        </div>
        <div className={styles.sidebar__item}>
          <h3>Social</h3>
          <div className={styles.icons__ctn}>
            {/* Fontawesome icons for facebook, instagram, twitter */}
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
