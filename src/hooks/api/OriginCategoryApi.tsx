import axios from "axios";
import { useCallback } from "react";
import AWS from "aws-sdk";
import { getAxios } from "./config/ApiConfig";
import { OriginCategory } from "../../type/api/OriginCategory";
import { IdAndNameDto } from "../../type/api/dto/IdAndNameDto";

export const OriginCategoryApi = () => {
  const getAllOriginCategory = useCallback(async (): Promise<
    OriginCategory[]
  > => {
    const api = await getAxios("origin-category");
    const data: OriginCategory[] = api.data;
    return data;
  }, []);

  const getOriginCategories = useCallback(
    async (originCategoryId: string): Promise<IdAndNameDto[]> => {
      const url =
        "origin-category/id-and-name/sort-selected?" +
        `originCategoryId=${originCategoryId}&`;

      const api = await getAxios(url);
      const data: IdAndNameDto[] = api.data;
      return data;
    },
    []
  );

  // const getAllRelationParts = useCallback(async (): Promise<
  //   OriginCategory[]
  // > => {
  //   const url =  `origin-category/relation-parts`;
  //   const getData: OriginCategory[] = await getAxios(url);
  //   return getData;
  // }, []);

  return {
    getAllOriginCategory,
    getOriginCategories,
    // getAllRelationParts
  };
};
