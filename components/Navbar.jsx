import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const user = false;
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <Image src="/svgs/icon.svg" alt="logo" height="60%" width="60%" />
          <h1>Blogify</h1>
        </div>
        <div className={styles.nav__mid}>
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
            {user && (
              <Link href="/logout">
                <a>Logout</a>
              </Link>
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
          {user ? (
            <Image
              src="/images/nezuko-chan.jpg"
              alt="profile"
              height={70}
              width={70}
            />
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
      </div>
    </div>
  );
};

export default Navbar;
