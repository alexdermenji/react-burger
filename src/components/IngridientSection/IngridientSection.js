import styles from "./IngridientSection.module.css";
import PropTypes from "prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const IngridientSection = (props) => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text text_type_main-medium">{props.title}</h2>
      </div>
      <ul className={styles.productsList + " pl-4 mb-10"}>
        {props.ingridients.map((item) => {
          return (
            <li className={styles.productsItems + " pl-4 pr-4"} key={item._id}>
              <div className={styles.productsImage + " mb-1"}>
                <img src={item.image} alt="Bulka-1" />
              </div>
              <Counter count={1} size="default" />
              <div className={styles.productsPrice + " mb-1"}>
                <span className="text text_type_digits-default   mr-1">
                  {item.price}{" "}
                </span>
                <CurrencyIcon type="primary" />
              </div>
              <p
                className={
                  styles.productsDescription + " text text_type_main-default"
                }
              >
                {item.name}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

IngridientSection.propTypes = {
  title: PropTypes.string,
  ingridients: PropTypes.arrayOf(PropTypes.object),
};

export default IngridientSection;
