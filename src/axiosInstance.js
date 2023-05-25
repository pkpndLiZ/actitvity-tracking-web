import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: { "X-Custom-Header": "foobar" },
});

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  // const token = "asdasd";
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      logoutUserAndRedirect();
    }
    return Promise.reject(error);
  }
);

async function logoutUserAndRedirect() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  window.location.href = "/login";
}

export async function fetch(path) {
  try {
    return axiosInstance.get(path).then((response) => {
      console.log(response.data);
      return response.data;
    });
  } catch (error) {
    console.error(error);
  }
}
