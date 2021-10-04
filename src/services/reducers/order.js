import { SEND_ORDER_ERROR } from "../actions/order/sendOrderError";
import { SEND_ORDER } from "../actions/order/sendOrder";
import { SEND_ORDER_SUCCESS } from "../actions/order/sendOrderSucces";
import { CLOSE_ORDER } from "../actions/order/closeOrder";
import sendOrderSuccessHandler from "./orderHandlers/sendOrderSuccessHandler";

const initialState = {
  number: null,
  orderSending: false,
  orderSendingError: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_ORDER: {
      return {
        ...state,
        orderSending: true,
        orderSendingError: false,
        number: null,
      };
    }
    case SEND_ORDER_SUCCESS: {
      return sendOrderSuccessHandler(state, action);
    }
    case SEND_ORDER_ERROR: {
      return {
        ...state,
        orderSending: false,
        orderSendingError: action.payload,
      };
    }
    case CLOSE_ORDER: {
      return {
        ...state,
        orderSending: false,
        orderSendingError: false,
        number: null,
      };
    }
    default: {
      return state;
    }
  }
};
