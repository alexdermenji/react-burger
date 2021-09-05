export const SEND_ORDER_ERROR = "SEND_ORDER_ERROR";

export const sendOrderError = (payload) => ({
  type: SEND_ORDER_ERROR,
  payload,
});
