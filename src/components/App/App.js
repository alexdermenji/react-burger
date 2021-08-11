import React, { useEffect } from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngridients from "../BurgerIngridients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useSelector, useDispatch } from "react-redux";
import { getIngridients } from "../../services/actions/ingridients/getIngridients";
import selectIngridients from "../../services/selectors/ingridients/selectIngridients";
import selectIngridientsLoading from "../../services/selectors/ingridients/selectIngridientsLoading";
import selectIngridientsError from "../../services/selectors/ingridients/selectIngridientsError";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const App = () => {
  const dispatch = useDispatch();

  const ingridients = useSelector(selectIngridients);
  const ingridientsLoading = useSelector(selectIngridientsLoading);
  const ingridientsLoadingError = useSelector(selectIngridientsError);

  useEffect(() => {
    dispatch(getIngridients());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        <AppHeader />
        {ingridientsLoading && (
          <div className="text text_type_main-large">Loading...</div>
        )}
        {ingridientsLoadingError && (
          <div className="text text_type_main-large">
            {ingridientsLoadingError}
          </div>
        )}
        <main className={`${styles.main} pt-10 pb-10`}>
          {ingridients && (
            <>
              <BurgerIngridients />
              <BurgerConstructor />
            </>
          )}
        </main>
      </div>
    </DndProvider>
  );
};

export default App;
