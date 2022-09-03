import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Login.module.css";

const login = () => {
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
          Login into your Account<span>.</span>
        </h1>
        <form className={styles.input__fields}>
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
          <div className={styles.links}>
            <button type="submit">Sign In</button>
            <Link href="/signup">
              <a>
                Get Started with <span>Blogify.</span>
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default login;
