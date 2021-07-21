import React from "react";
import classes from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngridients from "../BurgerIngridients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { data } from "../../utils/data";

const App = () => {
  return (
    <div className={classes.container}>
      <header>
        <AppHeader />
      </header>
      <main className={classes.main + " pt-10 pb-10"}>
        <BurgerIngridients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
};

export default App;
