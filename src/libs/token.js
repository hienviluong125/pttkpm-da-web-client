const TOKEN_NAME = process.env.AUTH_TOKEN || "_ut";

export const saveToken = (token, key = TOKEN_NAME) =>
  token ? localStorage.setItem(key, token) : null;

export const getToken = (key = TOKEN_NAME) => localStorage.getItem(key) || null;

export const removeToken = (key) =>
  localStorage.removeItem(key || TOKEN_NAME) || null;

export const clearAllTokens = () => localStorage.clear() || null;

export const getUser = () => {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"))
  }

  return null;
}

export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
}
