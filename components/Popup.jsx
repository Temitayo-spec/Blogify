import styles from "../styles/Popup.module.css";

const Popup = ({ message, status, close }) => {
  return (
    <div className={`${styles.wrapper} ${
          status === "success" ? styles.success : styles.error
        }`}>
      <div
        className={`${styles.wrapper__inner}`}
      >
        <p>{message}</p>
        <button onClick={close} type="button">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default Popup;
