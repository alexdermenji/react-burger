import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from "./OrderDetails.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
const OrderDetails = (props) => {
  return ReactDOM.createPortal(
    <ModalOverlay
      handleOrderClick={props.handleOrderClick}
      handleCloseClick={props.handleCloseClick}
    >
      <div className="mb-8">
        <h1 className={`${styles.title} text text_type_digits-large`}>
          034536
        </h1>
      </div>
      <p className="text text_type_main-medium mb-15">Идентификатор заказа</p>
      <div className="mb-15">
        <CheckMarkIcon type="primary" />
      </div>
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default">
        Дождитесь готовности на орбитальной станции
      </p>
    </ModalOverlay>,
    document.getElementById("modal-root")
  );
};

export default OrderDetails;
