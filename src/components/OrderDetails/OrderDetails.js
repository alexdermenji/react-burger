import styles from "./OrderDetails.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes, { string } from "prop-types";

const OrderDetails = ({ orderNumber }) => {
  console.log(orderNumber);
  return (
    <>
      <div className="mb-8">
        <h1 className={`${styles.title} text text_type_digits-large`}>
          {orderNumber}
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
    </>
  );
};

OrderDetails.propTypes = {
  orderNumber: string.isRequired,
};

export default OrderDetails;
