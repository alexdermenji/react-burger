import { combineReducers } from "redux";
import { ingridientsReducer } from "./ingridients";
import { orderReducer } from "./order";
import { authReducer } from "./auth";

const reducers = combineReducers({
  ingridients: ingridientsReducer,
  order: orderReducer,
  auth: authReducer,
});

export default reducers;
