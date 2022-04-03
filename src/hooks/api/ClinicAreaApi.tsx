import axios from "axios";
import { useCallback } from "react";
import { ApiClinicArea, ApiOnlyPrice, ApiPrice } from "../../type/api/ApiType";
import { OrderPlan } from "../../type/app/BaseType";
import { baseURL } from "./config/ApiConfig";

export const ClinicAreaApi = () => {
  const getAllArea = useCallback(async (): Promise<ApiClinicArea[]> => {
    const data: ApiClinicArea[] = await axios
      .get(baseURL + `clinic-area`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });

    return data;
  }, []);

  return { getAllArea };
};
