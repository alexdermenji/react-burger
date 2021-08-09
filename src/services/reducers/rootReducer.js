import * as actions from "../actions/actions";
const initialState = [
  {
    ingridients: [],
    constructorIngridients: [],
    currentIngridient: "",
    order: "",
  },
];

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_INGRIDIENTS: {
      return state;
    }
    case "GET_CONSTRUCTOR_INGRIDIENTS": {
      return state;
    }
    case "GET_INGRIDIENT_INFO": {
      return state;
    }
    case "DELETE_INGRIDIENT_INFO": {
      return state;
    }
    case "GET_ORDER_NUMBER": {
      return state;
    }
    default: {
      return state;
    }
  }
};

export const secondReducer = (state = [1, 2, 3]) => {
  return state;
};
