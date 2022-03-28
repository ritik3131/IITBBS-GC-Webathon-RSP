import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_HOST,
  withCredentials: true,
  timeout: 3000,
});

export default axiosInstance;