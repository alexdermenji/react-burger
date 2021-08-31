import { getUrl } from "../../../services/api/apiUrl";
import apiFetch from "../../api/apiFetch";
import { LOAD_USER_SUCCESS } from "./loadUserSucces";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

export const loadUser = () => {
  return async (dispatch) => {
    try {
      const response = await apiFetch(getUrl("auth/user"), {
        method: "GET",
        headers: {
          Authorization: decodeURIComponent(getCookie("accessToken")),
        },
      });

      if (response.success) {
        dispatch({
          type: LOAD_USER_SUCCESS,
          payload: response.user,
        });
      } else {
        throw new Error();
      }
    } catch (error) {}
  };
};
