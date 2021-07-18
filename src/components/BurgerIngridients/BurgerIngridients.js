import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngridients.module.css";

const BurgerIngridients = ({ data }) => {
  const [current, setCurrent] = React.useState("one");
  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className="mt-5 mb-10">
        <ul className={styles.tabsList}>
          <li>
            <Tab value="one" active={current === "one"} onClick={setCurrent}>
              Булки
            </Tab>
          </li>
          <li>
            <Tab value="two" active={current === "two"} onClick={setCurrent}>
              Соусы
            </Tab>
          </li>
          <li>
            <Tab
              value="three"
              active={current === "three"}
              onClick={setCurrent}
            >
              Начинки
            </Tab>
          </li>
        </ul>
      </div>
      <div className={styles.ingridientsContainer}>
        <div className="mb-6">
          <h2>Булки</h2>
        </div>
        <ul className={styles.productsList + " pl-4 mb-10"}>
          {data.map((product) => {
            return product.type === "bun" ? (
              <li
                className={styles.productsItems + " pl-4 pr-4"}
                key={product._id}
              >
                <div className={styles.productsImage + " mb-1"}>
                  <img src={product.image} alt="Bulka-1" />
                </div>
                <Counter count={1} size="default" />
                <div className={styles.productsPrice + " mb-1"}>
                  <span className="text text_type_digits-default   mr-1">
                    {product.price}{" "}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
                <p className={styles.productsDescription}>{product.name}</p>
              </li>
            ) : null;
          })}
        </ul>
        <div className="mb-6">
          <h2>Соусы</h2>
        </div>
        <ul className={styles.productsList + " pl-4 mb-10"}>
          {data.map((product) => {
            return product.type === "sauce" ? (
              <li
                className={styles.productsItems + " pl-4 pr-4"}
                key={product._id}
              >
                <div className={styles.productsImage + " mb-1"}>
                  <img src={product.image} alt="Bulka-1" />
                </div>
                <Counter count={1} size="default" />
                <div className={styles.productsPrice + " mb-1"}>
                  <span className="text text_type_digits-default mr-1">
                    {product.price}{" "}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
                <p className={styles.productsDescription}>{product.name}</p>
              </li>
            ) : null;
          })}
        </ul>
        <div className="mb-6">
          <h2>Начинка</h2>
        </div>
        <ul className={styles.productsList + " pl-4 mb-10"}>
          {data.map((product) => {
            return product.type === "main" ? (
              <li
                className={styles.productsItems + " pl-4 pr-4"}
                key={product._id}
              >
                <div className={styles.productsImage + " mb-1"}>
                  <img src={product.image} alt="Bulka-1" />
                </div>
                <Counter count={1} size="default" />
                <div className={styles.productsPrice + " mb-1"}>
                  <span className="text text_type_digits-default mr-1">
                    {product.price}{" "}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
                <p className={styles.productsDescription}>{product.name}</p>
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </section>
  );
};

export default BurgerIngridients;
