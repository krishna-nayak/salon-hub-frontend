import axios from "axios";

const endpoint = axios.create({
  baseURL: import.meta.env.VITE_URL,
});

export default endpoint;
