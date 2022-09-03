/* eslint-disable react-hooks/rules-of-hooks */
import styles from "../../styles/MoreDetails.module.css";
import Sidebar from "../../components/Sidebar";
import SinglePost from "../../components/SinglePost";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "../../axios/axios";


const details = () => {
    const { query } = useRouter();
  const [eachPost, setEachPost] = useState({});

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/posts/${query.id}`);
      setEachPost(res.data.post);
      console.log(res.data);
    };
    getPost();
  }, [query]);
  return (
    <div className={styles.details__wrapper}>
      <Navbar />
      <div className={styles.details__inner}>
        <Sidebar />
        <SinglePost eachPost={eachPost} />
      </div>
    </div>
  );
};

export default details;
