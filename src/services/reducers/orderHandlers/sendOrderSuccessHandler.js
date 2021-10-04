const sendOrderSuccessHandlers = (state, action) => ({
  ...state,
  number: action.payload,
  orderSending: false,
});

export default sendOrderSuccessHandlers;
