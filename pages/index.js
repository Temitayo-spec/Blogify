import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogBanner from "../components/BlogBanner";
import BlogPosts from "../components/BlogPosts";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Home.module.css";
import axios from "../axios/axios";
import { selectToken } from "../store/token";
import { setUserDetails } from "../store/userSlice";

export const getServerSideProps = async (context) => {
  const query = context.query;
  const { cat } = query;
  const res = await axios.get("/categories");
  const post = await axios.get(`/posts/${cat ? `?cat=${cat}` : ""}`);
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
      const res = await axios.get("/auth/user", {
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

  return (
    <div className={styles.container}>
      <Navbar />
      <BlogBanner />
      <div className={styles.flex__items}>
        <BlogPosts allPosts={posts} />
        <Sidebar categ={categ} />
      </div>
    </div>
  );
}
