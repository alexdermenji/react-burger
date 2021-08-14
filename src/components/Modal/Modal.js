import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

<<<<<<< HEAD
const Modal = ({ children, title, onClose }) => {
  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={`${styles.container} pt-15 pb-30`}>
        <header className={`${styles.header} pl-10`}>
          {title && <h2 className="text text_type_main-large">{title}</h2>}
          {onClose && (
            <div className={`${styles.btnWrapper} pr-10`}>
              <button
                type="button"
                className={styles.closeIcon}
                onClick={onClose}
              >
                <CloseIcon type="primary" />
              </button>
            </div>
          )}
=======
const Modal = ({ onClick, children, title }) => {
  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClick}></ModalOverlay>
      <div className={`${styles.container} pt-15 pb-30`}>
        <header className={`${styles.header} pl-10`}>
          <h2 className="text text_type_main-large">{title}</h2>
          <div className={`${styles.btnWrapper} pr-10`}>
            <button
              type="button"
              className={styles.closeIcon}
              onClick={onClick}
            >
              <CloseIcon type="primary" />
            </button>
          </div>
>>>>>>> parent of 9d16844... fixed modal windows
        </header>
        <main className={styles.content}>{children}</main>
      </div>
    </>,
    document.getElementById("modal-root")
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default Modal;
