import { USER_LOADING } from "../actions/auth/userLoading";
import { LOGIN_SUCCES } from "../actions/auth/loginSucces";
import { REGISTER_SUCCES } from "../actions/auth/registerSucces";

const initialState = {
  user: {},
  isLogin: null,
  isLoading: false,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCES:
    case REGISTER_SUCCES:
      return {
        ...state,
        ...action.payload,
        isLogin: true,
        isLoading: false,
      };
    case USER_LOADING:
      return { ...state, isLoading: true };

    default:
      return state;
  }
};
