import axios from "axios";
import { getAccessToken } from "./AuthService";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

authApi.interceptors.request.use(
    config => {
        const accessToken = getAccessToken();
        if (!config.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)


// AUTHORIZED API CALLS

export const getDashboardData = async (section) => {
  try {
    const response = await authApi.get("/dashboard/" + section);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const getTablesData = async (table) => {
  try {
    const response = await authApi.get("/table/" + table);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}