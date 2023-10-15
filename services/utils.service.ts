import axios from "axios";
import { environment } from "../environments";
import * as SecureStore from "expo-secure-store";

export const queryBuilder = (query: { [x: string]: any }) => {
  if (!query) return;
  const encodedQuery = `?${Object.keys(query)
    .map((key) => `${key}=${JSON.stringify(query[key])}`)
    .join("&")}`;
  return encodedQuery;
};

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "x-source": "web",
  Authorization: "",
};

export const put = async (
  route: string,
  object: any
): Promise<globalThis.Response> => {
  const token = await SecureStore.getItemAsync("accessToken");

  const headers = { ...defaultHeaders };
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  return await axios.put(environment.apiUrl + route, object, { headers });
};

export const get = async (route: string) => {
  const token =
    (await SecureStore.getItemAsync("accessToken")) ||
    window.localStorage.getItem("token");

  const headers = { ...defaultHeaders };
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  return await axios.get(environment.apiUrl + route, { headers });
};

export const del = async (route: string, object = {}) => {
  const token = await SecureStore.getItemAsync("accessToken");

  const headers = { ...defaultHeaders };
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  return await axios.delete(environment.apiUrl + route, { headers });
};

export const post = async (
  route: string,
  object: any,
  contentType?: "form-data"
) => {
  const token = await SecureStore.getItemAsync("accessToken");

  const headers = { ...defaultHeaders };
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  if (contentType === "form-data") {
    headers["Content-Type"] = "multipart/form-data";
    headers["Accept"] = "*/*";
  }
  const res = await axios.post(environment.apiUrl + route, object, { headers });

  return res;
};
