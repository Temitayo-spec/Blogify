/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading, setIsLoading } from "../store/writeSlice";
import styles from "../styles/SinglePost.module.css";
import SmallSpinner from "./SmallSpinner";
import axios from "../axios/axios";
import Popup from "./Popup";
import { selectToken } from "../store/token";
import { selectUserDetails } from "../store/userSlice";

const SinglePost = ({ eachPost, handleDelete }) => {
  const userDetails = useSelector(selectUserDetails);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(eachPost.title);
  const [body, setBody] = useState(eachPost.content);
  const [isEdit, setIsEdit] = useState(false);
  const loading = useSelector(selectIsLoading);
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    status: "",
  });
  const token = useSelector(selectToken);

  if (popup.show) {
    setTimeout(() => {
      setPopup({ show: false, message: "", status: "" });
    }, 3000);
  }

  const handleUpdate = () => {
    dispatch(setIsLoading(true));
    axios
      .put(
        `/posts/${eachPost._id}`,
        {
          title,
          content: body,
          username: userDetails.user.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setIsEdit(false);
        dispatch(setIsLoading(false));
        setPopup({
          show: true,
          message: "Post updated successfully",
          status: "success",
        });

        // reload the page
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        setPopup({
          show: true,
          message: "Something went wrong",
          status: "error",
        });
      });

    setIsEdit(false);
  };

  return (
    <div className={styles.wrapper}>
      {popup.show && (
        <Popup
          show={popup.show}
          message={popup.message}
          status={popup.status}
          close={() => setPopup({ show: false, message: "", status: "" })}
        />
      )}
      <div className={styles.inner}>
        {eachPost?.image && (
          <img
            src={`data:${eachPost?.image?.contentType};base64,${eachPost?.image?.data}`}
            alt=""
          />
        )}
        <div className={styles.heading}>
          {isEdit ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          ) : (
            <h1>{eachPost?.title}</h1>
          )}
          {eachPost?.username === userDetails?.user?.name && (
            <div className={styles.icons__ctn}>
              <i onClick={() => setIsEdit(true)} className="far fa-edit"></i>
              <i onClick={handleDelete} className="far fa-trash-alt"></i>
            </div>
          )}
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
        {isEdit ? (
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        ) : (
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: eachPost?.content,
            }}
          ></div>
        )}
        {isEdit && (
          <button
            onClick={() => {
              handleUpdate();
            }}
            className={styles.update__btn}
          >
            Save {loading && <SmallSpinner />}
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
