import { SUCCESS_GET_INGRIDIENTS } from "../actions/ingridients/successGetIngridients";
import { GET_INGRIDIENTS } from "../actions/ingridients/getIngridients";
import { SET_CURRENT_INGRIDIENT } from "../actions/ingridients/setCurrentIngridient";
import { ERROR_GET_INGRIDIENTS } from "../actions/ingridients/errorGetIngridients";
import { DROP_INGRIDIENT } from "../actions/ingridients/dropIngridient";
import { DELETE_INGRIDIENT } from "../actions/ingridients/deleteIngridient";
import { SWAP_INGRIDIENTS } from "../actions/ingridients/swapIngridients";
import { SEND_ORDER_SUCCESS } from "../actions/order/sendOrderSucces";
const initialState = {
  ingridientsLoading: false,
  ingridientsLoadingError: null,
  ingridients: null,
  ingridientsCount: {},
  constructorIngridients: [],
  currentIngridient: null,
};

export const ingridientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWAP_INGRIDIENTS: {
      const newIngridients = [...state.constructorIngridients];
      const { sourceIndex, destinationIndex } = action.payload;
      const destinationIngridient = newIngridients[destinationIndex];
      newIngridients[destinationIndex] = newIngridients[sourceIndex];
      newIngridients[sourceIndex] = destinationIngridient;

      return {
        ...state,
        constructorIngridients: newIngridients,
      };
    }

    case DROP_INGRIDIENT: {
      const { constructorIngridients } = state;

      if (action.payload.type === "bun") {
        const bunIndex = constructorIngridients.findIndex(
          (ingridient) => ingridient.data.type === "bun"
        );
        const newIngridient = { data: action.payload, count: 2 };
        if (bunIndex === -1) {
          return {
            ...state,
            constructorIngridients: [...constructorIngridients, newIngridient],
          };
        } else {
          const newConstructorIngridients = [...constructorIngridients];
          newConstructorIngridients[bunIndex] = newIngridient;
          return {
            ...state,
            constructorIngridients: newConstructorIngridients,
          };
        }
      }

      const currentIngrientIndex = constructorIngridients.findIndex(
        (item) => item.data._id === action.payload._id
      );
      if (currentIngrientIndex !== -1) {
        const newConstructorIngridients = [...constructorIngridients];
        newConstructorIngridients[currentIngrientIndex] = {
          ...newConstructorIngridients[currentIngrientIndex],
          count: newConstructorIngridients[currentIngrientIndex].count + 1,
        };
        return {
          ...state,
          constructorIngridients: newConstructorIngridients,
        };
      }

      return {
        ...state,
        constructorIngridients: [
          ...state.constructorIngridients,
          {
            data: action.payload,
            count: 1,
          },
        ],
      };
    }

    case DELETE_INGRIDIENT: {
      const { idx } = action.payload;
      const newIngridients = [...state.constructorIngridients];
      const deleteIngridient = newIngridients[idx];
      if (deleteIngridient.count > 1) {
        newIngridients[idx] = {
          ...newIngridients[idx],
          count: newIngridients[idx].count - 1,
        };
      } else {
        newIngridients.splice(idx, 1);
      }

      return {
        ...state,
        constructorIngridients: newIngridients,
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
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        constructorIngridients: [],
      };
    }
    default: {
      return state;
    }
  }
};
