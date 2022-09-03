/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Blogbanner.module.css";

const BlogBanner = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.blogify__texts}>
          <h1>Blogify</h1>
          <p>
            A place to share your thoughts and ideas.
            <br />
            Built with Next.js, and Redux Toolkit for state management,
            <br />
            Node.js, and <span> MongoDB.</span>
          </p>
        </div>
        <div className={styles.banner__img}>
          <img src="/images/banner-illustration.png" alt="blogbanner" />
        </div>
      </div>
    </div>
  );
};

export default BlogBanner;
