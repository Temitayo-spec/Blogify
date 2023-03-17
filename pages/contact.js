import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Popup from "../components/Popup";
import styles from "../styles/Contact.module.css";

const ContactForm = () => {
  const [status, setStatus] = useState("Submit");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    console.log(details);

    if (details.name === "" || details.email === "" || details.message === "") {
      setPopup({
        show: true,
        message: "Please fill all the fields",
        status: "error",
      });
      setStatus("Submit");
    } else {
      let response = await axios.post("/contact", details);
      if (response.status === 200) {
        setPopup({
          show: true,
          message: "Message sent successfully",
          status: "success",
        });
        setStatus("Submit");
      } else {
        setPopup({
          show: true,
          message: "Something went wrong",
          status: "error",
        });
        setStatus("Submit");
      }
    }
  };

  return (
    <>
      <Navbar />
      {popup.show && (
        <Popup
          message={popup.message}
          status={popup.status}
          close={() => setPopup({ show: false, message: "", status: "" })}
        />
      )}
      <form className={styles.contact__wrapper} onSubmit={handleSubmit}>
        <div className={styles.form__inner}>
          <header className={styles.header}>
            <h1>Contact</h1>
            <p>
              If you have any questions, critcisms or suggestions, please feel
              free to <span>contact me.</span>
            </p>
          </header>
          <div className={styles.inputs}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" required />
          </div>
          <div className={styles.inputs}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div className={styles.inputs}>
            <label htmlFor="message">Message</label>
            <textarea id="message" required />
          </div>
          <div className={styles.submit__btn}>
            <button type="submit">{status}</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
