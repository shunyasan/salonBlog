import axios from "axios";
import { useCallback } from "react";
import AWS from "aws-sdk";
import { IdAndNameDto, OriginCategory } from "../../type/api/ApiType";
import { baseURL, getAxios } from "./config/ApiConfig";

export const OriginCategoryApi = () => {
  const getAllOriginCategory = useCallback(async (): Promise<
    OriginCategory[]
  > => {
    const originData = await getAxios(baseURL + "origin-category");
    return originData;
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
