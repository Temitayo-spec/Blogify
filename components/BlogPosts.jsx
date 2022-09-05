import { useEffect, useState } from "react";
import styles from "../styles/BlogPosts.module.css";
import Post from "./Post";
import axios from "../axios/axios";
import { useRouter } from "next/router";

const BlogPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  // getting the search property from useRouter
  const { asPath } = useRouter();

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get(
        `/posts/${asPath ? `${asPath}` : ""}`
      );
      setAllPosts(res.data);
      console.log(res.data.posts);
    };
    getPosts();
  }, [asPath]);
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
