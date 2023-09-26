import axios from "axios";
export const fetch = async (
  endPoint = "",
  method = "get",
  data = null,
  headers = {}
) => {
  const instance = axios.create({
    baseURL: "http://posapi.q4hosting.com", 
    // baseURL: "http://localhost:2000", 
  });
  return await instance({
    url: endPoint,                            
    method,
    data,
    headers,
  });
};
