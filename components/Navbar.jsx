import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../store/userSlice";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const userDetails = useSelector(selectUserDetails);
  const [show, setShow] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <Image src="/svgs/icon.svg" alt="logo" height="60%" width="60%" />
          <h1>Blogify</h1>
        </div>
        <div className={`${styles.nav__mid} ${
          show ? styles.nav__mid__show : ""
        }`}>
          <div onClick={() => setShow(false)} className={styles.close__menu}>
            <i className="fas fa-times"></i>
          </div>
          <ul className={styles.nav__link__ctn}>
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/about">
              <a>About</a>
            </Link>
            <Link href="/contact">
              <a>Contact</a>
            </Link>
            <Link href="/write">
              <a>Write</a>
            </Link>
            {userDetails?.user && (
              <li
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("state");
                  window.location.reload();
                }}
              >
                <a>Logout</a>
              </li>
            )}
          </ul>
          <div className={styles.icons__ctn}>
            {/* Fontawesome icons for facebook, instagram, twitter */}
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>
        <div className={styles.nav__right}>
          {/* Fontawesome icons for search, profile */}
          <i className="fas fa-search"></i>
          {userDetails?.user ? (
            <Link href="/profile">
              <a>
                <Image
                  src={`data:${userDetails?.user?.profile?.contentType};base64,${userDetails?.user?.profile?.data}`}
                  alt="profile"
                  height={70}
                  width={70}
                />
              </a>
            </Link>
          ) : (
            <>
              <Link href="/signup">
                <a>Get Started</a>
              </Link>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </>
          )}
        </div>
        <div onClick={() => setShow(true)} className={styles.hamburger__menu}>
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
