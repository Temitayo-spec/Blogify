import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../store/userSlice";
import { motion } from "framer-motion";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const userDetails = useSelector(selectUserDetails);
  const [show, setShow] = useState(false);

  const textVariants = {
    offscreen: {
      x: -100,
      opacity: 0,
    },
    onscreen: {
      x: 0,
      opacity: 1,

      transition: {
        type: "tween",
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <Image src="/svgs/icon.svg" alt="logo" height="60%" width="60%" />
          <h1>Blogify</h1>
        </div>
        <div
          className={`${styles.nav__mid} ${show ? styles.nav__mid__show : ""}`}
        >
          <div onClick={() => setShow(false)} className={styles.close__menu}>
            <i className="fas fa-times"></i>
          </div>
          <motion.ul
            initial={window.innerWidth > 500 || show ? "onscreen" : "offscreen"}
            whileInView={
              window.innerWidth > 500 || show ? "onscreen" : "offscreen"
            }
            transition={{ staggerChildren: 0.5 }}
            className={styles.nav__link__ctn}
          >
            <Link href="/">
              <motion.a variants={textVariants} onClick={() => setShow(false)}>
                Home
              </motion.a>
            </Link>
            <Link href="/about">
              <motion.a variants={textVariants} onClick={() => setShow(false)}>
                About
              </motion.a>
            </Link>
            <Link href="/contact">
              <motion.a variants={textVariants} onClick={() => setShow(false)}>
                Contact
              </motion.a>
            </Link>
            <Link href="/write">
              <motion.a variants={textVariants} onClick={() => setShow(false)}>
                Write
              </motion.a>
            </Link>
            {userDetails?.user && (
              <motion.li
                variants={textVariants}
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("state");
                  window.location.reload();
                  setShow(false);
                }}
              >
                <motion.a variants={textVariants}>Logout</motion.a>
              </motion.li>
            )}
          </motion.ul>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            transition={{ staggerChildren: 0.1 }}
            className={styles.icons__ctn}
          >
            {/* Fontawesome icons for facebook, instagram, twitter */}
            <motion.i
              variants={textVariants}
              className="fab fa-facebook-f"
            ></motion.i>
            <motion.i
              variants={textVariants}
              className="fab fa-instagram"
            ></motion.i>
            <motion.i
              variants={textVariants}
              className="fab fa-twitter"
            ></motion.i>
          </motion.div>
        </div>
        <div className={`${styles.nav__right} ${show ? styles.show : ""}`}>
          {/* Fontawesome icons for search, profile */}
          <i className="fas fa-search"></i>
          {userDetails?.user ? (
            <Link href="/profile">
              <a onClick={() => setShow(false)}>
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
