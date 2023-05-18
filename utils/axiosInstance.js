import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3002",  
  headers: { "X-Custom-Header": "foobar" },
});

export async function fetch(path) {
  try {
    return await axiosInstance.get(path).then((response) => response.data);
  } catch (error) {
    console.error(error);
  }
}
