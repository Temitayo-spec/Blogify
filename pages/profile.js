import styles from "../styles/Profile.module.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

const profile = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const fileRef = useRef(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const user = true;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (user === true) {
      router.push("/write");
    } else {
      router.push("/signup");
    }
  }, [router, user]);
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.inner}>
        <Sidebar />
        <div className={styles.profile__ctn}>
          <h1>Profile</h1>
          <div className={styles.profile__pic}>
            <Image
              src="/images/nezuko-chan.jpg"
              alt="profile_picture"
              height={80}
              width={80}
              layout="intrinsic"
            />
            <div className={styles.change__pic}>
              <input
                type="file"
                name="fileInput"
                id="fileInput"
                ref={fileRef}
                className="fileinput"
                style={{ display: "none" }}
              />
              <button type="button" onClick={() => fileRef.current.click()}>
                Change Picture
              </button>
            </div>
          </div>
          <form className={styles.input__fields}>
            <div className={styles.inputs}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Temitayo"
              />
            </div>
            <div className={styles.inputs}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="olawanletemitayo@gmail.com"
              />
            </div>
            <div className={styles.inputs}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="********"
              />
            </div>
            <button type="submit">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default profile;
