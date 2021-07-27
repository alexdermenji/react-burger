import styles from "./ModalOverlay.module.css";
import Modal from "../Modal/Modal";
const ModalOverlay = (props) => {
  const content = props.children;
  return (
    <div
      className={styles.container}
      onClick={() => {
        props.handleCloseClick();
      }}
    >
      <Modal
        handleOrderClick={props.handleOrderClick}
        handleCloseClick={props.handleCloseClick}
        title={props.title}
        content={content}
      />
    </div>
  );
};

export default ModalOverlay;
