import { getUrl } from "../../api/apiUrl";

export const RESET_PASSWORD_SENT = "RESET_PASSWORD_SENT";

export const resetPasswordSent = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: RESET_PASSWORD_SENT,
      payload: payload,
    });
    try {
      const response = await fetch(getUrl("password-reset"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const message = await response.json();
        return message;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
