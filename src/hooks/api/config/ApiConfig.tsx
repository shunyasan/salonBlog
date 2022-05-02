import axios from "axios";

// prod
// export const baseURL =
//   "https://k9rjklooj6.execute-api.ap-northeast-1.amazonaws.com/dev/";

// local
export const baseURL = "http://localhost:3002/";

const apiKey: string = "XL4wvdOlBnaBXfqw7555P4vFqxm1wwRi8bALfHLp";

export const getAxios = async (url: string) => {
  return await axios.get(baseURL + url, {
    headers: { "x-api-key": apiKey },
  });
};
