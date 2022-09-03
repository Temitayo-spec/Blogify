import { useEffect, useState } from "react";
import styles from "../styles/BlogPosts.module.css";
import Post from "./Post";
import axios from "../axios/axios";

const BlogPosts = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get("/posts");
      setAllPosts(res.data);
      console.log(res.data.posts);
    };
    getPosts();
  }, []);
  return (
    <div className={styles.posts__wrapper}>
      <div className={styles.posts__inner}>
        {allPosts?.posts?.map((post) => (
          <Post key={post?._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
