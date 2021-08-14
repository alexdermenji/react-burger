import { orderUrl } from "../../../utils/api";
import { SEND_ORDER_ERROR } from "./sendOrderError";
import { SEND_ORDER_SUCCESS } from "./sendOrderSucces";

export const SEND_ORDER = "SEND_ORDER";

export const sendOrder = (ingridients) => {
  return async (dispatch) => {
    dispatch({
      type: SEND_ORDER,
    });
    try {
      const response = await fetch(orderUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ingredients: ingridients,
        }),
      });
      if (response.ok) {
        const json = await response.json();
        dispatch({
          type: SEND_ORDER_SUCCESS,
          payload: json.order.number,
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      dispatch({
        type: SEND_ORDER_ERROR,
        payload: "Sorry cant process your order",
      });
    }
  };
};
