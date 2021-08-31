const BURGER_API_URL = "https://norma.nomoreparties.space/api/";

export const setCookie = (name, value, options = {}) => {
  // Example of use:
  // setCookie("user", "John", { secure: true, "max-age": 3600 });
  options = {
    path: "/",
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }
  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);
  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }
  document.cookie = updatedCookie;
};

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};
const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const refreshToken = async () => {
  try {
    const result = await fetch(`${BURGER_API_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    });
    localStorage.setItem("refreshToken", result.accessToken);
    setCookie("accessToken", result.accessToken);
    return true;
  } catch {
    return false;
  }
};

const apiFetch = async (url, options) => {
  const fetchOptions = {
    ...options,
  };
  if (options.body && (!options.headers || !options.headers["Content-Type"])) {
    if (fetchOptions.headers) {
      fetchOptions.headers["Content-Type"] = "application/json";
      fetchOptions.headers["Authorization"] = getCookie("accessToken");
    } else {
      fetchOptions.headers = {
        "Content-Type": "application/json",
        Authorization: getCookie("accessToken"),
      };
    }
  }
  try {
    const res = await fetch(url, fetchOptions);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshResult = await refreshToken();
      if (refreshResult) {
        const res = await fetch(url, fetchOptions);
        return await checkResponse(res);
      } else {
        return Promise.reject("Unauthorized");
      }
    } else {
      return Promise.reject(err);
    }
  }
};

export default apiFetch;
