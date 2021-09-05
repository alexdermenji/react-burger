import React, { useEffect } from "react";
import styles from "./App.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getIngridients } from "../../services/actions/ingridients/getIngridients";
import { loadUser } from "../../services/actions/auth/loadUser";
import selectIngridients from "../../services/selectors/ingridients/selectIngridients";
import selectIngridientsLoading from "../../services/selectors/ingridients/selectIngridientsLoading";
import selectIngridientsError from "../../services/selectors/ingridients/selectIngridientsError";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngridients from "../BurgerIngridients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ForgotPassword from "../../pages/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword";
import Profile from "../../pages/Profile";
import NotExist from "../../pages/NotExist";
import Modal from "../Modal/Modal";
import Ingridient from "../../pages/Ingridient";
import IngridientDetails from "../IngridientDetails/IngridientDetails";
import selectIsLogin from "../../services/selectors/auth/selectIsLogin";
import Orders from "../../pages/Orders";

const AuthRoute = ({ path, exact, children }) => {
  const isLogin = useSelector(selectIsLogin);
  return (
    <Route path={path} exact={exact}>
      {!isLogin && <Redirect to="/login" />}
      {isLogin && children}
    </Route>
  );
};

const NotAuthRoute = ({ path, exact, children }) => {
  const isLogin = useSelector(selectIsLogin);

  return (
    <Route path={path} exact={exact}>
      {isLogin && <Redirect to="/" />}
      {!isLogin && children}
    </Route>
  );
};

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngridients());
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
};

function ModalSwitch() {
  const ingridients = useSelector(selectIngridients);
  const ingridientsLoading = useSelector(selectIngridientsLoading);
  const ingridientsLoadingError = useSelector(selectIngridientsError);
  const isLogin = useSelector(selectIsLogin);
  const history = useHistory();
  let location = useLocation();
  let background = location.state && location.state.background;

  const handleModalClose = () => {
    history.goBack();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        <AppHeader />
        {isLogin !== null && (
          <main className={styles.wrapper}>
            <Switch location={background || location}>
              <AuthRoute path="/" exact>
                {ingridientsLoading && (
                  <div className="text text_type_main-large">Loading...</div>
                )}
                {ingridientsLoadingError && (
                  <div className="text text_type_main-large">
                    {ingridientsLoadingError}
                  </div>
                )}
                <section className={`${styles.main} pt-10 pb-10`}>
                  {ingridients && (
                    <>
                      <BurgerIngridients />
                      <BurgerConstructor />
                    </>
                  )}
                </section>
              </AuthRoute>
              <NotAuthRoute path="/login">
                <Login />
              </NotAuthRoute>
              <NotAuthRoute path="/register">
                <Register />
              </NotAuthRoute>
              <NotAuthRoute path="/forgot-password">
                <ForgotPassword />
              </NotAuthRoute>
              <NotAuthRoute path="/reset-password">
                <ResetPassword />
              </NotAuthRoute>
              <AuthRoute path="/profile" exact>
                <Profile />
              </AuthRoute>
              <AuthRoute path="/profile/orders" exact>
                <Orders />
              </AuthRoute>
              <Route path="/ingridients/:ingridientId" exact>
                <Ingridient />
              </Route>

              <Route>
                <NotExist />
              </Route>
            </Switch>

            {background && ingridients && (
              <Route
                path="/ingridients/:ingridientId"
                children={
                  <Modal onClose={handleModalClose} title="Детали ингредиента">
                    <IngridientDetails onEsc={handleModalClose} />
                  </Modal>
                }
              />
            )}
          </main>
        )}
        {isLogin === null && <div>Loading...</div>}
      </div>
    </DndProvider>
  );
}

export default App;
