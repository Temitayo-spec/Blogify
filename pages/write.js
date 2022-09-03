/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Write.module.css";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { useEffect } from "react";

const write = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const user = true;

    if (user === true) {
      router.push("/write");
    } else {
      router.push("/signup");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.write__wrapper}>
      <Navbar />
      <div className={styles.write__inner}>
        <img
          src="/images/nezuko-chan.jpg"
          alt=""
          className={styles.write__img}
        />
        <form action="" className={styles.form}>
          <div className={styles.heading}>
            <div className={styles.file__input}>
              <label htmlFor="fileInput">
                <i className="fas fa-plus"></i>
                <span>Add an image</span>
              </label>
              <input
                type="file"
                name="fileInput"
                id="fileInput"
                style={{ display: "none" }}
              />
              <button type="submit" className={styles.submit__btn}>
                Publish
              </button>
            </div>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              autoFocus
            />
          </div>
          <div className={styles.write__input}>
            <textarea
              placeholder="Tell your story..."
              className={styles.write__input}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default write;
