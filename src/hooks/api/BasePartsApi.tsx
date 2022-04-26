import axios from "axios";
import { useCallback } from "react";
import { BaseParts } from "../../type/api/BaseParts";
import { IdAndNameDto } from "../../type/api/dto/IdAndNameDto";
import { getAxios } from "./config/ApiConfig";

export const BasePartsApi = () => {
  const getAllBasePartsIdAndName = useCallback(
    async (aboutCategoryId: string): Promise<IdAndNameDto[]> => {
      const data: IdAndNameDto[] = await getAxios(
        "base-parts/id-and-name/aboutCategoryId/" + aboutCategoryId
      )
        .then((response) => {
          return response.data as IdAndNameDto[];
        })
        .catch((err) => {
          console.log(err);
          return [];
        });

      return data;
    },
    []
  );

  const getAllBasePartsByAboutCategoryId = useCallback(
    async (aboutCategoryId: string, gender: string): Promise<BaseParts[]> => {
      const query = "?gender=" + gender;
      const data: BaseParts[] = await getAxios(
        "base-parts/aboutCategoryId/" + aboutCategoryId + query
      )
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return [];
        });

      return data;
    },
    []
  );

  const getBaseParts = useCallback(
    async (
      aboutCategoryId: string,
      partsId?: string
    ): Promise<IdAndNameDto[]> => {
      const url =
        "base-parts/id-and-name/sort-selected?" +
        `aboutCategoryId=${aboutCategoryId}&`;

      const checkedUrl =
        !partsId || partsId === "none" ? url : url + `partsId=${partsId}&`;

      const api = await getAxios(checkedUrl);
      const data: IdAndNameDto[] = api.data;
      return data;
    },
    []
  );

  return {
    getAllBasePartsIdAndName,
    getAllBasePartsByAboutCategoryId,
    getBaseParts,
  };
};
