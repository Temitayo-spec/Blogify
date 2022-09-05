/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Sidebar.module.css";
import axios from "../axios/axios";
import Link from "next/link";

const Sidebar = () => {
  const [categ, setCateg] = useState([]);

  useEffect(() => {
    const fetchCateg = async () => {
      const request = await axios.get("/categories");
      setCateg(request.data);
      console.log(request.data);
    };
    fetchCateg();
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar__inner}>
        <header className={styles.header}>
          <h2>About me</h2>
          <img
            src="/images/profile.jpg"
            alt="profile"
            className={styles.profile}
          />
          <p>
            I am a software engineer based in the Nigeria. I am a self-taught
            developer and I am passionate about building things that people love
            to use.
          </p>
        </header>
        <div className={styles.sidebar__item}>
          <h3>Categories</h3>
          <ul>
            {categ?.categories?.map((c) => (
              <li key={c?.id}>
                <Link href={`/?cat=${c?.name}`}>
                  <a href="#">{c?.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.sidebar__item}>
          <h3>Social</h3>
          <div className={styles.icons__ctn}>
            {/* Fontawesome icons for facebook, instagram, twitter */}
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
