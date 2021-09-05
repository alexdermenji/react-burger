import React from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import selectResetPasswordSent from "../services/selectors/auth/selectResetPasswordSent";
import { useHistory } from "react-router-dom";
import { resetPasswordSent } from "../services/actions/auth/resetPasswordSent";
const ForgotPasssword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const resetPassword = useSelector(selectResetPasswordSent);
  const [mailValue, setMailValue] = React.useState("");
  const onMailChange = (e) => {
    setMailValue(e.target.value);
  };

  resetPassword && history.push("/reset-password");

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
    dispatch(resetPasswordSent());
    postData("https://norma.nomoreparties.space/api/password-reset", {
      email: mailValue,
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
          <EmailInput
            onChange={onMailChange}
            value={mailValue}
            name={"email"}
          />
        </div>

        <div className="mb-20">
          <Button onClick={onSubmit} type="primary" size="medium">
            Восстановить
          </Button>
        </div>

        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль?&nbsp;
          <Link className={styles.link} to="/login">
            Войти
          </Link>
        </p>
      </form>
    </section>
  );
};

export default ForgotPasssword;
