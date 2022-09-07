/* eslint-disable @next/next/no-img-element */
import Navbar from "../components/Navbar";
import styles from "../styles/About.module.css";

const about = () => {
  return (
    <div className={styles.about__wrapper}>
      <Navbar />
      <div className={styles.about__inner}>
        <div className={styles.lhs}>
          <h1>
            About Page <br /> is under <span>construction.</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quae. Quisquam, quae. Quisquam, quae. Quisquam, quae. Quisquam,
            quae. Quisquam, quae. Quisquam, quae.
          </p>
        </div>
        <div className={styles.rhs}>
          <img src="/images/construction.jpg" alt="about" />
        </div>
      </div>
    </div>
  );
};

export default about;
