import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.css";

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

export default Modal;
