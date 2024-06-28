import axios from "axios";

const baseURL = "http://localhost:8000";
const instance = axios.create({ baseURL });

instance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default instance;
