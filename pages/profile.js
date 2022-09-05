/* eslint-disable react-hooks/rules-of-hooks */
import styles from "../styles/Profile.module.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetails, setUserDetails } from "../store/loginSlice";

const profile = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const fileRef = useRef(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(setUserDetails(JSON.parse(localStorage.getItem("user"))));
    }
  }, [dispatch]);

  const userDetails = useSelector(selectUserDetails);

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
                }
              }
              
            })
          );
          console.log(userDetails);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.inner}>
        <Sidebar />
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
          <form className={styles.input__fields}>
            <div className={styles.inputs}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Temitayo"
                value={userDetails?.user?.name}
              />
            </div>
            <div className={styles.inputs}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="olawanletemitayo@gmail.com"
                value={userDetails?.user?.email}
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
