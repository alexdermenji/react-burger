import styles from "./IngridientSection.module.css";
import PropTypes from "prop-types";
import menuItemPropTypes from "../../utils/types";
import { useState } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { setCurrentIngridient } from "../../services/actions/ingridients/setCurrentIngridient";

const Ingridient = ({ item, onClick, onMouseDown, className }) => (
  <li
    onMouseDown={onMouseDown}
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
    <p className={styles.productsDescription + " text text_type_main-default"}>
      {item.name}
    </p>
  </li>
);

const IngridientSection = ({ ingridients, title }) => {
  const dispatch = useDispatch();
  const onIngridientClick = (data) => {
    dispatch(setCurrentIngridient(data));
  };
  const [dragId, setDragId] = useState(null);
  const [dragPositon, setDragPosition] = useState(null);
  const [dragStartPos, setDragStartPos] = useState(null);
  const [dragDelta, setDragDelta] = useState({ x: 0, y: 0 });

  const resetDrag = () => {
    setDragId(null);
    setDragPosition(null);
    setDragStartPos(null);
    setDragDelta({ x: 0, y: 0 });
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text text_type_main-medium">{title}</h2>
      </div>
      {dragId && (
        <div
          onMouseMove={(event) => {
            setDragDelta({
              x: event.screenX - dragStartPos.x,
              y: event.screenY - dragStartPos.y,
            });
          }}
          onMouseUp={resetDrag}
          onMouseLeave={resetDrag}
          style={{
            position: "fixed",
            zIndex: 1,
            top: dragPositon.top + dragDelta.y,
            left: dragPositon.left + dragDelta.x,
            width: dragPositon.width,
            height: dragPositon.height,
          }}
        >
          <Ingridient
            item={ingridients.find((item) => item._id === dragId)}
            className={styles.dragIngridient}
          />
        </div>
      )}
      <ul className={styles.productsList + " pl-4 mb-10"}>
        {ingridients.map((item) => {
          return (
            <Ingridient
              key={item._id}
              item={item}
              onClick={() => onIngridientClick(item)}
              onMouseDown={(event) => {
                event.preventDefault();
                const pos = event.target.getBoundingClientRect();
                setDragPosition(pos);
                setDragStartPos({
                  x: event.screenX,
                  y: event.screenY,
                });
                setDragId(item._id);
              }}
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
