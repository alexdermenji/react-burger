import { SUCCESS_GET_INGRIDIENTS } from "../actions/ingridients/successGetIngridients";
import { GET_INGRIDIENTS } from "../actions/ingridients/getIngridients";
import { SET_CURRENT_INGRIDIENT } from "../actions/ingridients/setCurrentIngridient";
import { ERROR_GET_INGRIDIENTS } from "../actions/ingridients/errorGetIngridients";
import { DROP_INGRIDIENT } from "../actions/ingridients/dropIngridient";
import { DELETE_INGRIDIENT } from "../actions/ingridients/deleteIngridient";
import { SWAP_INGRIDIENTS } from "../actions/ingridients/swapIngridients";
const initialState = {
  ingridientsLoading: false,
  ingridientsLoadingError: null,
  ingridients: null,
  ingridientsCount: {},
  constructorIngridients: [],
  currentIngridient: null,
  insideIngridients: [],
  buns: [],
};

export const ingridientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWAP_INGRIDIENTS: {
      [
        state.insideIngridients[action.payload.sourceIndex],
        state.insideIngridients[action.payload.destinationIndex],
      ] = [
        state.insideIngridients[action.payload.destinationIndex],
        state.insideIngridients[action.payload.sourceIndex],
      ];

      return {
        ...state,
        insideIngridients: [...state.insideIngridients],
      };
    }
    case DROP_INGRIDIENT: {
      if (action.payload.type === "bun") {
        state.constructorIngridients[action.payload._id] += 2;
        state.constructorIngridients = state.constructorIngridients.filter(
          (ingridient) => {
            if (ingridient.type !== "bun") {
              return true;
            }
            state.ingridientsCount[ingridient._id] = 0;
            return false;
          }
        );
      } else {
        state.insideIngridients.push(action.payload);
      }
      state.ingridientsCount[action.payload._id] =
        state.ingridientsCount[action.payload._id] || 0;
      state.ingridientsCount[action.payload._id]++;

      return {
        ...state,
        ingridientsCount: { ...state.ingridientsCount },
        constructorIngridients: [
          ...state.constructorIngridients,
          action.payload,
        ],
        insideIngridients: [...state.insideIngridients],
      };
    }
    case DELETE_INGRIDIENT: {
      const ingridient = state.insideIngridients[action.payload.idx];
      state.ingridientsCount[ingridient._id] -= 1;
      state.insideIngridients.splice(action.payload, 1);
      state.constructorIngridients.splice(action.payload + 1, 1);

      return {
        ...state,
        ingridientsCount: { ...state.ingridientsCount },
        insideIngridients: [...state.insideIngridients],
        constructorIngridients: [...state.constructorIngridients],
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
