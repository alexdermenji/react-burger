import React, { useState, useEffect, useContext } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { ingridientContext } from "../App/App";

const BurgerConstructor = ({ setIsLoading }) => {
  const data = useContext(ingridientContext);

  const bun = data.find((item) => (item.type = "bun"));

  const totalPrice = data.reduce((acc, item) => acc + item.price, 0);

  const [orderNumber, setOrderNumber] = useState(null);

  const handleCloseModal = () => {
    setOrderNumber(null);
  };

  const handleOpenModal = (data) => {
    setOrderNumber(data);
  };

  const sendOrder = () => {
    setIsLoading(true);
    fetch("https://norma.nomoreparties.space/api/orders/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ingredients: data,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setIsLoading(false);
          return response.json();
        }
        throw new Error(response.status);
      })
      .then((data) => {
        handleOpenModal(data.order.number);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const escPressHandler = (e) => {
      if (e.code === "Escape") {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", escPressHandler);
    return () => window.removeEventListener("keydown", escPressHandler);
  }, []);

  return (
    <section className={`${styles.section} pt-25 pl-4`}>
      {orderNumber && (
        <ModalOverlay onClose={handleCloseModal}>
          <OrderDetails orderNumber={orderNumber}></OrderDetails>
        </ModalOverlay>
      )}
      <div className="mb-10">
        <div className="mb-4 pl-8 pr-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} верх`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <ul className={`${styles.productsList} pr-4`}>
          {data.map((item) => {
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
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      </div>
      <div className={styles.checkout}>
        <div className="mr-10">
          <span className="text text_type_digits-medium mr-1">
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={sendOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
export default BurgerConstructor;
