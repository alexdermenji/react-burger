import * as actions from "./actions";

export const fetchIngridients = () => {
  return (dispatch) => {
    dispatch({
      type: actions.GET_INGRIDIENTS,
    });
  };
};
