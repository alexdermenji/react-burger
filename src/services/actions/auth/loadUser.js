import { getUrl } from "../../../services/api/apiUrl";
import apiFetch from "../../api/apiFetch";
import { loadUserSuccess } from "./loadUserSucces";
import { loadUserFail } from "./loadUserFail";

export const loadUser = () => {
  return async (dispatch) => {
    try {
      const response = await apiFetch(getUrl("auth/user"), {
        method: "GET",
      });

      if (response.success) {
        dispatch(loadUserSuccess(response.user));
      } else {
        dispatch(loadUserFail());
      }
    } catch (error) {}
  };
};
