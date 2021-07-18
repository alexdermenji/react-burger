import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Box } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";

const AppHeader = () => {
  return (
    <nav className={styles.header + " pt-4 pb-4"}>
      <ul className={styles.menuList}>
        <li className="p-5">
          <a
            href="http://google.com"
            className={styles.menuLink + " text text_type_main-default"}
          >
            <div className="mr-2">
              <BurgerIcon type="primary" />
            </div>
            <span className="text text_type_main-default">Конструктор</span>
          </a>
        </li>
        <li className="p-5">
          <a
            href="http://google.com"
            className={styles.menuLink + " text text_type_main-default"}
          >
            <div className="mr-2">
              <ListIcon type="secondary" />
            </div>
            <span className="text text_type_main-default text_color_inactive">
              Лента заказов
            </span>
          </a>
        </li>
      </ul>

      <div className={styles.logo}>
        <Logo></Logo>
      </div>
      <div className="p-5">
        <a
          href="http://google.com"
          className={styles.menuLink + " text text_type_main-default"}
        >
          <div className="mr-2">
            <ProfileIcon type="secondary"></ProfileIcon>
          </div>
          <span
            href="http://google.com"
            className="text text_type_main-default text_color_inactive"
          >
            Личный кабинет
          </span>
        </a>
      </div>
    </nav>
  );
};

export default AppHeader;
