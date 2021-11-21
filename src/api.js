import axios from "axios";

const baseURL = "http://54.144.155.145/api";

const authAxios = (token) =>
  axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const api = {
  post: (path, token, body) => authAxios(token).post(path, body),
  get: (path, token) => authAxios(token).get(path),
  put: (path, token, body) => authAxios(token).put(path, body),
  delete: (path, token) => authAxios(token).delete(path),
};

export { api, baseURL };
