<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from "react";
=======
import React from "react";
>>>>>>> parent of 9d16844... fixed modal windows

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngridients.module.css";
import { tabs } from "../../utils/tabs";
import IngridientSection from "../IngridientSection/IngridientSection";
<<<<<<< HEAD
import Modal from "../Modal/Modal";
import IngridientDetails from "../IngridientDetails/IngridientDetails";
import selectCurrentIngridient from "../../services/selectors/ingridients/selectCurrentIngridient";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentIngridient } from "../../services/actions/ingridients/setCurrentIngridient";
import selectIngridients from "../../services/selectors/ingridients/selectIngridients";
const BurgerIngridients = () => {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(tabs[0].title);

  const ingridients = useSelector(selectIngridients);
  const currentIngridient = useSelector(selectCurrentIngridient);

  const handleCloseModal = useCallback(() => {
    dispatch(setCurrentIngridient(null));
  }, [dispatch]);

  useEffect(() => {
    const escPressHandler = (e) => {
      if (e.code === "Escape") {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", escPressHandler);
    return () => window.removeEventListener("keydown", escPressHandler);
  }, [handleCloseModal]);

  useEffect(() => {
    const container = document.getElementById("container");

    function changeTabOnScroll() {
      if (container.scrollTop <= 320) {
        setCurrent("Булки");
      } else if (container.scrollTop > 320 && container.scrollTop < 900) {
        setCurrent("Соусы");
      } else if (container.scrollTop >= 900) {
        setCurrent("Начинки");
      }
    }

    container.addEventListener("scroll", () => {
      changeTabOnScroll();
    });
    return () => {
      container.removeEventListener("scroll", changeTabOnScroll);
    };
  }, []);

  return (
    <section className={`${styles.section} pt-10`}>
      {currentIngridient && (
        <Modal onClose={handleCloseModal} title="Детали ингридиента">
          <IngridientDetails></IngridientDetails>
        </Modal>
      )}
=======

const BurgerIngridients = ({ data, handleOpenIngridientDetails }) => {
  const [current, setCurrent] = React.useState(tabs[0].title);
  return (
    <section className={`${styles.section} pt-10`}>
>>>>>>> parent of 9d16844... fixed modal windows
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
      <div className={styles.ingridientsContainer} id="container">
        {tabs.map((tab) => (
          <IngridientSection
<<<<<<< HEAD
            setCurrentTab={setCurrent}
=======
            handleOpenIngridientDetails={handleOpenIngridientDetails}
>>>>>>> parent of 9d16844... fixed modal windows
            key={tab.title}
            title={tab.title}
            ingridients={ingridients.filter((item) => item.type === tab.id)}
          />
        ))}
      </div>
    </section>
  );
};

<<<<<<< HEAD
=======
BurgerIngridients.propTypes = {
  data: PropTypes.arrayOf(menuItemPropTypes).isRequired,
  handleOpenIngridientDetails: PropTypes.func.isRequired,
};

>>>>>>> parent of 9d16844... fixed modal windows
export default BurgerIngridients;
