import axios from "axios";
import { API_KEY, BASE_URL } from "../constants";

/**
 * Configured with base URL and common headers
 */
const benzingaApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
  },
});

/**
 * Request interceptor to add API key to all requests
 */
benzingaApi.interceptors.request.use(config => {
  if (!config.params) {
    config.params = {};
  }
  
  if (!config.params.token) {
    config.params.token = API_KEY;
  }
  
  return config;
});

export default benzingaApi;