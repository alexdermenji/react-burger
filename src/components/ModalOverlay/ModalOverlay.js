import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";
const ModalOverlay = ({ onClick }) => {
  return <div className={styles.container} onClick={onClick}></div>;
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
