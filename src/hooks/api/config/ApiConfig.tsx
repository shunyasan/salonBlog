import axios from "axios";

export const baseURL =
  "https://k9rjklooj6.execute-api.ap-northeast-1.amazonaws.com/dev";

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
