import axios from "axios";
import { useCallback } from "react";
import { Feature } from "../../enums/FeatureEnum";
import { ClinicNestPriceDto } from "../../type/api/dto/ClinicNestPriceDto";
import { getAxios } from "./config/ApiConfig";

export const ClinicApi = () => {
  const getAllClinic = useCallback(
    async (take: number, skip: number): Promise<ClinicNestPriceDto[]> => {
      const query = `take=${take}&skip=${skip}`;
      const data: ClinicNestPriceDto[] = await getAxios(
        "clinic/clinic-nest-price/pagenation?" + query
      )
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
        });

      return data;
    },
    []
  );

  const getAllClinicByAreaId = useCallback(
    async (
      areaId: string,
      take: number,
      skip: number
    ): Promise<ClinicNestPriceDto[]> => {
      const query = `take=${take}&skip=${skip}`;
      const data: ClinicNestPriceDto[] = await getAxios(
        "clinic/clinic-nest-price/area/" + areaId + "/pagenation?" + query
      )
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
        });

      return data;
    },
    []
  );

  return {
    getAllClinic,
    getAllClinicByAreaId,
  };
};
