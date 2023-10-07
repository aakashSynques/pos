import axios from "axios";
import { BASE_URL } from "./config";
export const fetch = async (
  endPoint = "",
  method = "get",
  data = null,
  headers = {}
) => {
  const instance = axios.create({
    baseURL: BASE_URL,
  });
  return await instance({
    url: endPoint,                            
    method,
    data,
    headers,
  });
};
