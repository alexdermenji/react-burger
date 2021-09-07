import React from "react";
import { useHistory, useLocation } from "react-router";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import apiFetch, { setCookie } from "../services/api/apiFetch";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { loadUserSuccess } from "../services/actions/auth/loadUserSucces";

const Login = () => {
  const dispatch = useDispatch();
  const [mailValue, setMailValue] = React.useState("");
  const history = useHistory();
  const onMailChange = (e) => {
    setMailValue(e.target.value);
  };

  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const [passwordValue, setPasswordValue] = React.useState("");
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const onSubmit = (e) => {
    const data = { email: mailValue, password: passwordValue };
    e.preventDefault();
    const response = apiFetch(
      "https://norma.nomoreparties.space/api/auth/login",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    response
      .then((res) => {
        setCookie("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(loadUserSuccess(res.user));
        history.replace(from);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <section className={styles.section}>
      <div className="mb-6">
        <h1 className="text text_type_main-medium">Вход</h1>
      </div>
      <form className={styles.form}>
        <div className="mb-6">
          <EmailInput
            onChange={onMailChange}
            value={mailValue}
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
        <div className="mb-20">
          <Button onClick={onSubmit} type="primary" size="medium">
            Войти
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вы новый пользователь?
          <Link className={styles.link} to="/register">
            &nbsp;Зарегестрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Забыли пароль?&nbsp;
          <Link className={styles.link} to="/forgot-password">
            Восстановить пароль
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
