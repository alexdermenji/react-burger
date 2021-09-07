import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Profile.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import apiFetch from "../services/api/apiFetch";
import { getUrl } from "../services/api/apiUrl";
import { logoutUserSuccess } from "../services/actions/auth/logoutUserSuccess";

import { useDispatch, useSelector } from "react-redux";
import selectUser from "../services/selectors/auth/selectUser";
import { eraseCookie, getCookie } from "../services/api/apiFetch";
const Profile = () => {
  const inputRef = React.useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [inputsState, setInputsState] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    setInputsState((inputsState) => ({
      ...inputsState,
      name: user.name,
      email: user.email,
      password: user.password,
    }));
  }, [user]);
  const handleDataChange = (e) => {
    const { value, name } = e.target;
    setInputsState({
      ...inputsState,
      [name]: value,
    });
  };
  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(getUrl("auth/user"), {
        method: "PATCH",
        body: JSON.stringify(inputsState),
        headers: {
          Authorization: decodeURIComponent(getCookie("accessToken")),
        },
      });
      const res = await response.json();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const resetChanges = (e) => {
    e.preventDefault();
    setInputsState({
      ...inputsState,
      name: user.name,
      email: user.email,
    });
  };

  const exit = () => {
    const response = apiFetch(
      "https://norma.nomoreparties.space/api/auth/logout",
      {
        method: "POST",
        body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
      }
    );
    response
      .then((res) => {
        if (res.success) {
          dispatch(logoutUserSuccess());
          eraseCookie("accessToken");
        }
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <section className={styles.section}>
      <div className={styles.navigation}>
        <ul className={styles.list}>
          <li className="mb-10">
            <NavLink
              activeClassName={styles.active}
              className={`${styles.listLink} text text_type_main-medium text_color_inactive`}
              to="/profile"
            >
              Профиль
            </NavLink>
          </li>
          <li className="mb-10">
            <NavLink
              activeClassName={styles.active}
              className={`${styles.listLink} text text_type_main-medium text_color_inactive`}
              to="/profile/orders"
            >
              История заказов
            </NavLink>
          </li>
          <li className="mb-10">
            <NavLink
              onClick={exit}
              activeClassName={styles.active}
              className={`${styles.listLink} text text_type_main-medium text_color_inactive`}
              to="/login"
            >
              Выход
            </NavLink>
          </li>
        </ul>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={styles.form}>
        <form>
          <div className="mb-6">
            <Input
              onChange={handleDataChange}
              type={"text"}
              placeholder={"Имя"}
              icon={"CurrencyIcon"}
              value={inputsState.name}
              name={"name"}
              error={false}
              ref={inputRef}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
          <div className="mb-6">
            <EmailInput
              value={inputsState.email}
              name={"email"}
              onChange={handleDataChange}
            />
          </div>
          <div className="mb-6">
            <PasswordInput
              onChange={handleDataChange}
              value={"password"}
              name={"password"}
            />
          </div>
          <div>
            <Button onClick={resetChanges} type="secondary" size="medium">
              Отмена
            </Button>
            <Button onClick={saveChanges} type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
