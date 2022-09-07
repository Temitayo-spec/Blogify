import styles from "../styles/BlogPosts.module.css";
import Post from "./Post";

const BlogPosts = ({ allPosts }) => {
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
