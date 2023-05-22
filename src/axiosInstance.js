import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: { "X-Custom-Header": "foobar" },
});

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export async function fetch(path) {
  try {
    return await axiosInstance.get(path).then((response) => {
      console.log(response.data);
      return response.data;
    });
  } catch (error) {
    console.error(error);
  }
}
