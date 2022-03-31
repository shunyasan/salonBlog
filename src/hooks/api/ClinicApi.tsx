import axios from "axios";
import { useCallback } from "react";
import { ApiClinic, ClinicNestPrice } from "../../type/api/ApiType";
import { baseURL } from "./config/ApiConfig";

export const ClinicApi = () => {
  const getAllClinic = useCallback(
    async (take: number, skip: number): Promise<ClinicNestPrice[]> => {
      const query = `take=${take}&skip=${skip}`;
      const originData = await axios
        .get(baseURL + "clinic/clinic-nest-price/pagenation?" + query)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
        });

      return originData;
    },
    []
  );

  const getAllClinicByAreaId = useCallback(
    async (
      areaId: string,
      take: number,
      skip: number
    ): Promise<ClinicNestPrice[]> => {
      const query = `take=${take}&skip=${skip}`;
      const originData = await axios
        .get(
          baseURL +
            "clinic/clinic-nest-price/area/" +
            areaId +
            "/pagenation?" +
            query
        )
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
        });

      return originData;
    },
    []
  );

  return { getAllClinic, getAllClinicByAreaId };
};
