const BURGER_API_URL = "https://norma.nomoreparties.space/api/";

export const setCookie = (name, value, options = {}) => {
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
window.setCookie = setCookie;

export const eraseCookie = (name) => {
  document.cookie = name + "=; Max-Age=-99999999;";
};

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const checkResponse = async (res) => {
  if (res.ok) {
    const data = await res.json();
    return { data };
  } else {
    return { error: res.status };
  }
};

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return false;
    }
    const result = await fetch(`${BURGER_API_URL}auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }),
    });
    const data = await checkResponse(result);
    if (data.data) {
      localStorage.setItem("refreshToken", data.data.refreshToken);
      setCookie("accessToken", data.data.accessToken);
      return true;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};

const apiRequest = async (url, options) => {
  const fetchOptions = {
    ...options,
  };
  fetchOptions.headers = fetchOptions.headers ?? {};
  fetchOptions.headers["Authorization"] = decodeURIComponent(
    getCookie("accessToken")
  );
  if (options.body && (!options.headers || !options.headers["Content-Type"])) {
    fetchOptions.headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, fetchOptions);
  return await checkResponse(res);
};

const apiFetch = async (url, options) => {
  let result = await apiRequest(url, options);
  if (result.error) {
    if (result.error === 401 || result.error === 403) {
      const refreshResult = await refreshToken();
      if (refreshResult) {
        result = await apiRequest(url, options);
        if (result.error) {
          return { error: result.error };
        }
        return result.data;
      } else {
        return { error: "Unauthorized" };
      }
    }
  }
  return result.data;
};

export default apiFetch;
