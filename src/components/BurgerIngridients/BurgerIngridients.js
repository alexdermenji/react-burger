import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngridients.module.css";
import { tabs } from "../../utils/tabs";
import IngridientSection from "../IngridientSection/IngridientSection";
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

  useLayoutEffect(() => {
    let container = document.getElementById("container");

    function changeTabOnScroll() {
      for (const tab of [...tabs].reverse()) {
        container = document.getElementById("container");
        const containerTop = container.getBoundingClientRect().top;
        const sectionTop =
          document
            .getElementById(tab.id)
            .previousSibling.getBoundingClientRect().top - containerTop;

        if (sectionTop < container.scrollTop) {
          setCurrent(tab.title);
          break;
        }
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
            setCurrentTab={setCurrent}
            key={tab.title}
            title={tab.title}
            ingridients={ingridients.filter((item) => item.type === tab.id)}
            id={tab.id}
          />
        ))}
      </div>
    </section>
  );
};

export default BurgerIngridients;
