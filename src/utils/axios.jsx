import axios from "axios";
import { getCookie } from "cookies-next";
export const baseDomain = process.env.baseDomain;
export const axiosInstance = axios.create({
  baseURL: baseDomain,
});
const ResponseInterceptor = (response) => {
  return response;
};
const RequestInterceptor = (config) => {
  const token = getCookie("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};

axiosInstance.interceptors.request.use(RequestInterceptor);
axiosInstance.interceptors.response.use(ResponseInterceptor, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 509;
  if (!expectedErrors) {
    return Promise.reject(error.response);
  } else {
    return Promise.reject(error.response);
  }
});
