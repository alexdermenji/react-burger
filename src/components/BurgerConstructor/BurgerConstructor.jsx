import React from "react";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
const BurgerConstructor = ({ data }) => {
  let type = null;
  return (
    <section className={styles.section + " pt-25 pl-4"}>
      <div className={styles.constructorContainer + " mb-10"}>
        <ul className={styles.productsList + " pr-4"}>
          {data.map((item, index) => {
            if (index === 0) {
              type = "top";
            } else if (index === data.length - 1) {
              type = "bottom";
            } else {
              type = null;
            }
            return (
              <li
                key={item._id}
                className={
                  index === 0 || index === data.length - 1
                    ? "pl-8"
                    : styles.productsItem
                }
              >
                {index > 0 && index < data.length - 1 ? (
                  <div className="mr-1">
                    <DragIcon></DragIcon>
                  </div>
                ) : null}

                <ConstructorElement
                  type={type}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                ></ConstructorElement>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.checkout}>
        <div className="mr-10">
          <span className="text text_type_digits-medium mr-1">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium">
          Нажми на меня
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
