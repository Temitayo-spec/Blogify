import { useEffect } from "react";
import { useDispatch } from "react-redux";
import BlogBanner from "../components/BlogBanner";
import BlogPosts from "../components/BlogPosts";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { setUserDetails } from "../store/loginSlice";
import styles from "../styles/Home.module.css";
import axios from "../axios/axios";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    
    axios.get("/auth/user", {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
      },
    }).then((res) => {
      dispatch(setUserDetails(res.data));
      console.log(res.data);
    });
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
