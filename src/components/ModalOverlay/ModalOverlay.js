import ReactDOM from "react-dom";
import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";

const ModalOverlay = ({ onClose, children, title }) => {
  return ReactDOM.createPortal(
    <div className={styles.container} onClick={onClose}>
      <Modal
        title={title}
        onClose={onClose}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </Modal>
    </div>,
    document.body
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
