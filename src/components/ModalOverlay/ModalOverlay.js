import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";
<<<<<<< HEAD

const ModalOverlay = ({ onClose }) => {
  return <div className={styles.container} onClick={onClose}></div>;
=======
const ModalOverlay = ({ onClick }) => {
  return <div className={styles.container} onClick={onClick}></div>;
>>>>>>> parent of 9d16844... fixed modal windows
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
