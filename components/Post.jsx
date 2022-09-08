/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Post.module.css";
import Link from "next/link";

const Post = ({ post }) => {
  return (
    <Link href={`/post/${post._id}`}>
      <a>
        <div className={styles.wrapper}>
          <div className={styles.post__inner}>
            {post.image.data ? (
              <img
                src={`data:${post.image.contentType};base64,${post.image.data}`}
                alt=""
              />
            ) : (
              ""
            )}
            <div className={styles.post__details}>
              <div className={styles.post__categ}>
                {post?.categories?.map((categ) => (
                  <span key={categ} className={styles.categ}>
                    {categ}
                  </span>
                ))}
              </div>
              <div className={styles.post__title}>{post.title}</div>
            </div>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html: post?.content,
              }}
            ></div>
            <div className={styles.createdAt}>
              {new Date(post.createdAt).toDateString()}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Post;
