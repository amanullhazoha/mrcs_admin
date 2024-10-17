import axios from "axios";
import { baseUrl } from "./baseUrl";

export const API = axios.create({
  baseURL: baseUrl.information,
  withCredentials: true,
});

export const FAPI = axios.create({
  baseURL: baseUrl.file,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});
