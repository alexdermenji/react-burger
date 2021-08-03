import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.css";

import PropTypes from "prop-types";

const Modal = ({ onClick, children, title, onClose }) => {
  return (
    <div className={`${styles.container} pt-15 pb-30`} onClick={onClick}>
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
      </header>
      <main className={styles.content}>{children}</main>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Modal;
