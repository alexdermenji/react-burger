import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngridients from "../BurgerIngridients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngridientDetails from "../IngridientDetails/IngridientDetails";
import { url } from "../../utils/api";

const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOrderIsOpen, toggleOrderModal] = useState(false);
  const [itemModalIsOpen, toggleItemModal] = useState(false);
  const [cardData, setCardData] = useState({});

  const handleOrderClick = () => {
    toggleOrderModal(!modalOrderIsOpen);
  };

  const handleItemClick = (item) => {
    toggleItemModal(!itemModalIsOpen);
    setCardData(item);
  };

  const handleCloseClick = () => {
    toggleOrderModal(false);
    toggleItemModal(false);
  };

  const escPressHandler = (e) => {
    if (e.code === "Escape") {
      toggleOrderModal(false);
      toggleItemModal(false);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", escPressHandler);
    return () => window.removeEventListener("keydown", escPressHandler);
  }, []);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);
  return (
    <div className={styles.container}>
      <header>
        <AppHeader />
      </header>

      {modalOrderIsOpen && (
        <OrderDetails
          handleOrderClick={handleOrderClick}
          handleCloseClick={handleCloseClick}
        />
      )}
      {itemModalIsOpen && (
        <IngridientDetails
          data={cardData}
          handleItemClick={handleItemClick}
          handleCloseClick={handleCloseClick}
        />
      )}

      <main className={`${styles.main} pt-10 pb-10`}>
        {isLoading && (
          <div className="text text_type_main-large">Loading...</div>
        )}
        {error && <div className="text text_type_main-large">{error}</div>}
        {data && (
          <BurgerIngridients handleItemClick={handleItemClick} data={data} />
        )}
        {data && (
          <BurgerConstructor handleOrderClick={handleOrderClick} data={data} />
        )}
      </main>
    </div>
  );
};

export default App;
