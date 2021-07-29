import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

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
        </header>
        <main className={styles.content}>{children}</main>
      </div>
    </>,
    document.getElementById("modal-root")
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Modal;
