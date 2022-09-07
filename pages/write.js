/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Write.module.css";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Multiselect } from "multiselect-react-dropdown";
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
import { selectToken } from "../store/token";
import { selectUserDetails, setUserDetails } from "../store/userSlice";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const write = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const newTitle = useSelector(selectTitle);
  const description = useSelector(selectDesc);
  const photo = useSelector(selectPhoto);
  const loading = useSelector(selectIsLoading);
  const [file, setFile] = useState(null);
  const userDetails = useSelector(selectUserDetails);
  const token = useSelector(selectToken);

  // category data
  const categ = [
    { name: "Tech", id: 1 },
    { name: "Cinema", id: 2 },
    { name: "Music", id: 3 },
    { name: "Life", id: 4 },
    { name: "Sports", id: 5 },
  ];

  const [selectedValue, setSelectedValue] = useState([]);

  const onSelect = (selectedList, selectedItem) => {
    setSelectedValue(selectedList);
  };

  const onRemove = (selectedList, removedItem) => {
    setSelectedValue(selectedList);
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getUserDetails = async () => {
      const res = await axios.get("/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setUserDetails(res.data));
    };
    if (token) {
      getUserDetails();
    }
  }, [token, dispatch]);

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    status: "",
  });

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
    formData.append(
      "categories",
      // sending an array of names from the selectedValue array
      Object.values(selectedValue)
        .map((item) => item.name)
        .join(",")
        .split(",")
    );

    axios
      .post("/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  const quillProps = {
    theme: "snow",

    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
        ["code-block", "video", "formula", "code", "image"],
      ],
    },
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
              <div className={styles.multi__select_dropdown}>
                <Multiselect
                  options={categ} // Options to display in the dropdown
                  displayValue="name" // Property name to display in the dropdown options
                  className={styles.drop__down}
                  onSelect={onSelect} // Function will trigger on select event
                  onRemove={onRemove} // Function will trigger on remove event
                  selectedValues={selectedValue} // Preselected value to persist in dropdown
                  placeholder="Select category"
                />
              </div>
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
            <ReactQuill
              modules={quillProps.modules}
              theme={quillProps.theme}
              value={description}
              onChange={(e) => dispatch(setDesc(e))}
              className={styles.quill}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default write;
