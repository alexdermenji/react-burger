import { combineReducers } from "redux";
import { ingridientsReducer } from "./ingridients";
import { orderReducer } from "./order";
import { authReducer } from "./auth";
import { reducer as formReducer } from "redux-form";

const reducers = combineReducers({
  ingridients: ingridientsReducer,
  order: orderReducer,
  auth: authReducer,
  form: formReducer,
});

export default reducers;
