import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Profile.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Profile = () => {
  const [inputValue, setInputValue] = React.useState("value");
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const [emailValue, setEmailValue] = React.useState("bob@example.com");
  const onMailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const [passwordValue, setPasswordValue] = React.useState("password");
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
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
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setInputValue(e.target.value)}
            icon={"CurrencyIcon"}
            value={inputValue}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className="mb-6">
          <EmailInput
            onChange={onMailChange}
            value={emailValue}
            name={"email"}
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            onChange={onPasswordChange}
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
      </div>
    </section>
  );
};

export default Profile;
