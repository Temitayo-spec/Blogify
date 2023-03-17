import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogBanner from "../components/BlogBanner";
import BlogPosts from "../components/BlogPosts";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { selectToken } from "../store/token";
import { setUserDetails } from "../store/userSlice";

export const getServerSideProps = async (context) => {
  const query = context.query;
  const { cat } = query;
  const res = await axios.get("/api/category/getCategories");
  const post = await axios.get(`/api/post/${cat ? `?cat=${cat}` : ""}`);
  return {
    props: {
      categ: res.data,
      posts: post.data,
    },
  };
};

export default function Home({ categ, posts }) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    const getUserDetails = async () => {
      const res = await axios.get("/api/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setUserDetails(res.data));
    };
    if (token) {
      getUserDetails();
    }
  }, [token, dispatch]);

  const [show, setShow] = useState("right");

  return (
    <div className={styles.container}>
      <Navbar />
      <BlogBanner />
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
      <div className={styles.flex__items}>
        <BlogPosts allPosts={posts} />
        <Sidebar categ={categ} show={show} />
      </div>
    </div>
  );
}
