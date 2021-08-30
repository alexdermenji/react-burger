import { getUrl } from "../../../services/api/apiUrl";
import apiFetch from "../../api/apiFetch";
import { LOAD_USER_SUCCESS } from "./loadUserSucces";

export const loadUser = () => {
  return async (dispatch) => {
    try {
      const response = await apiFetch(getUrl("auth/user"), {
        method: "GET",
      });
      if (response.ok) {
        const json = await response.json();
        dispatch({
          type: LOAD_USER_SUCCESS,
          payload: json.user,
        });
      } else {
        throw new Error();
      }
    } catch (error) {}
  };
};
