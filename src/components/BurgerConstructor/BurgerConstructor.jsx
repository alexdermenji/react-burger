import React from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import PropTypes from "prop-types";

const BurgerConstructor = ({ data, openModal }) => {
  const bun = data.find((item) => (item.type = "bun"));
  const totalPrice = data.reduce((acc, item) => acc + item.price, 0);

  return (
    <section className={`${styles.section} pt-25 pl-4`}>
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
        <Button type="primary" size="medium" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  openModal: PropTypes.func,
};

export default BurgerConstructor;
