import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngridients from "../BurgerIngridients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { url } from "../../utils/api";

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

      <main className={`${styles.main} pt-10 pb-10`}>
        {isLoading && (
          <div className="text text_type_main-large">Loading...</div>
        )}
        {error && <div className="text text_type_main-large">{error}</div>}
        {data && (
          <>
            <BurgerIngridients data={data} />
            <BurgerConstructor data={data} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
