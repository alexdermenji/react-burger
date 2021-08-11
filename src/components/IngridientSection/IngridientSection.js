import styles from "./IngridientSection.module.css";
import PropTypes from "prop-types";
import menuItemPropTypes from "../../utils/types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { setCurrentIngridient } from "../../services/actions/ingridients/setCurrentIngridient";
import { useDrag } from "react-dnd";

const Ingridient = ({ item, onClick, className }) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingridient",
    item: item,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  return (
    <li
      ref={dragRef}
      onClick={onClick}
      className={
        styles.productsItems + " pl-4 pr-4" + (className ? ` ${className}` : "")
      }
      key={item._id}
    >
      <div className={styles.productsImage + " mb-1"}>
        <img style={{ userDrag: "none" }} src={item.image} alt={item.name} />
      </div>
      <Counter count={1} size="default" />
      <div className={styles.productsPrice + " mb-1"}>
        <span className="text text_type_digits-default   mr-1">
          {item.price}{" "}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <p
        className={styles.productsDescription + " text text_type_main-default"}
      >
        {item.name}
      </p>
    </li>
  );
};

const IngridientSection = ({ ingridients, title }) => {
  const dispatch = useDispatch();
  const onIngridientClick = (data) => {
    dispatch(setCurrentIngridient(data));
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text text_type_main-medium">{title}</h2>
      </div>

      <ul className={styles.productsList + " pl-4 mb-10"}>
        {ingridients.map((item) => {
          return (
            <Ingridient
              key={item._id}
              item={item}
              onClick={() => onIngridientClick(item)}
            />
          );
        })}
      </ul>
    </>
  );
};

IngridientSection.propTypes = {
  title: PropTypes.string.isRequired,
  ingridients: PropTypes.arrayOf(menuItemPropTypes).isRequired,
};

export default IngridientSection;
