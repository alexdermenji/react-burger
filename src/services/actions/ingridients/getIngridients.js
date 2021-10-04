import { ingridientsUrl } from "../../../utils/api";
import { SUCCESS_GET_INGRIDIENTS } from "./successGetIngridients";
import { ERROR_GET_INGRIDIENTS } from "./errorGetIngridients";

export const GET_INGRIDIENTS = "GET_INGRIDIENTS";

export const getIngridients = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_INGRIDIENTS,
    });
    try {
      const response = await fetch(ingridientsUrl);
      const json = await response.json();
      dispatch({
        type: SUCCESS_GET_INGRIDIENTS,
        payload: json.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR_GET_INGRIDIENTS,
        payload:
          "Sorry, error happend, while getting all ingridients. Try again later",
      });
    }
  };
};
