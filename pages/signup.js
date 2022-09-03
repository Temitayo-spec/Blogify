import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Signup.module.css";

const signup = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const user = true;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (user === true) {
      router.push("/");
    }
  }, [router, user]);
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.inner}>
        <h1>
          Get started with Blogify<span>.</span>
        </h1>
        <form className={styles.input__fields}>
          <div className={styles.inputs}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter a username"
            />
          </div>
          <div className={styles.inputs}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter an email address"
            />
          </div>
          <div className={styles.inputs}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="************"
            />
          </div>
          <div className={styles.inputs}>
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="************"
            />
          </div>
          <div className={styles.links}>
            <button type="submit">Sign Up</button>
            <Link href="/login">
              <a>
                Already have an account? <span>Sign In.</span>
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default signup;
