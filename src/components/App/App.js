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
import { Route, Switch, Redirect } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngridients from "../BurgerIngridients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ForgotPassword from "../../pages/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword";
import Profile from "../../pages/Profile";
import selectIsLogin from "../../services/selectors/auth/selectIsLogin";

const AuthRoute = ({ path, exact, children }) => {
  const isLogin = useSelector(selectIsLogin);
  console.log(isLogin);
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
  const ingridients = useSelector(selectIngridients);
  const ingridientsLoading = useSelector(selectIngridientsLoading);
  const ingridientsLoadingError = useSelector(selectIngridientsError);
  const isLogin = useSelector(selectIsLogin);

  useEffect(() => {
    dispatch(getIngridients());
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        <AppHeader />
        {isLogin !== null && (
          <main className={styles.wrapper}>
            <Switch>
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
              <AuthRoute path="/profile">
                <Profile />
              </AuthRoute>
            </Switch>
          </main>
        )}
        {isLogin === null && <div>Loading...</div>}
      </div>
    </DndProvider>
  );
};

export default App;
