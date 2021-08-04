import React, { useEffect, useState, createContext } from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngridients from "../BurgerIngridients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { url } from "../../utils/api";

export const ingridientContext = createContext([]);
const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

      {isLoading && <div className="text text_type_main-large">Loading...</div>}
      <main className={`${styles.main} pt-10 pb-10`}>
        {error && <div className="text text_type_main-large">{error}</div>}
        {data && (
          <ingridientContext.Provider value={data}>
            <BurgerIngridients />
            <BurgerConstructor setIsLoading={setIsLoading} />
          </ingridientContext.Provider>
        )}
      </main>
    </div>
  );
};

export default App;
