/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Popup from "../components/Popup";
import {
  isLoading,
  selectLoginUser,
  setIsLoading,
  setUser,
} from "../store/loginSlice";
import { setToken, selectToken } from "../store/token";
import styles from "../styles/Login.module.css";
import axios from "axios";
import SmallSpinner from "../components/SmallSpinner";

const login = () => {
  const loading = useSelector(isLoading);
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    status: "",
  });
  const loginUser = useSelector(selectLoginUser);

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [router, token]);

  if (popup.show) {
    setTimeout(() => {
      setPopup({ show: false, message: "", status: "" });
    }, 3000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setIsLoading(true));

    const body = {
      email: loginUser.email,
      password: loginUser.password,
    };

    try {
      const res = await axios.post("/auth/login", body);
      if (res.status === 200) {
        dispatch(setIsLoading(false));
        dispatch(setToken(res.data.token));
        localStorage.setItem("user", JSON.stringify(res.data));
        router.push("/");
        setPopup({
          show: true,
          message: "Login successful",
          status: "success",
        });
      }
    } catch (error) {
      dispatch(setIsLoading(false));
      setPopup({
        show: true,
        message: error.response.data.message,
        status: "error",
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <Navbar />
      {popup.show && (
        <Popup
          message={popup.message}
          status={popup.status}
          close={() => setPopup({ show: false, message: "", status: "" })}
        />
      )}
      <div className={styles.inner}>
        <h1>
          Login into your {" "} <span>Account.</span>
        </h1>
        <form onSubmit={handleSubmit} className={styles.input__fields}>
          <div className={styles.inputs}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="olawanletemitayo@gmail.com"
              onChange={(e) =>
                dispatch(setUser({ field: "email", value: e.target.value }))
              }
              value={loginUser?.email}
            />
          </div>
          <div className={styles.inputs}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              onChange={(e) =>
                dispatch(setUser({ field: "password", value: e.target.value }))
              }
              value={loginUser?.password}
            />
          </div>
          <div className={styles.links}>
            <button type="submit" className={styles.submit__btn}>
              Sign In
              {loading && <SmallSpinner />}
            </button>
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
