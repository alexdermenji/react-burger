import React, { useEffect } from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngridients from "../BurgerIngridients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
<<<<<<< HEAD
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
=======
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

  const handleOpenOrderDetails = () => {
    setShowOrderModal(true);
  };

  const handleOpenIngridientDetails = (item) => {
    setShowProductCard(true);
    setProductCardData(item);
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
>>>>>>> parent of 9d16844... fixed modal windows

  useEffect(() => {
    dispatch(getIngridients());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        <AppHeader />
<<<<<<< HEAD
        {ingridientsLoading && (
          <div className="text text_type_main-large">Loading...</div>
        )}
        {ingridientsLoadingError && (
          <div className="text text_type_main-large">
            {ingridientsLoadingError}
          </div>
=======
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
            <BurgerIngridients
              handleOpenIngridientDetails={handleOpenIngridientDetails}
              data={data}
            />
            <BurgerConstructor
              handleOpenOrderDetails={handleOpenOrderDetails}
              data={data}
            />
          </>
>>>>>>> parent of 9d16844... fixed modal windows
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
