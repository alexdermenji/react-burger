import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Box } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";

const AppHeader = () => {
  return (
    <nav className={[styles.header, "pt-4", "pb-4"].join(" ")}>
      <ul className={styles.menuList}>
        <li className={[styles.menuItem, "p-5"].join(" ")}>
          <div className="mr-2">
            <BurgerIcon type="primary" />
          </div>
          <span className="text text_type_main-default">Конструктор</span>
        </li>
        <li className={[styles.menuItem, "p-5"].join(" ")}>
          <div className="mr-2">
            <ListIcon type="secondary" />
          </div>
          <span className="text text_type_main-default text_color_inactive">
            Лента заказов
          </span>
        </li>
      </ul>

      <div className={styles.logo}>
        <Logo></Logo>
      </div>
      <div className={[styles.menuItem, "p-5"].join(" ")}>
        <div className="mr-2">
          <ProfileIcon type="secondary"></ProfileIcon>
        </div>
        <span
          href="http://google.com"
          className="text text_type_main-default text_color_inactive"
        >
          Личный кабинет
        </span>
      </div>
    </nav>
  );
};

export default AppHeader;
