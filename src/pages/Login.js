import React from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Login = () => {
  const [mailValue, setMailValue] = React.useState("");
  const onMailChange = (e) => {
    setMailValue(e.target.value);
  };

  const [passwordValue, setPasswordValue] = React.useState("");
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const onSubmit = (e) => {
    const data = { email: mailValue, password: passwordValue };
    e.preventDefault();
    const response = fetchWithRefresh(
      "https://norma.nomoreparties.space/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    response.then((res) => {
      localStorage.setItem("refreshToken", res.refreshToken);
      console.log("Local storage updated");
    });
  };

  const setCookie = (name, value, options = {}) => {
    // Example of use:
    // setCookie("user", "John", { secure: true, "max-age": 3600 });
    options = {
      path: "/",
      ...options,
    };

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
    let updatedCookie =
      encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
    document.cookie = updatedCookie;
  };

  const BURGER_API_URL = "https://norma.nomoreparties.space/api/";

  const checkResponse = (res) => {
    return res.ok ? res.json() : res.json.then((err) => Promise.reject(err));
  };

  const refreshToken = () => {
    return fetch(`${BURGER_API_URL}/auth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    });
  };

  const fetchWithRefresh = async (url, options) => {
    try {
      const res = await fetch(url, options);
      return checkResponse(res);
    } catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = refreshToken();
        localStorage.setItem("refreshToken", refreshData.accessToken);
        setCookie("accessToken", refreshData.accessToken);
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options);
        return await checkResponse(res);
      } else {
        return Promise.reject(err);
      }
    }
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
