import React from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngridients.module.css";
import PropTypes from "prop-types";
import { tabs } from "../../utils/tabs";
import IngridientSection from "../IngridientSection/IngridientSection";

const BurgerIngridients = ({ data, handleItemClick }) => {
  const [current, setCurrent] = React.useState(tabs[0].title);
  return (
    <section className={`${styles.section} pt-10`}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className="mt-5 mb-10">
        <ul className={styles.tabsList}>
          {tabs.map((tab) => {
            return (
              <li key={tab.id}>
                <Tab
                  value={tab.title}
                  active={current === `${tab.title}`}
                  onClick={setCurrent}
                >
                  {tab.title}
                </Tab>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.ingridientsContainer}>
        {tabs.map((tab) => (
          <IngridientSection
            handleItemClick={handleItemClick}
            key={tab.title}
            title={tab.title}
            ingridients={data.filter((item) => item.type === tab.id)}
          />
        ))}
      </div>
    </section>
  );
};

BurgerIngridients.propTypes = { data: PropTypes.arrayOf(PropTypes.object) };

export default BurgerIngridients;
