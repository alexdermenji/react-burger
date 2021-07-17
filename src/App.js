import React from "react";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerIngridients from "./components/BurgerIngridients/BurgerIngridients";
const App = () => {
  return (
    <div className="container">
      <AppHeader></AppHeader>
      <BurgerIngridients></BurgerIngridients>
    </div>
  );
};

export default App;
