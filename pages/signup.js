/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import {
  isLoading,
  selectPassword,
  selectUser,
  setIsLoading,
  setUser,
} from "../store/signupSlice";
import styles from "../styles/Signup.module.css";
import axios from "../axios/axios";
import Image from "next/image";
import Popup from "../components/Popup";
import SmallSpinner from "../components/SmallSpinner";

const signup = () => {
  const [confirm_password, setConfirmPassword] = useState("");
  const loading = useSelector(isLoading);
  const [section, setSection] = useState(1);
  const [picture, setPicture] = useState("");
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    status: "",
  });
  const newUser = useSelector(selectUser);
  const fileRef = useRef(null);
  const router = useRouter();
  // const user = true;
  const dispatch = useDispatch();

  // remove popup after 3 seconds
  if (popup.show) {
    setTimeout(() => {
      setPopup({ show: false, message: "", status: "" });
    }, 3000);
  }

  // onload check if user is logged in
  useEffect(() => {
    if (localStorage.getItem("user")) {
      router.push("/");
    }
  }, [router]);

  // clear the input fields
  useEffect(() => {
    dispatch(setUser({ username: "", email: "", password: "" }));
  }, [dispatch]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    // check if extension is valid
    const validExtensions = ["jpg", "jpeg", "png"];
    const extension = file.name.split(".").pop();
    if (!validExtensions.includes(extension)) {
      alert("Invalid file type");
      return;
    } else {
      dispatch(setUser({ field: "profile", value: file }));
    }

    // check if file size is less then 2mb
    if (file.size > 2 * 1024 * 1024) {
      setPopup({
        show: true,
        message: "File size is too large",
        status: "error",
      });
      return;
    }

    reader.onloadend = () => {
      setPicture(reader.result);
    };
  };

  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(setIsLoading(true));
    if (newUser?.password === confirm_password) {
      const formData = new FormData();
      formData.append("name", newUser?.username);
      formData.append("email", newUser?.email);
      formData.append("password", newUser?.password);
      formData.append("profile", newUser?.profile);

      axios.post("/auth/register", formData).then((res) => {
        console.log(res);
        if (res.data.success === true) {
          dispatch(setIsLoading(false));
          dispatch(setUserDetails(res.data));
          setPopup({
            show: true,
            message: res.data.message,
            status: "success",
          });
          router.push("/login");
        }
      });
    } else {
      setPopup({
        show: true,
        message: "Password does not match",
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
          Get started with <span>Blogify.</span>
        </h1>
        <form onSubmit={formSubmit} className={styles.input__fields}>
          {section === 1 && (
            <>
              <div className={styles.inputs}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter a username"
                  value={newUser?.username}
                  onChange={(e) =>
                    dispatch(
                      setUser({ field: "username", value: e.target.value })
                    )
                  }
                />
              </div>
              <div className={styles.inputs}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter an email address"
                  value={newUser?.email}
                  onChange={(e) =>
                    dispatch(setUser({ field: "email", value: e.target.value }))
                  }
                />
              </div>
              <div className={styles.inputs}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="************"
                  value={newUser?.password}
                  onChange={(e) =>
                    dispatch(
                      setUser({ field: "password", value: e.target.value })
                    )
                  }
                />
              </div>
              <div className={styles.inputs}>
                <label htmlFor="password">Confirm Password</label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="************"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className={styles.links}>
                {confirm_password === newUser?.password ? (
                  <button type="button" onClick={() => setSection(section + 1)}>
                    Next
                  </button>
                ) : (
                  <button type="button" disabled>
                    Next
                  </button>
                )}
                <Link href="/login">
                  <a>
                    Already have an account? <span>Sign In.</span>
                  </a>
                </Link>
              </div>
            </>
          )}

          {section === 2 && (
            <div className={styles.upload__profile__picture}>
              <div className={styles.upload__profile__picture__inner}>
                <h2>Upload a picture</h2>
                <div className={styles.upload__profile__picture__inner__image}>
                  {picture ? (
                    <Image
                      src={picture}
                      alt="profile picture"
                      width={200}
                      height={200}
                      objectFit="cover"
                    />
                  ) : (
                    <i className="fas fa-user-circle"></i>
                  )}

                  <input
                    ref={fileRef}
                    type="file"
                    name="profile"
                    id="profile"
                    onChange={handleFile}
                  />

                  <div className={styles.button__ctn}>
                    <button
                      onClick={() => fileRef.current.click()}
                      type="button"
                      className={styles.upload__btn}
                    >
                      Upload
                    </button>
                    <button
                      onClick={() => fileRef.current.click()}
                      type="button"
                      className={styles.remove__btn}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.links}>
                <div className={styles.button}>
                  <button type="submit" className={styles.submit__btn}>
                    Sign Up
                    {loading && <SmallSpinner />}
                  </button>
                  <button type="button" onClick={() => setSection(section - 1)}>
                    Back
                  </button>
                </div>
                <Link href="/login">
                  <a>
                    Already have an account? <span>Sign In.</span>
                  </a>
                </Link>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default signup;
