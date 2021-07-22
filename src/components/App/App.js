import React from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngridients from "../BurgerIngridients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { data } from "../../utils/data";

const App = () => {
  return (
    <div className={styles.container}>
      <header>
        <AppHeader />
      </header>
      <main className={`${styles.main} pt-10 pb-10`}>
        <BurgerIngridients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
};

export default App;
