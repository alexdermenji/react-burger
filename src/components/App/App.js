import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngridients from "../BurgerIngridients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { url } from "../../utils/api";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngridientDetails from "../IngridientDetails/IngridientDetails";

const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showProductCard, setShowProductCard] = useState(false);
  const [productCardData, setProductCardData] = useState({});

  const handleOpenModal = (e, item) => {
    if (item) {
      setShowProductCard(true);
      setProductCardData(item);
    } else {
      setShowOrderModal(true);
    }
  };

  const handleHideModal = () => {
    setShowOrderModal(false);
    setShowProductCard(false);
  };

  useEffect(() => {
    const escPressHandler = (e) => {
      if (e.code === "Escape") {
        handleHideModal();
      }
    };
    window.addEventListener("keydown", escPressHandler);
    return () => window.removeEventListener("keydown", escPressHandler);
  }, []);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error("Ошибка"));
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
      {showOrderModal && (
        <Modal onClick={handleHideModal}>
          <OrderDetails></OrderDetails>
        </Modal>
      )}
      {showProductCard && (
        <Modal onClick={handleHideModal} title="Детали ингридиента">
          <IngridientDetails data={productCardData}></IngridientDetails>
        </Modal>
      )}

      <main className={`${styles.main} pt-10 pb-10`}>
        {isLoading && (
          <div className="text text_type_main-large">Loading...</div>
        )}
        {error && <div className="text text_type_main-large">{error}</div>}
        {data && (
          <>
            <BurgerIngridients openModal={handleOpenModal} data={data} />
            <BurgerConstructor openModal={handleOpenModal} data={data} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
