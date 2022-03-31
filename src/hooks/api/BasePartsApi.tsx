import axios from "axios";
import { useCallback } from "react";
import {
  ApiBaseParts,
  IdAndNameDto,
  PartsIdNameDto,
} from "../../type/api/ApiType";
import { baseURL, getAxios } from "./config/ApiConfig";

export const BasePartsApi = () => {
  const getAllBasePartsIdAndName = useCallback(
    async (aboutCategoryId: string): Promise<PartsIdNameDto[]> => {
      const originData = await axios
        .get(
          baseURL + "base-parts/id-and-name/aboutCategoryId/" + aboutCategoryId
        )
        .then((response) => {
          return response.data as PartsIdNameDto[];
        })
        .catch((err) => {
          console.log(err);
          return [];
        });

      return originData;
    },
    []
  );

  const getAllBasePartsByAboutCategoryId = useCallback(
    async (aboutCategoryId: string): Promise<ApiBaseParts[]> => {
      const data = await axios
        .get(baseURL + "base-parts/aboutCategoryId/" + aboutCategoryId)
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
        baseURL +
        "base-parts/id-and-name/sort-selected?" +
        `aboutCategoryId=${aboutCategoryId}&`;

      const checkedUrl =
        !partsId || partsId === "none" ? url : url + `partsId=${partsId}&`;

      const getData: IdAndNameDto[] = await getAxios(checkedUrl);
      return getData;
    },
    []
  );

  return {
    getAllBasePartsIdAndName,
    getAllBasePartsByAboutCategoryId,
    getBaseParts,
  };
};
