import { USER_LOADING } from "../actions/auth/userLoading";
import { LOGIN_SUCCES } from "../actions/auth/loginSucces";
import { REGISTER_SUCCES } from "../actions/auth/registerSucces";
import { LOAD_USER_SUCCESS } from "../actions/auth/loadUserSucces";
import { LOGOUT_USER_SUCCESS } from "../actions/auth/logoutUserSuccess";

const initialState = {
  user: {},
  isLogin: false,
  isLoading: true,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLogin: true,
      };

    //todo Load use fail
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        user: {},
        isLogin: null,
      };
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
