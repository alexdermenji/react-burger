import React from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Register = () => {
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const [mailValue, setMailValue] = React.useState("");
  const onMailChange = (e) => {
    setMailValue(e.target.value);
  };

  const [passwordValue, setPasswordValue] = React.useState("");
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

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
    postData("https://norma.nomoreparties.space/api/auth/register", {
      email: mailValue,
      password: passwordValue,
      name: inputValue,
    }).then((data) => {
      console.log(data);
    });
  };

  return (
    <section className={styles.section}>
      <div className="mb-6">
        <h1 className="text text_type_main-medium">Регистрация</h1>
      </div>
      <form className={styles.form}>
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
            Зарегестрироваться
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Уже зарегестрированы?
          <Link className={styles.link} to="/login">
            &nbsp;Войти
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
