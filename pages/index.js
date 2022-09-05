import { useEffect } from "react";
import { useDispatch } from "react-redux";
import BlogBanner from "../components/BlogBanner";
import BlogPosts from "../components/BlogPosts";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { setUserDetails } from "../store/loginSlice";
import styles from "../styles/Home.module.css";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(setUserDetails(JSON.parse(localStorage.getItem("user"))));
    }
  }, [dispatch]);
  return (
    <div className={styles.container}>
      <Navbar />
      <BlogBanner />
      <div className={styles.flex__items}>
        <BlogPosts />
        <Sidebar />
      </div>
    </div>
  );
}
