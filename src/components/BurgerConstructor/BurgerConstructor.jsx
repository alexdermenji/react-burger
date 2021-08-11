import React, { useCallback, useEffect } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import selectNumber from "../../services/selectors/orders/selectNumber";
import selectConstructorIngridients from "../../services/selectors/ingridients/selectConstructotIngridients";
import { sendOrder } from "../../services/actions/order/sendOrder";
import { closeOrder } from "../../services/actions/order/closeOrder";
import { useDrop } from "react-dnd";
import { dropIngridient } from "../../services/actions/ingridients/dropIngridient";
const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const onDropHandler = (item) => {
    dispatch(dropIngridient(item));
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: "ingridient",
    drop(item) {
      onDropHandler(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  const ingridients = useSelector(selectConstructorIngridients);
  const orderNumber = useSelector(selectNumber);
  const totalPrice = ingridients.reduce((acc, item) => acc + item.price, 0);

  const handleCloseModal = useCallback(() => {
    dispatch(closeOrder());
  }, [dispatch]);

  const sendOrderClick = () => {
    dispatch(sendOrder(ingridients));
  };

  useEffect(() => {
    const escPressHandler = (e) => {
      if (e.code === "Escape") {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", escPressHandler);
    return () => window.removeEventListener("keydown", escPressHandler);
  }, [handleCloseModal]);

  return (
    <section
      className={`${styles.section} pt-25 pl-4`}
      ref={dropRef}
      style={isOver ? { backgroundColor: "gray" } : null}
    >
      {orderNumber && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails orderNumber={orderNumber}></OrderDetails>
        </Modal>
      )}
      <div className="mb-10">
        <div className="mb-4 pl-8 pr-4">
          {ingridients.map((item) => {
            if (item.type === "bun") {
              return (
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${item.name} верх`}
                  price={item.price}
                  thumbnail={item.image}
                />
              );
            }
            return null;
          })}
        </div>

        <ul className={`${styles.productsList} pr-4`}>
          {ingridients.map((item) => {
            if (item.type === "bun") return null;
            return (
              <li key={item._id} className={styles.productsItem}>
                <DragIcon />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            );
          })}
        </ul>
        <div className="mt-4 mb-10 pl-8 pr-4">
          {ingridients.map((item) => {
            if (item.type === "bun") {
              return (
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${item.name} низ`}
                  price={item.price}
                  thumbnail={item.image}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
      <div className={styles.checkout}>
        <div className="mr-10">
          <span className="text text_type_digits-medium mr-1">
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={sendOrderClick}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
