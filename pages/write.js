/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Write.module.css";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios/axios";
import {
  selectDesc,
  selectIsLoading,
  selectPhoto,
  selectTitle,
  setDesc,
  setIsLoading,
  setPhoto,
  setTitle,
} from "../store/writeSlice";
import Popup from "../components/Popup";
import SmallSpinner from "../components/SmallSpinner";
import { selectUserDetails, setUserDetails } from "../store/loginSlice";

const write = () => {
  const router = useRouter();
  const newTitle = useSelector(selectTitle);
  const description = useSelector(selectDesc);
  const photo = useSelector(selectPhoto);
  const loading = useSelector(selectIsLoading);
  const [file, setFile] = useState(null);
  const userDetails = useSelector(selectUserDetails);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(setUserDetails(JSON.parse(localStorage.getItem("user"))));
    }
  }, [dispatch]);

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    status: "",
  });

  const dispatch = useDispatch();
  if (popup.show) {
    setTimeout(() => {
      setPopup({ show: false, message: "", status: "" });
    }, 3000);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setIsLoading(true));
    const formData = new FormData();

    formData.append("title", newTitle);
    formData.append("content", description);
    formData.append("image", file);
    formData.append("username", userDetails.user.name);

    axios
      .post("/posts", formData)
      .then((res) => {
        if (res.status === 201) {
          console.log(res.data);
          setPopup({
            show: true,
            message: "Post created successfully",
            status: "success",
          });
          dispatch(setIsLoading(false));
          // push to the page with the post id
          router.push(`/post/${res.data.post._id}`);
        }
      })
      .catch((err) => {
        setPopup({
          show: true,
          message: "Something went wrong",
          status: "error",
        });
        dispatch(setIsLoading(false));
      });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(setPhoto(reader.result));
    };
    setFile(file);
  };

  return (
    <div className={styles.write__wrapper}>
      <Navbar />
      {popup.show && (
        <Popup
          message={popup.message}
          status={popup.status}
          close={() => setPopup({ show: false, message: "", status: "" })}
        />
      )}
      <div className={styles.write__inner}>
        {photo && (
          <img src={photo} alt="cover__image" className={styles.write__img} />
        )}
        <form onSubmit={onSubmit} action="" className={styles.form}>
          <div className={styles.heading}>
            <div className={styles.file__input}>
              <label htmlFor="fileInput">
                <i className="fas fa-plus"></i>
                <span>Add an image</span>
              </label>
              <input
                type="file"
                name="fileInput"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFile}
              />
              <button
                style={{
                  marginLeft: "auto",
                }}
                type="submit"
                className={styles.submit__btn}
              >
                Publish {loading && <SmallSpinner />}
              </button>
            </div>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              autoFocus
              onChange={(e) => dispatch(setTitle(e.target.value))}
            />
          </div>
          <div className={styles.write__input}>
            <textarea
              placeholder="Tell your story..."
              className={styles.write__input}
              onChange={(e) => dispatch(setDesc(e.target.value))}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default write;
