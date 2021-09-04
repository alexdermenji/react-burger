import styles from "./IngridientSection.module.css";
import PropTypes from "prop-types";
import menuItemPropTypes from "../../utils/types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentIngridient } from "../../services/actions/ingridients/setCurrentIngridient";
import { useDrag } from "react-dnd";
import { useHistory } from "react-router-dom";
import { clickIngridient } from "../../services/actions/ingridients/clickIngridient";
import selectIngridientsModalIsOpened from "../../services/selectors/ingridients/selectIngridientsModalIsOpened";
const Ingridient = ({ item, onClick, constructorIngridients }) => {
  const counter = useMemo(() => {
    const ingridient = constructorIngridients.find(
      (ing) => ing.data._id === item._id
    );

    const counter = ingridient ? ingridient.count : 0;
    return counter;
  }, [constructorIngridients, item]);

  const [, dragRef] = useDrag({
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
      className={styles.productsItems + " pl-4 pr-4"}
      key={item._id}
    >
      <div className={styles.productsImage + " mb-1"}>
        <img src={item.image} alt={item.name} />
      </div>
      <Counter count={counter || 0} size="default" />
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

const IngridientSection = ({
  ingridients,
  title,
  id,
  constructorIngridients,
}) => {
  const ingridientModalIsOpened = useSelector(selectIngridientsModalIsOpened);
  const history = useHistory();
  console.log(history);
  const dispatch = useDispatch();
  const onIngridientClick = (data) => {
    debugger;
    history.push(`/ingredients/${data._id}`);

    dispatch(clickIngridient());
    dispatch(setCurrentIngridient(data));
  };

  return (
    <>
      <div className={`mb-6 ${id}`} id={id}>
        <h2 className="text text_type_main-medium">{title}</h2>
      </div>

      <ul className={styles.productsList + " pl-4 mb-10"}>
        {ingridients.map((item) => {
          return (
            <Ingridient
              constructorIngridients={constructorIngridients}
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
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ingridients: PropTypes.arrayOf(menuItemPropTypes).isRequired,
  constructorIngridients: PropTypes.array.isRequired,
};
Ingridient.propTypes = {
  constructorIngridients: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IngridientSection;
