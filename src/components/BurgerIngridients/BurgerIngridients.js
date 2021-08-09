import React, { useState, useEffect, useContext } from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngridients.module.css";
import { tabs } from "../../utils/tabs";
import IngridientSection from "../IngridientSection/IngridientSection";
import Modal from "../Modal/Modal";
import IngridientDetails from "../IngridientDetails/IngridientDetails";
import { ingridientContext } from "../App/App";

const BurgerIngridients = () => {
  const data = useContext(ingridientContext);
  const [current, setCurrent] = useState(tabs[0].title);
  const [modalData, setModalData] = useState(null);

  const handleOpenModal = (data) => {
    setModalData(data);
  };

  const handleCloseModal = () => {
    setModalData(null);
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
    <section className={`${styles.section} pt-10`}>
      {modalData && (
        <Modal onClose={handleCloseModal} title="Детали ингридиента">
          <IngridientDetails data={modalData}></IngridientDetails>
        </Modal>
      )}
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className="mt-5 mb-10">
        <ul className={styles.tabsList}>
          {tabs.map((tab) => {
            return (
              <li key={tab.id} className={styles.tabsItem}>
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
            handleOpenIngridientDetails={handleOpenModal}
            key={tab.title}
            title={tab.title}
            ingridients={data.filter((item) => item.type === tab.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default BurgerIngridients;
