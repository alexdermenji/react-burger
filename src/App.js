import React from "react";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerIngridients from "./components/BurgerIngridients/BurgerIngridients";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import data from "./utils/data";

const App = () => {
  const dataArr = data();
  return (
    <div className="container">
      <header>
        <AppHeader></AppHeader>
      </header>
      <main className="main pt-10">
        <BurgerIngridients data={dataArr}></BurgerIngridients>
        <BurgerConstructor data={dataArr}></BurgerConstructor>
      </main>
    </div>
  );
};

export default App;
