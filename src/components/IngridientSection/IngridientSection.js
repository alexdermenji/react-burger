import styles from "./IngridientSection.module.css";
import PropTypes from "prop-types";
import menuItemPropTypes from "../../utils/constants";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const IngridientSection = ({
  ingridients,
  title,
  handleOpenIngridientDetails,
}) => {
  return (
    <>
      <div className="mb-6">
        <h2 className="text text_type_main-medium">{title}</h2>
      </div>
      <ul className={styles.productsList + " pl-4 mb-10"}>
        {ingridients.map((item) => {
          return (
            <li
              onClick={() => {
                handleOpenIngridientDetails(item);
              }}
              className={styles.productsItems + " pl-4 pr-4"}
              key={item._id}
            >
              <div className={styles.productsImage + " mb-1"}>
                <img src={item.image} alt={item.name} />
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
    </>
  );
};

IngridientSection.propTypes = {
  title: PropTypes.string.isRequired,
  ingridients: PropTypes.arrayOf(menuItemPropTypes).isRequired,
  handleOpenIngridientDetails: PropTypes.func.isRequired,
};

export default IngridientSection;
