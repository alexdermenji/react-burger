import { combineReducers } from "redux";
import { ingridientsReducer } from "./ingridients";
import { orderReducer } from "./order";

const reducers = combineReducers({
  ingridients: ingridientsReducer,
  order: orderReducer,
});

export default reducers;
