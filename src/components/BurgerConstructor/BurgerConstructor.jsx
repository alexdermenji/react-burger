import React, { useCallback, useEffect } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import selectNumber from "../../services/selectors/orders/selectNumber";
import selectConstructorIngridients from "../../services/selectors/ingridients/selectConstructotIngridients";
import { sendOrder } from "../../services/actions/order/sendOrder";
import { closeOrder } from "../../services/actions/order/closeOrder";
import { useDrop } from "react-dnd";
import { dropIngridient } from "../../services/actions/ingridients/dropIngridient";
import { deleteIngridient } from "../../services/actions/ingridients/deleteIngridient";
import { swapIngridients } from "../../services/actions/ingridients/swapIngridients";
import selectInsideIngridients from "../../services/selectors/ingridients/selectInsideIngridients";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const ingridients = useSelector(selectConstructorIngridients);
  const orderNumber = useSelector(selectNumber);
  const insideIngridients = useSelector(selectInsideIngridients);

  //react-dnd
  const [{ isOver }, dropRef] = useDrop({
    accept: "ingridient",
    drop(item) {
      dispatch(dropIngridient(item));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const totalPrice = ingridients.reduce((acc, item) => acc + item.price, 0);

  const sendOrderClick = () => {
    dispatch(sendOrder(ingridients));
  };
  const handleCloseModal = useCallback(() => {
    dispatch(closeOrder());
  }, [dispatch]);

  useEffect(() => {
    const escPressHandler = (e) => {
      if (e.code === "Escape") {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", escPressHandler);
    return () => window.removeEventListener("keydown", escPressHandler);
  }, [handleCloseModal]);

  return (
    <section
      className={`${styles.section} pt-25 pl-4`}
      ref={dropRef}
      style={isOver ? { backgroundColor: "gray" } : null}
    >
      {orderNumber && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails orderNumber={orderNumber}></OrderDetails>
        </Modal>
      )}

      <div className="mb-10">
        <div className="mb-4 pl-8 pr-4">
          {ingridients.findIndex((item) => item.type === "bun") < 0 && (
            <p className="text text_type_main-medium mt-30">
              ✚ Добавьте булку 🍔{" "}
            </p>
          )}{" "}
           
          {ingridients.map((item) => {
            if (item.type === "bun") {
              return (
                <ConstructorElement
                  key="top"
                  type="top"
                  isLocked={true}
                  text={`${item.name} верх`}
                  price={item.price}
                  thumbnail={item.image}
                />
              );
            }

            return null;
          })}
        </div>

        <DragDropContext
          onDragEnd={(param) => {
            param.destination &&
              dispatch(
                swapIngridients({
                  sourceIndex: param.source.index,
                  destinationIndex: param.destination.index,
                })
              );
          }}
        >
          <Droppable droppableId="id-1">
            {(provided) => (
              <div>
                {ingridients.findIndex((item) => item.type !== "bun") < 0 && (
                  <p className="text text_type_main-medium mt-10">
                    ✚ Дабавьте внутрь ингридиенты 🥦 🍅 🧀
                  </p>
                )}
                <ul
                  className={`${styles.productsList} pr-4`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {insideIngridients.map((item, idx) => {
                    const handleClose = () => {
                      dispatch(deleteIngridient(idx));
                      console.log(ingridients);
                      console.log(insideIngridients);
                    };

                    return (
                      <Draggable
                        key={`${item._id}${idx}`}
                        draggableId={"draggable" + item._id + idx}
                        index={idx}
                      >
                        {(provided, snapshot) => (
                          <li
                            className={styles.productsItem}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <div {...provided.dragHandleProps}>
                              <DragIcon />
                            </div>
                            <ConstructorElement
                              text={item.name}
                              price={item.price}
                              thumbnail={item.image}
                              handleClose={handleClose}
                            />
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="mt-4 mb-10 pl-8 pr-4">
          {ingridients.map((item) => {
            if (item.type === "bun") {
              return (
                <ConstructorElement
                  key="bottom"
                  type="bottom"
                  isLocked={true}
                  text={`${item.name} низ`}
                  price={item.price}
                  thumbnail={item.image}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
      {ingridients.length > 0 && (
        <div className={styles.checkout}>
          <div className="mr-10">
            <span className="text text_type_digits-medium mr-1">
              {totalPrice}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="medium" onClick={sendOrderClick}>
            Оформить заказ
          </Button>
        </div>
      )}
    </section>
  );
};

export default BurgerConstructor;
