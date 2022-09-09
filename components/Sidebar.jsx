/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Sidebar.module.css";
import Link from "next/link";
import { motion } from "framer-motion";

const Sidebar = (
  { categ, show } // destructuring the props
) => {
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

  const imageVariants = {
    offscreen: {
      // scaling the image from 0 to 1
      scale: 0,
      opacity: 0,
    },
    onscreen: {
      scale: 1,
      opacity: 1,

      transition: {
        type: "tween",
        duration: 1,
        ease: "easeInOut",
      },
    },
  };
  return (
    <div className={`${styles.wrapper} ${show === "right" ? styles.hide : ""}`}>
      <div className={styles.sidebar__inner}>
        <motion.header
          initial={show === "right" ? "offscreen" : "onscreen"}
          animate={show === "right" ? "offscreen" : "onscreen"}
          transition={{ staggerChildren: 0.5 }}
          className={styles.header}
        >
          <motion.h2 variants={textVariants}>About me</motion.h2>
          <motion.img
            variants={imageVariants}
            src="/images/profile.jpg"
            alt="profile"
            className={styles.profile}
          />
          <motion.p variants={textVariants}>
            I am a software engineer based in the Nigeria. I am a self-taught
            developer and I am passionate about building things that people love
            to use.
          </motion.p>
        </motion.header>
        <div className={styles.sidebar__item}>
          <h3>Categories</h3>
          <ul>
            {categ?.categories?.map((c) => (
              <li key={c?._id}>
                <Link href={`/?cat=${c?.name}`}>
                  <a href="#">{c?.name}</a>
                </Link>
              </li>
            ))}
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
