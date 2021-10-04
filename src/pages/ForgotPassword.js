import React, { useEffect } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import selectResetPassword from "../services/selectors/auth/selectResetPassword";
import { resetPasswordSent } from "../services/actions/auth/resetPassword";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [mailValue, setMailValue] = React.useState("");
  const resetPassword = useSelector(selectResetPassword);
  const history = useHistory();

  const onMailChange = (e) => {
    setMailValue(e.target.value);
  };

  useEffect(() => {
    resetPassword && history.push("/reset-password");
  }, [history, resetPassword]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordSent({ email: mailValue }));
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

export default ForgotPassword;
