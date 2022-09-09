/* eslint-disable react-hooks/rules-of-hooks */
import styles from "../../styles/MoreDetails.module.css";
import Sidebar from "../../components/Sidebar";
import SinglePost from "../../components/SinglePost";
import Navbar from "../../components/Navbar";
import axios from "../../axios/axios";
import LargeLoader from "../../components/LargeLoader";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../../store/token";
import { setUserDetails } from "../../store/userSlice";
import { useEffect } from "react";
import { useState } from "react";

export const getServerSideProps = async (context) => {
  const res = await axios.get(`/posts/${context.params.id}`);
  const cat = await axios.get("/categories");
  const post = res.data.post;
  return {
    props: {
      post,
      categ: cat.data,
    },
  };
};

const details = ({ post, categ }) => {
  const token = useSelector(selectToken);
  const [show, setShow] = useState("right");
  const dispatch = useDispatch();
  useEffect(() => {
    const getUserDetails = async () => {
      const res = await axios.get(
        "/auth/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setUserDetails(res.data));
    };
    if (token) {
      getUserDetails();
    }
  }, [token, dispatch]);

  const handleDelete = async () => {
    const res = await axios.delete(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      router.push("/");
    }
  };

  if (!post) {
    return <LargeLoader />;
  }
  return (
    <div className={styles.details__wrapper}>
      <Navbar />
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
      <div className={styles.details__inner}>
        <Sidebar categ={categ} show={show} />
        <SinglePost eachPost={post} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default details;
