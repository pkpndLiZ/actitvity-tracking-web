import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3002",
  headers: { "X-Custom-Header": "foobar" },
});

axiosInstance.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("token");
  console.log("token: " + token);
  config.headers.authorization = `Bearer ${token}`;
  return config;
});

export async function fetch(path) {
  try {
    return await axiosInstance.get(path).then((response) => response.data);
  } catch (error) {
    console.error(error);
  }
}
