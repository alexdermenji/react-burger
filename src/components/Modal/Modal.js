import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.css";
import PropTypes from "prop-types";

const Modal = ({ content, handleCloseClick, title }) => {
  return (
    <div className={`${styles.container} pt-15 pb-30`}>
      <header className={`${styles.header} pl-10`}>
        <h2 className="text text_type_main-large">{title}</h2>
        <div className={`${styles.btnWrapper} pr-10`}>
          <button
            onClick={handleCloseClick}
            type="button"
            className={styles.closeIcon}
          >
            <CloseIcon type="primary" />
          </button>
        </div>
      </header>
      <main className={styles.content}>{content}</main>
    </div>
  );
};

Modal.propTypes = {
  content: PropTypes.any,
  handleCloseClick: PropTypes.func,
  title: PropTypes.string,
};

export default Modal;
