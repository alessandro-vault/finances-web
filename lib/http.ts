import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const http = axios.create(config);

export default http;
