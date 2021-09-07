import React from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import selectResetPassword from "../services/selectors/auth/selectResetPassword";
import { useEffect } from "react";

const ResetPassword = () => {
  const history = useHistory();
  const [passwordValue, setPasswordValue] = React.useState("");
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const resetPassword = useSelector(selectResetPassword);
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  useEffect(() => {
    !resetPassword && history.push("/forgot-password");
  }, [history, resetPassword]);

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json(); //
  }

  const onSubmit = (e) => {
    e.preventDefault();
    postData("https://norma.nomoreparties.space/api/password-reset/reset", {
      password: passwordValue,
      token: inputValue,
    }).then((data) => {
      console.log(data);
    });
  };

  return (
    <section className={styles.section}>
      <div className="mb-6">
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      </div>
      <form className={styles.form}>
        <div className="mb-6">
          <PasswordInput
            onChange={onPasswordChange}
            value={passwordValue}
            name={"password"}
          />
        </div>
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={(e) => setInputValue(e.target.value)}
            icon={""}
            value={inputValue}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>

        <div className="mb-20">
          <Button onClick={onSubmit} type="primary" size="medium">
            Восстановить
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль?
          <Link className={styles.link} to="/login">
            &nbsp;Войти
          </Link>
        </p>
      </form>
    </section>
  );
};

export default ResetPassword;
