/* eslint-disable react-hooks/rules-of-hooks */
import styles from "../styles/Profile.module.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SmallSpinner from "../components/SmallSpinner";
import { selectIsLoading, setIsLoading } from "../store/writeSlice";
import axios from "../axios/axios";
import Popup from "../components/Popup";
import { selectToken } from "../store/token";
import { selectUserDetails, setUserDetails } from "../store/userSlice";

export const getServerSideProps = async () => {
  const res = await axios.get("/categories");
  return {
    props: {
      categ: res.data,
    },
  };
};

const profile = ({ categ }) => {
  const fileRef = useRef(null);
  const router = useRouter();
  const userDetails = useSelector(selectUserDetails);
  const dispatch = useDispatch();
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    status: "",
  });
  const [show, setShow] = useState("right");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const loading = useSelector(selectIsLoading);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (popup.show) {
    setTimeout(() => {
      setPopup({ show: false, message: "", status: "" });
    }, 3000);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUser = async () => {
    await axios
      .get("/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setUserDetails(res.data));
      });
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, dispatch]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          dispatch(
            setUserDetails({
              ...userDetails,
              user: {
                ...userDetails.user,
                profile: {
                  ...userDetails.user.profile,
                  data: reader.result.split(",")[1],
                },
              },
            })
          );
        }
      };
      setFile(file);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    username && formData.append("name", username);
    email && formData.append("email", email);
    password && formData.append("password", password);
    file && formData.append("profile", file);
    dispatch(setIsLoading(true));
    axios
      .put("/auth/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setIsLoading(false));
        getUser();
        setPopup({
          show: true,
          message: "Profile updated successfully",
          status: "success",
        });
        // set input fields to empty
        setUsername("");
        setEmail("");
        setPassword("");
        setFile(null);
        setTimeout(() => {
          router.push("/profile");
        }, 1500);
      })
      .catch((err) => {
        dispatch(setIsLoading(false));
        console.log(err);
      });
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
      <div className={styles.arrow__ctn}>
        {show === "left" ? (
          <div onClick={() => setShow("right")} className={styles.arrow__left}>
            <i className="fas fa-arrow-left"></i>
          </div>
        ) : (
          <div onClick={() => setShow("left")} className={styles.arrow__right}>
            <i className="fas fa-arrow-right"></i>
          </div>
        )}
      </div>
      <div className={styles.inner}>
        <Sidebar categ={categ} show={show} />
        <div className={styles.profile__ctn}>
          <h1>Profile</h1>

          <div className={styles.profile__pic}>
            <Image
              src={`data:${userDetails?.user?.profile?.contentType};base64,${userDetails?.user?.profile?.data}`}
              alt="profile_picture"
              height={150}
              width={150}
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
                onChange={handleFileChange}
              />
              <button type="button" onClick={() => fileRef.current.click()}>
                Change Picture
              </button>
            </div>
          </div>
          <form onSubmit={onUpdate} className={styles.input__fields}>
            <div className={styles.inputs}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder={userDetails?.user?.name}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.inputs}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder={userDetails?.user?.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputs}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className={styles.submit__btn} type="submit">
              Update Profile {loading && <SmallSpinner />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default profile;
