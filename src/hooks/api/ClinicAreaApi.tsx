import axios from "axios";
import { useCallback } from "react";
import { ClinicArea } from "../../type/api/ClinicArea";
import { baseURL } from "./config/ApiConfig";

export const ClinicAreaApi = () => {
  const getAllArea = useCallback(async (): Promise<ClinicArea[]> => {
    const data: ClinicArea[] = await axios
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
