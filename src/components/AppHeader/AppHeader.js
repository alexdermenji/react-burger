import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./AppHeader.module.css";

const AppHeader = () => {
  return (
    <header>
      <nav className={styles.header + " pt-4 pb-4"}>
        <ul className={styles.menuList}>
          <li className="p-5">
            <a
              href="#"
              className={`${styles.menuLink} text text_type_main-default`}
            >
              <div className="mr-2">
                <BurgerIcon type="primary" />
              </div>
              <span className="text text_type_main-default">Конструктор</span>
            </a>
          </li>
          <li className="p-5">
            <a
              href="#"
              className={`${styles.menuLink} text text_type_main-default`}
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

        <div>
          <Logo />
        </div>
        <div className="p-5">
          <a
            href="#"
            className={`${styles.menuLink} text text_type_main-default`}
          >
            <div className="mr-2">
              <ProfileIcon type="secondary" />
            </div>
            <span className="text text_type_main-default text_color_inactive">
              Личный кабинет
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
