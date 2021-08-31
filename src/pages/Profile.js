import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Profile.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import apiFetch from "../services/api/apiFetch";
import { LOGOUT_USER_SUCCESS } from "../services/actions/auth/logoutUserSuccess";
import { USER_DATA_CHANGE } from "../services/actions/auth/userDataChange";
import { useDispatch, useSelector } from "react-redux";
import selectUser from "../services/selectors/auth/selectUser";

const Profile = () => {
  const inputRef = React.useRef(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const user = useSelector(selectUser);

  const onDataChange = (e) => {
    dispatch({
      type: USER_DATA_CHANGE,
      payload: {},
    });
  };

  const dispatch = useDispatch();

  const [passwordValue, setPasswordValue] = React.useState("password");
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
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
          dispatch({
            type: LOGOUT_USER_SUCCESS,
          });
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
              to="/"
            >
              История заказов
            </NavLink>
          </li>
          <li className="mb-10">
            <NavLink
              onClick={exit}
              activeClassName={styles.active}
              className={`${styles.listLink} text text_type_main-medium text_color_inactive`}
              to="/"
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
              onChange={onDataChange}
              type={"text"}
              placeholder={"Имя"}
              icon={"CurrencyIcon"}
              value={user.name}
              name={"name"}
              error={false}
              ref={inputRef}
              onIconClick={onIconClick}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
          <div className="mb-6">
            <EmailInput value={user.email} name={"email"} />
          </div>
          <div className="mb-6">
            <PasswordInput
              onChange={onDataChange}
              value={passwordValue}
              name={"password"}
            />
          </div>
          <div>
            <Button type="secondary" size="medium">
              Отмена
            </Button>
            <Button type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
