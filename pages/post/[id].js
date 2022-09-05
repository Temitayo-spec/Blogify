/* eslint-disable react-hooks/rules-of-hooks */
import styles from "../../styles/MoreDetails.module.css";
import Sidebar from "../../components/Sidebar";
import SinglePost from "../../components/SinglePost";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "../../axios/axios";
import LargeLoader from "../../components/LargeLoader";

const details = () => {
  // import router and query
  const router = useRouter();
  const { id } = router.query;

  const [eachPost, setEachPost] = useState();

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/posts/${id}`);
      setEachPost(res.data.post);
    };
    getPost();
  }, [id]);

  const handleDelete = async () => {
    const res = await axios.delete(`/posts/${id}`);
    if (res.status === 200) {
      router.push("/");
    }
  };

  if (!eachPost) {
    return <LargeLoader />;
  }
  return (
    <div className={styles.details__wrapper}>
      <Navbar />
      <div className={styles.details__inner}>
        <Sidebar />
        <SinglePost eachPost={eachPost} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default details;
