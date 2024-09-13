import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // Make sure this matches your NestJS server URL
  withCredentials: true,
});

export default api;
