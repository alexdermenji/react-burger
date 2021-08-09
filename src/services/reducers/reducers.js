import { combineReducers } from "redux";
import { rootReducer, secondReducer } from "./rootReducer";

const reducers = combineReducers({
  rootReducer,
  secondReducer,
});

export default reducers;
