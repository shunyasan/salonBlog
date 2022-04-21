import axios from "axios";
import { useCallback } from "react";
import AWS from "aws-sdk";
import { baseURL, getAxios } from "./config/ApiConfig";
import { OriginCategory } from "../../type/api/OriginCategory";
import { IdAndNameDto } from "../../type/api/dto/IdAndNameDto";

export const OriginCategoryApi = () => {
  const getAllOriginCategory = useCallback(async (): Promise<
    OriginCategory[]
  > => {
    const data: OriginCategory[] = await getAxios(baseURL + "origin-category");
    return data;
  }, []);

  const getOriginCategories = useCallback(
    async (originCategoryId: string): Promise<IdAndNameDto[]> => {
      const url =
        baseURL +
        "origin-category/id-and-name/sort-selected?" +
        `originCategoryId=${originCategoryId}&`;

      const getData: IdAndNameDto[] = await getAxios(url);
      return getData;
    },
    []
  );

  // const getAllRelationParts = useCallback(async (): Promise<
  //   OriginCategory[]
  // > => {
  //   const url = baseURL + `origin-category/relation-parts`;
  //   const getData: OriginCategory[] = await getAxios(url);
  //   return getData;
  // }, []);

  return {
    getAllOriginCategory,
    getOriginCategories,
    // getAllRelationParts
  };
};
