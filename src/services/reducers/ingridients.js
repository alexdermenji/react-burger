import { SUCCESS_GET_INGRIDIENTS } from "../actions/ingridients/successGetIngridients";
import { GET_INGRIDIENTS } from "../actions/ingridients/getIngridients";
import { SET_CURRENT_INGRIDIENT } from "../actions/ingridients/setCurrentIngridient";
import { ERROR_GET_INGRIDIENTS } from "../actions/ingridients/errorGetIngridients";
import { DROP_INGRIDIENT } from "../actions/ingridients/dropIngridient";
const initialState = {
  ingridientsLoading: false,
  ingridientsLoadingError: null,
  ingridients: null,
  constructorIngridients: [],
  currentIngridient: null,
};

export const ingridientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DROP_INGRIDIENT: {
      return {
        ...state,
        constructorIngridients: [
          ...state.constructorIngridients,
          action.payload,
        ],
      };
    }
    case GET_INGRIDIENTS: {
      return {
        ...state,
        ingridientsLoadingError: null,
        ingridients: null,
        ingridientsLoading: true,
      };
    }
    case SUCCESS_GET_INGRIDIENTS: {
      return {
        ...state,
        ingridientsLoading: false,
        ingridients: action.payload,
      };
    }
    case SET_CURRENT_INGRIDIENT: {
      return {
        ...state,
        currentIngridient: action.payload,
      };
    }
    case ERROR_GET_INGRIDIENTS: {
      return {
        ...state,
        ingridientsLoading: false,
        ingridientsLoadingError: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
