import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.BASE_URL,
});

export default instance;
