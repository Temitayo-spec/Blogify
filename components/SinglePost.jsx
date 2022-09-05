/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/SinglePost.module.css";

const SinglePost = ({ eachPost }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        {eachPost?.image && (
          <img
            src={`data:${eachPost?.image?.contentType};base64,${eachPost?.image?.data}`}
            alt=""
          />
        )}
        <div className={styles.heading}>
          <h1>{eachPost?.title}</h1>
          <div className={styles.icons__ctn}>
            <i className="far fa-edit"></i>
            <i className="far fa-trash-alt"></i>
          </div>
        </div>
        <div className={styles.post__details}>
          <span>
            Author:{" "}
            <Link href={`/?user=${eachPost?.username}`}>
              <b>{eachPost?.username}</b>
            </Link>
          </span>
        </div>
        <div className={styles.createdAt}>
          <span>{new Date(eachPost?.createdAt).toDateString()}</span>
        </div>
        <p>{eachPost?.content}</p>
      </div>
    </div>
  );
};

export default SinglePost;
