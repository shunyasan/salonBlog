import axios from "axios";
import { useCallback } from "react";

export const baseURL = "http://127.0.0.1:3002/";

export const getAxios = async (url: string) => {
  return await axios
    .get(url)
    .then((responce) => {
      return responce.data;
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });
};
