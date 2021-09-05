export const SEND_ORDER_SUCCESS = "SEND_ORDER_SUCCESS";

export const sendOrderSuccess = (payload) => ({
  type: SEND_ORDER_SUCCESS,
  payload,
});
